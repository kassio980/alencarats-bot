const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  customId: /^add_(produtos|entradas)_.+$/,
  async execute(c, i) {
    const [, , tipo, id] = i.customId.split('_');
    const lista = await c.db.get(tipo) || [];
    const item = lista.find(x => x.id === id);
    if (!item) {
      return i.reply({ content: '❌ Item não encontrado!', ephemeral: true });
    }
    const car = await c.db.get(`carrinho_${i.user.id}`) || [];
    car.push(item);
    await c.db.set(`carrinho_${i.user.id}`, car);
    const total = car.reduce((s, x) => s + x.preco, 0);
    await i.reply({
      content: `✅ **${item.nome}** adicionado!\nTotal atual: R$${total.toFixed(2)}`,
      ephemeral: true
    });
  },

  customId: 'limpar_carrinho',
  async execute(c, i) {
    await c.db.delete(`carrinho_${i.user.id}`);
    await i.reply({ content: '🗑️ Carrinho limpo!', ephemeral: true });
  },

  customId: 'finalizar_compra',
  async execute(c, i) {
    const car = await c.db.get(`carrinho_${i.user.id}`) || [];
    const pix = await c.db.get('pix');
    if (!pix) {
      return i.reply({ content: '❌ PIX não configurado no sistema!', ephemeral: true });
    }
    const total = car.reduce((s, x) => s + x.preco, 0);
    const idPedido = 'PED' + Date.now().toString().slice(-6);

    const canal = await i.guild.channels.create({
      name: `compra-${i.user.username}`,
      parent: c.config.categoria_compras,
      permissionOverwrites: [
        { id: i.guild.id, deny: ['ViewChannel'] },
        { id: i.user.id, allow: ['ViewChannel', 'SendMessages'] },
        { id: c.user.id, allow: ['ViewChannel', 'ManageChannels', 'SendMessages'] },
        ...c.config.cargos_admin.map(r => ({ id: r, allow: ['ViewChannel', 'SendMessages'] }))
      ]
    });

    await canal.send({
      embeds: [
        new EmbedBuilder().setColor('#00ff00')
          .setTitle('🛒 NOVO PEDIDO CRIADO')
          .addFields(
            { name: '👤 Cliente', value: `<@${i.user.id}>`, inline: true },
            { name: '🆔 Pedido', value: `#${idPedido}`, inline: true },
            { name: '💰 Valor Total', value: `R$${total.toFixed(2)}`, inline: true },
            { name: '💳 Dados do PIX', value: `Chave: \`${pix.chave}\`\nNome: ${pix.nome}` }
          )
      ],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId(`pagar_${idPedido}`).setLabel('✅ JÁ EFETUEI O PAGAMENTO').setStyle(ButtonStyle.Success),
          new ButtonBuilder().setCustomId(`cancelar_${idPedido}`).setLabel('❌ CANCELAR PEDIDO').setStyle(ButtonStyle.Danger)
        )
      ]
    });

    await c.db.push('pedidos', {
      id: idPedido,
      cliente: i.user.id,
      itens: car,
      valor: total,
      canal: canal.id,
      status: 'AGUARDANDO PAGAMENTO'
    });

    await c.db.delete(`carrinho_${i.user.id}`);
    await i.reply({ content: `✅ Pedido criado com sucesso! Acompanhe em: <#${canal.id}>`, ephemeral: true });
  },

  customId: /^pagar_|cancelar_/,
  async execute(c, i) {
    const acao = i.customId.startsWith('pagar_') ? 'PAGO' : 'CANCELADO';
    const id = i.customId.split('_')[1];
    const pedidos = await c.db.get('pedidos') || [];
    const idx = pedidos.findIndex(x => x.id === id);
    
    if (idx < 0) return;
    pedidos[idx].status = acao;
    await c.db.set('pedidos', pedidos);

    try {
      const u = await c.users.fetch(pedidos[idx].cliente);
      await u.send(`✅ Seu pedido #${id} foi marcado como **${acao}**!`);
    } catch (e) {}

    await i.reply(`✅ Pedido atualizado para: **${acao}**`);
    setTimeout(() => i.channel.delete().catch(() => {}), 2000);
  }
};
