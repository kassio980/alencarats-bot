const fs = require('fs');
module.exports={
  customId:'fechar_ticket',adminOnly:true,
  async execute(c,i){
    const uid = await c.db.get(`ticket_canal_${i.channel.id}`);
    if(!uid) return;
    const dados = await c.db.get(`ticket_${uid}`);
    const arq = `ticket_${uid}.txt`;
    fs.writeFileSync(arq,`ATENDIMENTO ${dados.categoria}\nCliente: ${uid}\nAberto: ${dados.data||'---'}\nMensagens:\n${dados.mensagens?.map(x=>`${x.de}: ${x.c}`).join('\n')||'Nenhuma'}`);
    try{const u = await c.users.fetch(uid);await u.send({content:'🔒 Atendimento encerrado!',files:[arq]})}catch(e){}
    await c.db.delete(`ticket_${uid}`); await c.db.delete(`ticket_canal_${i.channel.id}`);
    fs.unlinkSync(arq);
    i.reply('🔒 Fechando...');
    setTimeout(()=>i.channel.delete().catch(()=>{}),2000);
  },
  customId:'transcript_ticket',adminOnly:true,
  async execute(c,i){
    const uid = await c.db.get(`ticket_canal_${i.channel.id}`);
    if(!uid) return;
    const dados = await c.db.get(`ticket_${uid}`);
    const arq = `relatorio_${uid}.txt`;
    fs.writeFileSync(arq,`${dados.mensagens?.map(x=>`${x.de}: ${x.c}`).join('\n')||'Sem mensagens'}`);
    i.reply({files:[arq]});
    setTimeout(()=>fs.unlinkSync(arq),5000);
  }
};
