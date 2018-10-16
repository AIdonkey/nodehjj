var express = require('express');
var router = express.Router();
var mongo = require('mongodb')
var MongoClient = mongo.MongoClient;
var superagent = require('superagent')
var axios = require('axios')
var circle = require('./circle')
const _ = require('lodash')
const EventEmitter = require('events')
const fs = require('fs')
const dns = require('dns')
const cluster = require('cluster')
/* GET users listing. */
class myEmitter extends EventEmitter {}
const myEmitter1 = new myEmitter()
const myEmitter2 = new myEmitter()
const promise4 = [2, 3, 5, 6].map((id) =>{
  return id
})
Promise.all(promise4).then(function (ids) {
}).catch(function (err) {
  console.log(err)
})

myEmitter2.once('newListener', (event,listener) => {
  if (event === 'event') {
    myEmitter2.on('event', () => {
      console.log('B')
    })
  }
});
dns.lookup('hihjj.com', (err, address, family) => {
  console.log('addres: %j family: %s', address, family)
})
myEmitter2.on('event', ()=> {})
myEmitter1.on('event', () => {
  console.log('触发了时间')
})
console.log(fs.readFileSync('11.txt'))
function costmoney(wage, price) {
  this.wage = wage
  this.price =  price
}
myEmitter1.emit('event')
router.get('/login', function(req, res, next) {
  (async function () {
    let res2 = await axios.get('https://api.imjad.cn/bilibili/v2/?aid=170001&page=1&quality=2')
    console.log(res.send('success'))
  })()
  console.log(1)
});
router.get('/456', function(req, res, next) {
  let axi = axios.get('https://cnodejs.org/').then(function (res){
    console.log(res)
  })
  function timeout () {
    return new Promise((resolve, reject) => {
      console.log(new Date())
      axios.get('https://cnodejs.org/').then(function (res){
      
      })
    })
  }
  timeout().then((value) =>{
    console.log(new Date())
    console.log(value)
  })
  
  res.send('hello kk')
})
module.exports = router;
