const express = require('express')
const static = require('express-static')
const cookieParser = require('cookie-parser')

var vip = {
    'wuhaohao' : '123456'
}

const server = express()

server.use(cookieParser())

server.use('', function (req, res, next) {
    res.cookie('user','wuhao')
    res.cookie('text','leo')
    res.cookie('password','132456')
    console.log(req.cookies)
    //res.send('ok')
    next()
})

server.use('/leo',function(req,res,next){
    console.log(req.cookies)
    res.send({
        user : req.cookies.user,
        pass : req.cookies.password
    })
    next()
})

server.use('/login',function(req,res,next){
    if(vip[req.query.user] == vip.wuhaohaoh) {
        res.send('ok')
    }else{
        res.send('no')
    }
})

server.use(static('./www'))
server.listen(9999)
