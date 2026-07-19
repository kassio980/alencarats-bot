const { QuickDB } = require('quick.db');
const path = require('path');
module.exports = new QuickDB({
  filePath: path.join(__dirname, 'dados.json'),
  driver: 'json'
});
