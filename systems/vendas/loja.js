const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

async function exibir(c,i,tipo){
  const lista = await c.db.get(tipo) || [];
  if(!lista.length) return i.reply({content:'❌ Nenhum item cadastrado!',ephemeral:true});
  const emb = new EmbedBuilder().setColor(c.config.cor_embed)
    .setTitle(tipo==='produtos'?'🛒 NOSSA LOJA':'🎫 ENTRADAS VIP')
    .setDescription(lista.map(x=>`• **${x.nome}** | R$${x.preco.toFixed(2)}\n${x.descricao||''}`).join('\n\n'));
  const botoes = new ActionRowBuilder();
  lista.slice(0,5).forEach(x=>{
    botoes.addComponents(
      new ButtonBuilder()
        .setCustomId(`add_${tipo}_${x.id}`)
        .setLabel(`Adicionar R$${x.preco.toFixed(2)}`)
        .setStyle(ButtonStyle.Success)
    );
  });
  await i.reply({embeds:[emb],components:[botoes],ephemeral:true});
}

module.exports = {
  customId:'loja_ver',
  execute:(c,i)=>exibir(c,i,'produtos'),
  customId:'loja_entradas',
  execute:(c,i)=>exibir(c,i,'entradas'),
  customId:'loja_carrinho',
  async execute(c,i){
    const car = await c.db.get(`carrinho_${i.user.id}`) || [];
    if(!car.length) return i.reply({content:'🛒 Carrinho vazio!',ephemeral:true});
    const total = car.reduce((s,x)=>s+x.preco,0);
    await i.reply({
      embeds:[new EmbedBuilder().setColor('#ff6600')
        .setTitle('🛒 SEU CARRINHO')
        .setDescription(`${car.map(x=>`• ${x.nome} R$${x.preco.toFixed(2)}`).join('\n')}\n\n💳 **Total: R$${total.toFixed(2)}**`)],
      components:[new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('finalizar_compra').setLabel('💳 FINALIZAR').setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId('limpar_carrinho').setLabel('🗑️ LIMPAR').setStyle(ButtonStyle.Secondary)
      )],
      ephemeral:true
    });
  },
  customId:'loja_pedidos',
  async execute(c,i){
    const p = (await c.db.get('pedidos')||[]).filter(x=>x.cliente===i.user.id);
    i.reply({
      content:p.length?`📜 Seus pedidos:\n${p.map(x=>`#${x.id} | R$${x.valor.toFixed(2)} | ${x.status}`).join('\n')}:'❌ Sem pedidos!',
      ephemeral:true
    });
  }
};
