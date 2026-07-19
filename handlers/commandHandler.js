const fs=require('fs'),p=require('path');
module.exports=c=>fs.readdirSync(p.join(__dirname,'../commands')).filter(f=>f.endsWith('.js')).forEach(f=>{const x=require(`../commands/${f}`);c.commands.set(x.name,x)});
