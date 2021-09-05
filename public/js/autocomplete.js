const autocomplete = document.getElementById('autocomplete');

var selectedSymptoms = [];
const search_btn = document.getElementById('search-btn');

if (pagetype === 'Diagnose') {

    const diagnose_input = document.getElementById('diagnose-input');

    search_btn.disabled = true;

    diagnose_input.addEventListener('keyup', () => {
        autocomplete.innerHTML = '';
        let allMatchedSymptoms = [];

        for (condition in conditions) {
            console.log(`Condition : ${condition}`)
            // Get all symptoms
            for (let i = 0; i < conditions[condition]['symptoms'].length; i++) {
                if (!allMatchedSymptoms.includes(conditions[condition]['symptoms'][i]))
                    allMatchedSymptoms.push(conditions[condition]['symptoms'][i]);
            }
            allMatchedSymptoms.sort()
        }
        // Get matched
        for (let i = 0; i < allMatchedSymptoms.length; i++) {
            if (allMatchedSymptoms[i].toLowerCase().includes(diagnose_input.value.toLowerCase())) {
                let autocomplete_input = `<div class="px-2 py-1"><input type="checkbox" class="form-check-input" name="autocomplete-${allMatchedSymptoms[i]}" id="autocomplete-${allMatchedSymptoms[i]}" onchange="onSymptomSelect('${allMatchedSymptoms[i]}')"><label for="autocomplete-${allMatchedSymptoms[i]}" class="form-check-label">${allMatchedSymptoms[i]}</label></div>`;
                if (selectedSymptoms.includes(allMatchedSymptoms[i]))
                    autocomplete_input = `<div class="px-2 py-1"><input type="checkbox" class="form-check-input" name="autocomplete-${allMatchedSymptoms[i]}" id="autocomplete-${allMatchedSymptoms[i]}" onchange="onSymptomSelect('${allMatchedSymptoms[i]}')" checked><label for="autocomplete-${allMatchedSymptoms[i]}" class="form-check-label">${allMatchedSymptoms[i]}</label></div>`;
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

    let allMatchedConditions = [];
    let allMatchedConditionsHref = [];

    // If nothing searched
    if (treatment_input.value === '') {
        autocomplete.innerHTML = '';
        for (condition in conditions) {
            allMatchedConditions.push(conditions[condition]['condition']);
            allMatchedConditionsHref.push(condition);
        }
        allMatchedConditions.sort();
        allMatchedConditionsHref.sort();
        for (let i = 0; i < allMatchedConditions.length; i++) {
            autocomplete.innerHTML += `<div class="py-1"><a href="/treatment/${allMatchedConditionsHref[i]}" class="py-1">${allMatchedConditions[i]}</a></div>`;
        }
    }

    treatment_input.addEventListener('keyup', () => {
        autocomplete.innerHTML = '';

        // Get matched
        for (condition in conditions) {
            allMatchedConditions = [];
            allMatchedConditionsHref = [];
            if (conditions[condition]['condition'].toLowerCase().includes(treatment_input.value.toLowerCase())) {
                allMatchedConditions.push(conditions[condition]['condition']);
                allMatchedConditionsHref.push(condition);
            }
            allMatchedConditions.sort();
            allMatchedConditionsHref.sort();
            for (let i = 0; i < allMatchedConditions.length; i++) {
                autocomplete.innerHTML += `<div class="py-1"><a href="/treatment/${allMatchedConditionsHref[i]}" class="py-1">${allMatchedConditions[i]}</a></div>`;
            }
        }

    })
}


function onSymptomSelect(symptom) {
    if (document.getElementById(`autocomplete-${symptom}`).checked)
        selectedSymptoms.push(symptom);
    else
        selectedSymptoms.splice(selectedSymptoms.indexOf(symptom), 1);

    if (selectedSymptoms.length === 0)
        search_btn.disabled = true;
    else
        search_btn.disabled = false;

    document.getElementById('selected').innerHTML = ''
    for (let i = 0; i < selectedSymptoms.length; i++) {
        document.getElementById('selected').innerHTML += `<input type="checkbox" class="form-check-input" name="${selectedSymptoms[i]}" value="${selectedSymptoms[i]}" id="selected-${selectedSymptoms[i]}" onchange="removeSelectedSymptom('${selectedSymptoms[i]}')" checked></input><label for="selected-${selectedSymptoms[i]}" class="form-check-label">${selectedSymptoms[i]}</label><br>`;
    }
}

function removeSelectedSymptom(symptom) {

    if (document.getElementById(`selected-${symptom}`).checked)
        selectedSymptoms.push(symptom);
    else
        selectedSymptoms.splice(selectedSymptoms.indexOf(symptom), 1);


    if (selectedSymptoms.length === 0)
        search_btn.disabled = true;
    else
        search_btn.disabled = false;
//
    try {document.getElementById(`autocomplete-${symptom}`).checked = false} catch {}

    document.getElementById('selected').innerHTML = '';
    for (let i = 0; i < selectedSymptoms.length; i++) {
        document.getElementById('selected').innerHTML += `<input type="checkbox" class="form-check-input" name="${selectedSymptoms[i]}" value="${selectedSymptoms[i]}" id="selected-${selectedSymptoms[i]}" onchange="removeSelectedSymptom('${selectedSymptoms[i]}')" checked></input><label for="selected-${selectedSymptoms[i]}" class="form-check-label">${selectedSymptoms[i]}</label><br>`;
    }
}