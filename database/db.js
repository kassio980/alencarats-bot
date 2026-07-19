const fs = require('fs');
const path = require('path');

const arquivo = path.join(__dirname, 'dados.json');

// Cria o arquivo se não existir
if (!fs.existsSync(arquivo)) fs.writeFileSync(arquivo, '{}', 'utf8');

const db = {
  get: async (chave) => {
    const dados = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
    return dados[chave] ?? null;
  },
  set: async (chave, valor) => {
    const dados = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
    dados[chave] = valor;
    fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2), 'utf8');
    return valor;
  },
  delete: async (chave) => {
    const dados = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
    delete dados[chave];
    fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2), 'utf8');
  },
  push: async (chave, valor) => {
    const dados = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
    if (!dados[chave]) dados[chave] = [];
    dados[chave].push(valor);
    fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2), 'utf8');
  },
  all: async () => {
    return Object.entries(JSON.parse(fs.readFileSync(arquivo, 'utf8'))).map(([id,value])=>({id,value}));
  }
};

module.exports = db;
