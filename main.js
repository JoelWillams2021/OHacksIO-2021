const express = require('express');

const app = express();


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

var conditions = require('./data/symptoms.json');

// BANDAGE URL: https://www.youtube.com/watch?v=Y1G8XQb0WBc

app.get("/", (req, res) => {
    res.render('index', {
        pagetype: 'Emergency',
        conditions: conditions
    });
});

app.get("/cpr", (req, res) => {
    res.render('cpr');
});

app.get("/emergency", (req, res) => {
    res.redirect('/')
});

app.get("/treatment", (req, res) => {
    res.render('index', {
        pagetype: 'Treatment',
        conditions: conditions
    });
});

app.get("/treatment/:condition", (req, res) => {

    const premade_pages = [
        'cpr',
        'ems'
    ]

    if (premade_pages.includes(req.params['condition']))
        res.render(`treatment/${req.params['condition']}`)
    else
        res.render('treatment/treatment', {
            condition: conditions[req.params['condition']]['condition'],
            symptoms: conditions[req.params['condition']]['symptoms'],
            treatment: conditions[req.params['condition']]['treatment']
        })
})
  
app.listen(port, () => {
    console.log(`Running on: http://127.0.0.1:${port}`);
});

