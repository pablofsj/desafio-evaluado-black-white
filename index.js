import express from 'express'
import { engine } from 'express-handlebars';

const app = express()

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', { title: "Home Page 2.0", user: null })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/products', (req, res) => {
    res.render('products')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})