const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  customId:'abrir_ticket',
  async execute(c,i){
    const cat = i.values[0], u = i.user;
    if(await c.db.get(`ticket_${u.id}`)) return i.reply({content:'❌ Já tem ticket aberto!',ephemeral:true});
    try{await u.send(`👋 Atendimento **${cat.toUpperCase()}** iniciado!`)}catch(e){return i.reply({content:'❌ Habilite a DM!',ephemeral:true})}
    const canal = await i.guild.channels.create({
      name:`ticket-${u.username}`,
      parent:c.config.categoria_tickets,
      permissionOverwrites:[
        {id:i.guild.id,deny:['ViewChannel']},
        {id:u.id,allow:['ViewChannel','SendMessages']},
        {id:c.user.id,allow:['ViewChannel','ManageChannels','SendMessages']}
      ]
    });
    await c.db.set(`ticket_${u.id}`,{canalId:canal.id,categoria:cat,mensagens:[]});
    await c.db.set(`ticket_canal_${canal.id}`,u.id);
    await canal.send({
      embeds:[new EmbedBuilder().setColor('#00ff88')
        .setTitle(`🎫 ATENDIMENTO: ${cat.toUpperCase()}`)
        .addFields({name:'👤 Cliente',value:`<@${u.id}>`})],
      components:[new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('fechar_ticket').setLabel('🔒 FECHAR').setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId('transcript_ticket').setLabel('📜 RELATÓRIO').setStyle(ButtonStyle.Secondary)
      )]
    });
    i.reply({content:'✅ Ticket aberto! Verifique a DM.',ephemeral:true});
  }
};
