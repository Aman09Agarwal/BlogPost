const express = require('express');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

//  DB connection
dbURI = 'mongodb://localhost:27017/blogpost?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//  register view engine
app.set('view engine', 'ejs');

//  middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res) => {
    res.redirect('/blogs');
});

app.get('/about',(req,res) => {
    res.render('about',{ title: 'About' });
});

//  blog routes
app.use('/blogs', blogRoutes);

// 404 - not found page
app.use((req, res) => {
    res.status(404).render('404',{ title: 'Not Found' });
});