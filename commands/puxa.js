const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  name:'puxa',
  adminOnly:true,
  async execute(c,m){
    const g = m.guild;
    const todos = await c.db.all();
    const v = todos.filter(d=>d.id.startsWith('verificado_')).length;
    m.channel.send({
      embeds:[new EmbedBuilder().setColor(c.config.cor_embed)
        .setTitle('🔥 MEMBROS VERIFICADOS DA ALENCARATS')
        .addFields(
          {name:'👥 Total',value:`${g.memberCount}`,inline:true},
          {name:'✅ Verificados',value:`${v}`,inline:true},
          {name:'🟢 Online',value:`${g.members.cache.filter(x=>x.presence?.status!=='offline').size}`,inline:true}
        )],
      components:[new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('btn_puxar')
          .setLabel('🔥 PUXA 🔥')
          .setStyle(ButtonStyle.Success)
          .setEmoji('🚀')
      )]
    });
    m.delete();
  }
};
