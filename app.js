const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
 const User = require('./models/puser');
const mongoose=require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

 app.use((req, res, next) => {
  User.findById('641456d9d43f57d12c185709')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
.connect('mongodb+srv://sumanth:Sumanth27102001@cluster0.ssmcy1t.mongodb.net/shop?retryWrites=true&w=majority')
.then((result)=>{
  console.log("Connected!");
  User.findOne().then(user=>{
    if(!user){
      const user=new User({
        name:"Sumanth",
        email:"Sumanthn876@gmail.com",
        cart:{
          items:[]
        }
      })
        user.save();
    }
  })
    app.listen(3000);
})
.catch((err)=>{
  console.log(err);
})
