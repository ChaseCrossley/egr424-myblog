const express = require('express');
const fetch = require('node-fetch');
// express app
const app = express();

// listen for requests
app.listen(5000, () => {
    console.log("listening on port 5000");
});

// register view engine
//we need to define a view engine,  we will use EJS
//using app.set()
app.set('view engine', 'ejs');

// app.set('views', 'myviews');

let blogs = [];

function getDataWithFetch(url) {
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => blogs.push(data));
}

async function getNewBlog() {
    await getDataWithFetch(`https://jsonplaceholder.typicode.com/posts/${Math.floor(Math.random() * 100)}`)
}

getNewBlog();

app.get('/', (req, res) => {
    getNewBlog();
    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new blog'});
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});
