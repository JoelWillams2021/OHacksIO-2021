const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;


app.get("/", (req, res) => {
    res.render('index');
});

app.post("/", (req, res) => {

});

app.get("/cpr", (req, res) => {
    res.render('cpr');
})
  
app.listen(port, () => {
    console.log(`Running on: http://127.0.0.1:${port}`);
});
