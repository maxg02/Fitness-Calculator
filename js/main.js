// Weight slider

const weightIndicator = document.getElementById('weight-indicator')
const weightSlider = document.getElementById('weight-range-input')

weightIndicator.style.left = (weightSlider.value-45)*0.808333+'%'
weightIndicator.textContent = weightSlider.value + 'kg'

weightSlider.oninput = (()=>{
    weightIndicator.style.left = (weightSlider.value-45)*0.808333+'%'
    weightIndicator.textContent = weightSlider.value + 'kg'
})

//gender toggler

let gender = 'male'

const maleBtn = document.getElementById('btn-male')
const femaleBtn = document.getElementById('btn-female')
const body = document.getElementById('body')
const toggler = document.getElementById('img-toggler')

maleBtn.onclick = ()=>{
    maleBtn.classList.toggle('active')
    femaleBtn.classList.toggle('active')
    
    toggler.classList.toggle('deployed')
    setTimeout(() => {
        body.src = 'imgs/bodies/male.png'
        gender = 'male'
        toggler.classList.toggle('deployed')
    }, 300)
       
}

femaleBtn.onclick = ()=>{
    femaleBtn.classList.toggle('active')
    maleBtn.classList.toggle('active')

    toggler.classList.toggle('deployed')
    setTimeout(() => {
        body.src = 'imgs/bodies/female.png'
        gender = 'female'
        toggler.classList.toggle('deployed')
    }, 300)
    
}

//get data

const btnCalc = document.getElementById('btn-calc')

btnCalc.onclick = ()=>{
    
    let age = document.getElementById('age-input').value
    if (age === ''){
        age = -1
    }
    else if (age == 0){
        age = 1
    }
    
    let weight = 0
    if (window.innerWidth > 768){
        weight = document.getElementById('weight-range-input').value
    } 
    else {
        weight = document.getElementById('weight-input').value
    }

    let height = document.getElementById('height-input').value
    let neck = document.getElementById('neck-input').value
    let waist = document.getElementById('waist-input').value
    let hip = document.getElementById('hip-input').value

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
		    'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
        }
    }

    fetch(`https://fitness-calculator.p.rapidapi.com/bodyfat?age=${age}&gender=${gender}&weight=${weight}&height=${height}&neck=${neck}&waist=${waist}&hip=${hip}`, options)

        .then(response => response.json())
        .then(response => {
            console.log(response)
            if(response.status_code === 422){
                showErrors(response.errors)
            }
            if(response.status_code === 200){
                showResults(response.data)
            }
        })
}

//results

const resultsModal = new bootstrap.Modal(document.getElementById('results-modal'))
const resultsTitle = document.querySelector('.modal-title')
const resultsBody = document.querySelector('.modal-body')

function showErrors(errors){
    
    resultsTitle.textContent = 'Wrong Values'
    resultsBody.innerHTML = '<ul></ul>'
    
    errors.forEach(error => {
        let errorElement = document.createElement('li')
        let errorContent = error[0].toUpperCase() + error.slice(1)
        errorElement.textContent = errorContent
        document.querySelector('.modal-body ul').appendChild(errorElement)
    })

    resultsModal.toggle()
}

function showWrongMeasurements() {
    resultsTitle.textContent = 'Wrong Measurements'
    
    resultsBody.textContent = 'The values you provide are not proportionally correct'
    resultsModal.toggle()

}

function showResults(data){

    for (let x in data){
        if (isFinite(data[x]) && data[x] < 1){
            showWrongMeasurements()
            return
        }
    }
    
    resultsTitle.textContent = 'Results'
    resultsBody.innerHTML = '<ul></ul>'
    let category = ''

    switch(data['Body Fat Category']){
        case 'Obese':
            category = "danger"
            break
        case 'Average':
            category = "warning"
            break
        case 'Fitness':
            category = "success"
            break
        case 'Athletes':
            category = "primary"
            break
        case 'Essential Fat':
            category = "info"
            break
    }

    let html = `
        
        <li>Body Fat: <span class="text-${category}">${data['Body Fat (BMI method)']}</span></li>
        <li>Body Fat Category: <span class="text-${category}">${data['Body Fat Category']}</span></li>
        <li>Body Fat Mass: <span class="text-${category}">${data['Body Fat Mass']}</span></li>
        <li>Lean Body Mass: <span class="text-${category}">${data['Lean Body Mass']}</span></li>

    `

    document.querySelector('.modal-body ul').innerHTML = html
    
    resultsModal.toggle()
}

// Dark mode toggler

const darkModeBtn = document.getElementById('darkModeToggler');
const navbar = document.querySelector('.navbar');
const calcContainer = document.getElementById('calc-container');
const calcTitle = document.getElementsByClassName('calc-title');
const formLabels = document.getElementsByClassName('form-label');
const formInputs = document.getElementsByClassName('form-control');
const imgToggler = document.getElementById('img-toggler')

darkModeBtn.onclick = () => {
    maleBtn.classList.toggle('dark-mode');
    femaleBtn.classList.toggle('dark-mode');

    navbar.classList.toggle('navbar-dark');
    navbar.classList.toggle('bg-dark');
    navbar.classList.toggle('bg-white');

    calcContainer.classList.toggle('bg-dark');
    calcContainer.classList.toggle('bg-white');
    
    for (let title of calcTitle){
        title.classList.toggle('dark-mode');
    };
    
    for (let label of formLabels){
        label.classList.toggle('text-white');
    };
    
    for (let input of formInputs){
        input.classList.toggle('bg-dark');
        input.classList.toggle('text-white');
    };

    darkModeBtn.classList.toggle('text-white');
    for (let icon of darkModeBtn.children){
        icon.classList.toggle('d-none')
    }

    imgToggler.classList.toggle('bg-dark');
    imgToggler.classList.toggle('bg-white');
}