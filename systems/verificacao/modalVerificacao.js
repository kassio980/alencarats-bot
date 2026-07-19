const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  customId:'btn_verificacao',
  async execute(c,i){
    await i.showModal(new ModalBuilder().setCustomId('modal_verificar').setTitle('🔥 Verificação Alencarats 🔥').addComponents(
      new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('nick').setLabel('Seu Nick no Servidor').setStyle(TextInputStyle.Short).setRequired(true)),
      new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('id').setLabel('Seu ID de Usuário').setStyle(TextInputStyle.Short).setValue(i.user.id).setRequired(true)),
      new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('email').setLabel('Seu E-mail').setStyle(TextInputStyle.Short).setRequired(true)),
      new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('serv').setLabel('Como conheceu a Alencarats?').setStyle(TextInputStyle.Paragraph).setRequired(true))
    ));
  },
  modalId:'modal_verificar',
  async execute(c,i){
    const n=i.fields.getTextInputValue('nick');
    const id=i.fields.getTextInputValue('id');
    const e=i.fields.getTextInputValue('email');
    const s=i.fields.getTextInputValue('serv');
    const servidor = i.guild.name;
    const idServidor = i.guild.id;
    const avatar = i.user.displayAvatarURL({dynamic:true,size:1024});

    // ✅ AGORA USA O NOVO ID DO CARGO QUE VOCÊ ENVIOU
    const cr = i.guild.roles.cache.get('1528505787058753667');
    if(cr) await i.member.roles.add(cr).catch(()=>{});

    // SALVA TODOS OS DADOS — NADA MUDOU AQUI
    await c.db.set(`verificado_${i.user.id}`,{
      nick:n, idUsuario:id, email:e, conheceu:s,
      servidor:servidor, idServidor:idServidor,
      avatar:avatar, data:new Date().toLocaleString('pt-BR')
    });

    // URL DO PORTAL MANTIDA EXATAMENTE COMO ESTAVA
    const linkVerificacao = `https://alencarats-bot.onrender.com/verificar?nick=${encodeURIComponent(n)}&id=${id}&email=${encodeURIComponent(e)}&servidor=${encodeURIComponent(servidor)}&idservidor=${idServidor}&avatar=${encodeURIComponent(avatar)}`;

    await i.reply({
      embeds:[new EmbedBuilder().setColor('#00ff00')
      .setTitle('✅ VERIFICADO COM SUCESSO!')
      .setDescription(`Bem-vindo **${n}**!\nAcesso liberado a todos os canais.\n\n📋 Dados registrados:\n👤 Servidor: **${servidor}**\n🆔 ID Servidor: \`${idServidor}\`\n📧 E-mail: \`${e}\``)
      .setThumbnail(avatar)],
      components:[new ActionRowBuilder().addComponents(
        new ButtonBuilder().setURL(linkVerificacao).setLabel('🔗 Acessar Portal de Verificação').setStyle(ButtonStyle.Link),
        new ButtonBuilder().setLabel('✅ OK').setStyle(ButtonStyle.Success).setCustomId('ok_verificado')
      )],
      ephemeral:true
    });
  }
};
