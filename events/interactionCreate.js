module.exports = {
  name:'interactionCreate',
  async execute(c,i){
    if(i.isChatInputCommand()) return;

    // BOTÕES
    if(i.isButton()){
      // Verifica primeiro os exatos
      let botao = c.buttons.get(i.customId);
      
      // Se não achou, verifica os regex
      if(!botao && c.regexButtons){
        botao = c.regexButtons.find(b=>b.customId.test(i.customId));
      }

      if(!botao) return;

      // Verifica permissão
      if(botao.adminOnly && i.member){
        const temPerm = i.member.roles.cache.some(r=>c.config.cargos_admin.includes(r.id));
        if(!temPerm) return i.reply({content:'❌ Sem permissão!',ephemeral:true});
      }

      try{
        await botao.execute(c,i);
      }catch(e){
        console.error('Erro no botão:', e);
        if(!i.replied) await i.reply({content:'❌ Erro ao executar!',ephemeral:true});
      }
    }

    // MODAIS
    if(i.isModalSubmit()){
      const modal = c.modals.get(i.customId);
      if(!modal) return;
      try{ await modal.execute(c,i) }catch(e){ console.error(e) }
    }

    // MENUS DE SELEÇÃO
    if(i.isStringSelectMenu()){
      const menu = c.buttons.get(i.customId);
      if(!menu) return;
      try{ await menu.execute(c,i) }catch(e){ console.error(e) }
    }
  }
};
