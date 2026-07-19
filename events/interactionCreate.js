module.exports={name:'interactionCreate',async execute:(c,i)=>{
if(i.isChatInputCommand())return;
if(i.isButton()||i.isStringSelectMenu()){const b=c.buttons.get(i.customId);if(!b)return;if(b.adminOnly&&i.member&&!i.member.roles.cache.some(r=>c.config.cargos_admin.includes(r.id)))return i.reply({content:'❌ Sem permissão!',ephemeral:true});try{await b.execute(c,i)}catch(e){console.error(e)}}
if(i.isModalSubmit()){const m=c.modals.get(i.customId);if(!m)return;try{await m.execute(c,i)}catch(e){console.error(e)}}}};
