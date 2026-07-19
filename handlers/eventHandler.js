const fs=require('fs'),p=require('path');
module.exports=c=>fs.readdirSync(p.join(__dirname,'../events')).filter(f=>f.endsWith('.js')).forEach(f=>{const x=require(`../events/${f}`);x.once?c.once(x.name,(...a)=>x.execute(c,...a)):c.on(x.name,(...a)=>x.execute(c,...a))});
