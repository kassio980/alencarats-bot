module.exports = {
  name:'messageCreate',
  async execute(c,m){
    if(m.author.bot) return;
    const db = c.db;
    if(m.channel.type === 1){
      const t = await db.get(`ticket_${m.author.id}`);
      if(!t) return;
      const ch = c.channels.cache.get(t.canalId);
      if(!ch) return;
      await ch.send({
        embeds:[{
          color:0x00ff88,
          author:{name:`👤 ${m.author.tag}`,icon_url:m.author.displayAvatarURL()},
          description:m.content||'📎 Anexo',
          timestamp:new Date()
        }],
        files:m.attachments.map(a=>a.url)
      });
      t.mensagens = t.mensagens || [];
      t.mensagens.push({de:'cliente',c:m.content,d:new Date()});
      await db.set(`ticket_${m.author.id}`,t);
      return;
    }
    const uid = await db.get(`ticket_canal_${m.channel.id}`);
    if(!uid || m.content.startsWith('+')) return;
    try{
      const u = await c.users.fetch(uid);
      await u.send({
        embeds:[{
          color:0xff4400,
          author:{name:`👨‍💼 Equipe - ${m.author.tag}`,icon_url:m.author.displayAvatarURL()},
          description:m.content||'📎 Anexo',
          timestamp:new Date()
        }],
        files:m.attachments.map(a=>a.url)
      });
      await m.react('✅');
      const t = await db.get(`ticket_${uid}`);
      t.mensagens = t.mensagens || [];
      t.mensagens.push({de:'equipe',a:m.author.tag,c:m.content,d:new Date()});
      await db.set(`ticket_${uid}`,t);
    }catch(e){ m.reply('❌ Não consegui enviar pra DM!') }
  }
};
