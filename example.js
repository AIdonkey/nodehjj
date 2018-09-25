let http = require('http')
const fs = require('fs')
const cluster = require('cluster')
const crypto = require('crypto')
const numCPUs = require('os').cpus().length;
console.log(numCPUs)
console.log(cluster.isMaster)
str = "abcd"
buf = new Buffer(str.length)
for (let i = 0; i < str.length; i++) {
  buf[i] = str.charCodeAt(i)
}
let localVar = 123, usingscript, evaled;
const secrect = 'hjj62013410'
const hello =crypto.createHmac('sha256', secrect)
const url = require('url');
const proxy = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('okay')
});
proxy.on('connect', (req, cltSocket, head) => {

})
hello.on('readable', () => {
  const data = hello.read();
  if (data) {
    console.log(data.toString('hex'))
  }
})
console.log(crypto.getCiphers())
console.log(crypto.getHashes())
hello.write('hjjjjjjjj')
hello.end()