module.exports={name:'messageCreate',execute:(c,m)=>{
if(m.author.bot||!m.content.startsWith(c.config.prefix))return;
const a=m.content.slice(1).trim().split(/ +/),n=a.shift().toLowerCase(),x=c.commands.get(n);if(!x)return;
if(x.adminOnly&&!m.member?.roles?.cache.some(r=>c.config.cargos_admin.includes(r.id)))return m.reply('❌ Sem permissão!').then(x=>setTimeout(()=>x.delete(),4000));
try{x.execute(c,m,a)}catch(e){console.error(e)}}};
