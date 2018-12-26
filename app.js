const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

var port = process.env.PORT || 3000 ;

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

app.get('/project',(req,res) => {
  res.render('project.hbs',{
    title : 'Projects'
  })
});


app.get('/bad',(req,res) => {
  res.send({message : 'Bad Request'})
});

app.listen(port,() => {
  console.log(`Server started and listening at port ${port}`);
});
