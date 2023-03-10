const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ContactDance');
const port = 80;
//Define mongoose schema
const ContactSchema = new mongoose.Schema({
    name: String,
    age: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });
const Contact = mongoose.model('Contact', ContactSchema); 
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/Contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/Contact', (req, res)=>{
    var mydata= new Contact(req.body)
    mydata.save().then(()=>{
        res.send("This item has been saved in the database")
    }).catch(()=>{
     res.status(400).send("Item is not saved")   
    })
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});