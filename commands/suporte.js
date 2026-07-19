module.exports = {
  name:'suporte',
  adminOnly:true,
  async execute(c,m,a){
    const db = c.db;
    const ac = a[0];
    const id = a[1]?.replace(/\D/g,'');
    if(ac==='adicionar' && id){
      let l = await db.get('cargos_suporte') || [];
      if(!l.includes(id)) l.push(id);
      await db.set('cargos_suporte', l);
      return m.reply(`✅ Cargo <@&${id}> adicionado!`);
    }
    if(ac==='remover' && id){
      let l = await db.get('cargos_suporte') || [];
      await db.set('cargos_suporte', l.filter(x => x !== id));
      return m.reply('✅ Cargo removido!');
    }
    const l = await db.get('cargos_suporte') || c.config.cargos_admin;
    m.reply(`👨‍💼 **EQUIPE DE SUPORTE:**\n${l.map(x => `<@&${x}>`).join('\n')}\n\nUso:\n\`+suporte adicionar @Cargo\`\n\`+suporte remover @Cargo\``);
  }
};
