require('http').createServer((q,r)=>{r.writeHead(200);r.end('✅ Alencarats Online - '+new Date().toLocaleString('pt-BR'))}).listen(process.env.PORT||10000,'0.0.0.0',()=>console.log('✅ Keepalive OK'));
