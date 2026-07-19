const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
module.exports = {
  customId:'btn_puxar', adminOnly:true,
  async execute(c,i){
    await i.showModal(new ModalBuilder().setCustomId('modal_puxar').setTitle('🚀 Puxar Membros').addComponents(
      new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('qtd').setLabel('Quantidade').setStyle(TextInputStyle.Short).setRequired(true)),
      new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('ids').setLabel('ID Servidor Destino').setStyle(TextInputStyle.Short).setRequired(true)),
      new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('link').setLabel('Link Convite').setStyle(TextInputStyle.Short).setRequired(true))
    ));
  },
  modalId:'modal_puxar', adminOnly:true,
  async execute(c,i){
    const qtd = parseInt(i.fields.getTextInputValue('qtd'));
    const idServ = i.fields.getTextInputValue('ids');
    const link = i.fields.getTextInputValue('link');
    const alvo = c.guilds.cache.get(idServ);
    if(!alvo) return i.reply({content:'❌ Bot não está nesse servidor!',ephemeral:true});
    const lista = (await c.db.all()).filter(d=>d.id.startsWith('verificado_')).slice(0,qtd);
    await i.deferReply({ephemeral:true});
    let ok=0;
    for(const x of lista){
      try{
        const u = await c.users.fetch(x.id.replace('verificado_',''));
        await u.send(`🔥 Alencararts te convida!\n🔗 ${link}`);
        ok++
      }catch(e){}
    }
    await i.editReply(`✅ Enviados com sucesso: **${ok}/${qtd}**`);
  }
};
