const autocomplete = document.getElementById('autocomplete');

var selectedSymptoms = [];

if (pagetype === 'Diagnose') {
    const diagnose_input = document.getElementById('diagnose-input');

    diagnose_input.addEventListener('keyup', () => {
        autocomplete.innerHTML = '';
        let allMatchedSymptoms = [];

        for (condition in conditions) {
            // Get all symptoms
            for (let i = 0; i < conditions[condition]['symptoms'].length; i++) {
                if (!allMatchedSymptoms.includes(conditions[condition]['symptoms'][i]))
                    allMatchedSymptoms.push(conditions[condition]['symptoms'][i])
            }
        }
        // Get matched
        for (let i = 0; i < allMatchedSymptoms.length; i++) {
            if (allMatchedSymptoms[i].toLowerCase().includes(diagnose_input.value.toLowerCase())) {
                let autocomplete_input = `<input type="checkbox" name="autocomplete-${allMatchedSymptoms[i]}" id="autocomplete-${allMatchedSymptoms[i]}" onchange="onSymptomSelect('${allMatchedSymptoms[i]}')"><label for="autocomplete-${allMatchedSymptoms[i]}">${allMatchedSymptoms[i]}</label><br>`
                if (selectedSymptoms.includes(allMatchedSymptoms[i]))
                    autocomplete_input = `<input type="checkbox" name="autocomplete-${allMatchedSymptoms[i]}" id="autocomplete-${allMatchedSymptoms[i]}" onchange="onSymptomSelect('${allMatchedSymptoms[i]}')" checked><label for="autocomplete-${allMatchedSymptoms[i]}">${allMatchedSymptoms[i]}</label><br>`
                autocomplete.innerHTML += autocomplete_input;
            }
        }

        // If nothing searched
        if (diagnose_input.value === '') {
            autocomplete.innerHTML = '';
            allMatchedSymptoms = [];
        }
    })
} else {
    const treatment_input = document.getElementById('treatment-input');
    treatment_input.addEventListener('keyup', () => {
        autocomplete.innerHTML = '';
        let allMatchedConditions = [];

        for (condition in conditions) {
            allMatchedConditions.push(conditions[condition]["condition"]);
        }

        // Get matched
        for (let i = 0; i < allMatchedConditions.length; i++) {
            if (allMatchedConditions[i].toLowerCase().includes(treatment_input.value.toLowerCase()))
                autocomplete.innerHTML += `<div>${allMatchedConditions[i]}</div><br>`;
        }
    })
}


function onSymptomSelect(symptom) {
    if (document.getElementById(`autocomplete-${symptom}`).checked) {
        selectedSymptoms.push(symptom)
    } else
        selectedSymptoms.pop(symptom)

    document.getElementById('selected').innerHTML = ''
    for (let i = 0; i<selectedSymptoms.length; i++) {
        document.getElementById('selected').innerHTML += `<input type="checkbox" name="${selectedSymptoms[i]}" value="${selectedSymptoms[i]}" checked onchange="this.checked=true">${selectedSymptoms[i]}</input><br>`
    }
}