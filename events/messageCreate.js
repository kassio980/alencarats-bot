module.exports = {
  name:'messageCreate',
  execute(c,m){
    if(m.author.bot) return;
    if(!m.content.startsWith(c.config.prefix)) return;
    const a = m.content.slice(c.config.prefix.length).trim().split(/ +/);
    const n = a.shift().toLowerCase();
    const cmd = c.commands.get(n);
    if(!cmd) return;
    if(cmd.adminOnly && !m.member?.roles?.cache.some(r=>c.config.cargos_admin.includes(r.id)))
      return m.reply('❌ Sem permissão!').then(x=>setTimeout(()=>x.delete(),4000));
    try{ cmd.execute(c,m,a) }catch(e){ console.error(e) }
  }
};
