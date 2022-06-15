// Weight slider

let weightIndicator = document.getElementById('weight-indicator')
let weightSlider = document.getElementById('weight-input')

weightIndicator.style.left = (weightSlider.value-45)*0.808333+'%'

weightSlider.oninput = (()=>{
    weightIndicator.style.left = (weightSlider.value-45)*0.808333+'%'
    weightIndicator.textContent = weightSlider.value + 'kg'
})

//gender toggler

let maleBtn = document.getElementById('btn-male')
let femaleBtn = document.getElementById('btn-female')

maleBtn.onclick = (()=>{
    maleBtn.classList.toggle('active')
    femaleBtn.classList.toggle('active')
})

femaleBtn.onclick = (()=>{
    femaleBtn.classList.toggle('active')
    maleBtn.classList.toggle('active')
})