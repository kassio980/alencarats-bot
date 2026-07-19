const fs = require('fs');
const path = require('path');

module.exports = (c) => {
  c.buttons = new Map();
  const pastas = fs.readdirSync('./systems');

  for(const pasta of pastas){
    const arquivos = fs.readdirSync(`./systems/${pasta}`).filter(f=>f.endsWith('.js'));
    for(const arq of arquivos){
      const mod = require(`../systems/${pasta}/${arq}`);
      if(!mod.customId) continue;
      
      // Se for Regex, armazena separado
      if(mod.customId instanceof RegExp){
        if(!c.regexButtons) c.regexButtons = [];
        c.regexButtons.push(mod);
      }else{
        c.buttons.set(mod.customId, mod);
      }
    }
  }

  console.log(`✅ ${c.buttons.size} botões carregados`);
  if(c.regexButtons) console.log(`✅ ${c.regexButtons.length} botões regex carregados`);
};
