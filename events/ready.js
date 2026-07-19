module.exports = {
  name:'ready',
  once:true,
  execute(c){
    console.log(`\n🔥 ${c.config.nome_bot} ONLINE!\n📡 ${c.user.tag}\n📊 Servidores: ${c.guilds.cache.size}`);
    c.user.setActivity({name:'Alencarats | +help', type:3});
  }
};
