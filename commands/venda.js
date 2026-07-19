const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  name:'venda',
  adminOnly:true,
  execute:(c,m)=>{
    m.channel.send({
      embeds:[new EmbedBuilder().setColor(c.config.cor_embed)
        .setTitle('💸 LOJA ALENCARATS')
        .setDescription('Sistema completo de vendas')
        .addFields(
          {name:'🛒 Loja',value:'Produtos'},
          {name:'🎫 Entradas',value:'VIP/Eventos'},
          {name:'🛍️ Carrinho',value:'Seus itens'},
          {name:'📜 Pedidos',value:'Histórico'}
        )],
      components:[new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('loja_ver') // ← NOME EXATO QUE ESTÁ NO ARQUIVO loja.js
          .setLabel('🛒 VER LOJA')
          .setStyle(ButtonStyle.Primary)
      )]
    });
  }
};
