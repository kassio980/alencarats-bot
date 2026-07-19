const fs=require('fs'),p=require('path');
module.exports=c=>fs.readdirSync(p.join(__dirname,'../systems')).forEach(d=>fs.readdirSync(p.join(__dirname,`../systems/${d}`)).filter(f=>f.endsWith('.js')).forEach(f=>{const x=require(`../systems/${d}/${f}`);if(x.customId)c.buttons.set(x.customId,x);if(x.modalId)c.modals.set(x.modalId,x)}));
