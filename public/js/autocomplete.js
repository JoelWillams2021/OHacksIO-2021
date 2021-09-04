const autocomplete = document.getElementById('autocomplete');

var selectedSymptoms = [];

if (pagetype === 'Emergency') {
    const emergency_input = document.getElementById('emergency-input');

    emergency_input.addEventListener('keyup', () => {
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
            if (allMatchedSymptoms[i].includes(emergency_input.value)) {
                let autocomplete_input = selectedSymptoms.includes(allMatchedSymptoms[i]) ? `<input type="checkbox" name="autocomplete-${allMatchedSymptoms[i]}" id="autocomplete-${allMatchedSymptoms[i]}" onchange="onSymptomSelect('${allMatchedSymptoms[i]}')" checked><label for="autocomplete-${allMatchedSymptoms[i]}">${allMatchedSymptoms[i]}</label><br>` : `<input type="checkbox" name="autocomplete-${allMatchedSymptoms[i]}" id="autocomplete-${allMatchedSymptoms[i]}" onchange="onSymptomSelect('${allMatchedSymptoms[i]}')"><label for="autocomplete-${allMatchedSymptoms[i]}">${allMatchedSymptoms[i]}</label><br>`
                autocomplete.innerHTML += autocomplete_input;
            }
        }

        // If nothing searched
        if (emergency_input.value === '') {
            autocomplete.innerHTML = '';
            allMatchedSymptoms = [];
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
        document.getElementById('selected').innerHTML += `<li>${selectedSymptoms[i]}</li>`
    }
}