const express = require('express');

const app = express();


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

var conditions = require('./data/symptoms.json');

app.get("/", (req, res) => {
    return res.render('index', {
        pagetype: 'Diagnose',
        conditions: conditions
    });
});

app.get("/cpr", (req, res) => {
    return res.render('cpr');
});

app.get("/diagnose", (req, res) => {
    return res.redirect('/')
});

app.get("/treatment", (req, res) => {
    return res.render('index', {
        pagetype: 'Treatment',
        conditions: conditions
    });
});

app.get("/treatment/:condition", (req, res) => {

    const premade_pages = [
        'cpr',
        'ems',
        'vitals'
    ]

    if (premade_pages.includes(req.params['condition']))
        return res.render(`treatment/${req.params['condition']}`)
    else
        return res.render('treatment/treatment', {
            condition: conditions[req.params['condition']]['condition'],
            symptoms: conditions[req.params['condition']]['symptoms'],
            treatment: conditions[req.params['condition']]['treatment']
        })
})

app.get("/search", (req, res) => {

    let matchedConditions = {};
    let inputtedSymptoms = [];
    for (condition in conditions) {

        for (let i = 0; i < conditions[condition]['symptoms'].length; i++) {
            for (symptom in req.query) {
                if (!inputtedSymptoms.includes(symptom))
                    inputtedSymptoms.push(symptom);
                if (conditions[condition]['symptoms'][i] === req.query[symptom]) {
                    if (!matchedConditions[condition])
                        matchedConditions[condition] = 1;
                    else
                        matchedConditions[condition] += 1;
                }
            }
        }

    }

    let sortedMatchedConditionsList = Object.keys(matchedConditions).map(function(key) {
        return [key, matchedConditions[key]];
    });
    sortedMatchedConditionsList.sort(function(first, second) {
        return second[1] - first[1];
    });
    let sortedMatchedConditions = {}
    for (let i = 0; i < sortedMatchedConditionsList.length; i++) {
        sortedMatchedConditions[sortedMatchedConditionsList[i][0]] = sortedMatchedConditionsList[i][1]
    }


    console.log(inputtedSymptoms)
    return res.render('search', {
        matchedConditions: sortedMatchedConditions,
        conditions: conditions,
        inputtedSymptoms: inputtedSymptoms
    })
})
  
app.listen(port, () => {
    console.log(`Running on: http://127.0.0.1:${port}`);
});

