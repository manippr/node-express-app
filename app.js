const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res,next) => {
  var log = {
    timestamp : new Date().toString(),
    method : req.method,
    url : req.url
  };

  fs.appendFile('server.log',JSON.stringify(log),(err) => {
    if(err){
      console.log('Error Occured : Could not update log.');
    }
  });

  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.get('/',(req,res) => {
  //res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name : 'Mani R',
  //   age : 29,
  //   city : 'bengaluru'
  // });
  res.render('home.hbs',{
    title : 'Welcome to home page',
    sampleText : 'This is a sample text provided in the home page'
  });

});


app.get('/about',(req,res) => {
  res.render('about.hbs',{
    title : 'About Page'
  });
});


app.get('/bad',(req,res) => {
  res.send({message : 'Bad Request'})
});

app.listen(3000,() => {
  console.log('Server started and listening at port 3000');
});
