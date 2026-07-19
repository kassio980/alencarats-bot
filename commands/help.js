const { EmbedBuilder } = require('discord.js');
module.exports={name:'help',adminOnly:true,execute:(c,m)=>m.channel.send({embeds:[new EmbedBuilder().setColor(c.config.cor_embed).setTitle('🔥 COMANDOS ALENCARATS').addFields({name:'✅ VERIFICAÇÃO',value:'`+veri` `+puxa`'},{name:'💸 VENDAS',value:'`+venda`'},{name:'🎫 TICKETS',value:'`+painel` `+suporte`'})]})};
