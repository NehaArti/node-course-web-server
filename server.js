const express = require('express');
const hbs = require('hbs');
const fs= require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partial');
app.set('View Engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log("unable to append to server.log");
        }
    });
    next();
});
app.use((req,res,next)=>{
    res.render('maintebance.hbs');
n
});


hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle : 'home page',
        message : 'Welcome to website',

    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:"unable to fulfill user's request"
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle : 'about page',


    });
});

app.listen(3000,()=>{
    console.log("server is up on port 3000");
});