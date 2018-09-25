var express = require('express');
var router = express.Router();
const server = require('http')
const fs = require('fs')
const myemitter = require('events')
const mongoclient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const socket = require('superagent')
const configuration = require('../configuration')
const WebSocket = require('ws')
const ws = new WebSocket.Server({port: 3001})
ws.on('connection',function connection(ws){
   ws.on('message', function incoming(message){
     console.log('received: %s',message)
   })
  ws.send('fasongchengong')
})
/* GET home page. */
var color1 = function () {
  return '#'+(function colorrandom(color){
      return (color += '123456789abcdef'[Math.floor(Math.random()*16)]) && (color.length === 6)? color : colorrandom(color)
  }
  )('')
}
console.log(color1())
class Userhandle {
  login (req, res) {
    let user = req.body
    console.log(req.body)
    mongoclient.connect(url, function(err, db) {
      if (err) throw err;
      let dbo = db.db('donkey')
      let query  = {name: user.name};
      let myobj = {name: req.body.name, password : req.body.password, address: req.body.cookie123}
      // dbo.collection('customer').find(query).toArray(function (err, result) {
      //   if (err) throw err;
      //   console.log(result);
      //   db.close()
      // })
      dbo.collection('customer').insertOne(myobj,function(err, res) {
        if (err) throw err;
        console.log('success');
        db.close();
      })
    })
    if (user.name === 'aixiaodegwwd' && user.password === 'putianren') {
      res.send('gwwd')
    } else {
      res.send('failed')
    }
  }
  register (req, res) {
    let user = req.body
    mongoclient.connect(url, function(err, db) {
      if (err) throw err;
      let dbo = db.db('donkey')
      let query  = {name: user.name};
      dbo.collection('customer').find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close()
      })
      dbo.collection('customer').find()
    })
    if (user.name === 'aixiaodegwwd' && user.password === 'putianren') {
      res.send('gwwd')
    } else {
      res.send('failed')
    }
  }
  superlogin (req, res) {
    let user = req.body
    mongoclient.connect(url, function(err, db) {
      if (err) throw err;
      let dbo = db.db('donkey')
      let query = {name: user.name};
    })
  }
}
const userhandle = new Userhandle()
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', function(req, res) {
  res.end('hello world')
  userhandle.login(req, res)
})
router.post('/register', function(req, res) {
  userhandle.register(req, res)
})
router.post('/superlogin', function(req, res) {
  userhandle.superlogin(req, res)
})
router.post('/gw', function (req, res) {
  res.send('aixiaodegwwd')
})
module.exports = router;
