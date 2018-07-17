const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000
var app = express();

app.set("view engine",hbs);

hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper('getCurrentYear' , () => {
  return  new Date().getFullYear();
});

hbs.registerHelper('screamIt' , (text) => {
  return text.toUpperCase();
});





app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} , ${req.method} , ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log +'\n' , (err) => {
    if(err)
    {
      console.log('Unable to append to log file');
    }
  });
  next();
});


// app.use((req,res,next) => {
//   res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));
app.get('/' , (req,res) =>
{
  res.render('home.hbs' , {
    pageTitle : 'Home Page',
    welcomeMessage : 'Welcome To Home Page'
  })
});

app.get('/project' , (req,res) =>
{
res.render('project.hbs' , {
  pageTitle : 'Project Page',
  projectPortfolioMessage : 'Project portfolio Page'
});
});

app.get('/about', (req, res) =>{
  //res.send("<h1> About page </h1>");
  res.render('about.hbs', {
    pageTitle : "About Page",

  });
});

app.get('/bad' , (req,res) => {
  res.send({
    errorMessage:'Unable to fulfill request'
  });
});

app.listen(port , () => {
  console.log(`Server is up on port ${port}`);
});
