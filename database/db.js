const { QuickDB } = require('quick.db');
const path = require('path');
const fs = require('fs');

// Garante que a pasta existe
const dbPath = path.join(__dirname, 'dados.json');
if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, '{}');

// Inicializa SEM especificar driver — força o modo JSON nativo
module.exports = new QuickDB({
  filePath: dbPath
});
