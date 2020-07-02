const express = require('express');
const ejs = require('ejs')
const mongoose = require('mongoose');
const blog = require('./models/blog');
const Blog = require('./models/blog');

const app = express();
const dbURI = 'mongodb+srv://izzaz:izzaz13307@cluster0.fao4d.mongodb.net/blogowlhead?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))
app.set('view engine','ejs');

// app.listen(3000);

app.use(express.static('public'))



app.get('/add-blog',(req,res) => {
    const blog = new Blog({
        title: ' New blog',
        snippet: 'about my new blog',
        body:'this is the body of the blog'
    })

    blog.save()
    .then((result) =>{
        res.send(result)
    })
    .catch((err) => console.log(err));
})




app.get('/', (req,res) => {
    // res.send('this is home')
    // to redirect to a different route
    res.redirect('./blogs') 
    // res.render('index',{title: 'Home'})
})



app.get('/about', (req,res) => {
    res.render('about' ,{title: 'About'})
})

app.get('/blogs',(req,res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index',{title: 'All Blogs', blogs: result})
        })
        .catch((err)=> console.log(err))
})

app.get('/blogs/create', (req,res) => {
    res.render('create' ,{title: 'Create Blog Post'})
})



app.use((req,res) => {
    res.status(404).render('404',{title: '404'})
})