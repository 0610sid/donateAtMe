const bookimage = document.getElementById('book-image')
const sponsorimage = document.getElementById('sponsor-image')
const foodimage = document.getElementById('food-image')
const clothesimage = document.getElementById('clothes-image')

const booktext = document.getElementById('book-text')
const sponsortext = document.getElementById('sponsor-text')
const foodtext = document.getElementById('food-text')
const clothestext = document.getElementById('clothes-text')

const buttons = document.getElementsByClassName('img-buttons')
const dropdown = document.getElementById('subcategory')
const droptxt = document.getElementById('subcategory-label')
const category = document.getElementById('category')

const itemdiv = document.getElementsByClassName('itemdiv')
const qdiv = document.getElementsByClassName('quantdiv')
const iteminput = document.getElementsByClassName('iteminput')
const qinput = document.getElementsByClassName('quantitem')
const rqbtn = document.getElementById('reqbtn')

function books(){
    droptxt.classList.remove('hidden')
    dropdown.classList.remove('hidden')
    dropdown.remove(dropdown[0])
    dropdown.remove(dropdown[1])
    dropdown.remove(dropdown[2])
    dropdown.remove(dropdown[3])
    category.value = "Books"
    const op1 = document.createElement("option")
    op1.text = "Academic"
    dropdown.add(op1,dropdown[0])
    const op2 = document.createElement("option")
    op2.text = "Unacademic"
    dropdown.add(op2, dropdown[1])

    rqbtn.classList.remove('hidden')
    iteminput[0].required = true
}

function clothes(){
    droptxt.classList.remove('hidden')
    dropdown.classList.remove('hidden')
    dropdown.remove(dropdown[0])
    dropdown.remove(dropdown[1])
    dropdown.remove(dropdown[2])
    dropdown.remove(dropdown[3])
    category.value = "Apparel and Toileteries"
    const op1 = document.createElement("option")
    op1.text = "Clothes"
    dropdown.add(op1,dropdown[0])
    const op2 = document.createElement("option")
    op2.text = "Toiletaries"
    dropdown.add(op2, dropdown[1])
    const op3 = document.createElement("option")
    op3.text = "Sports Gear"
    dropdown.add(op3, dropdown[2])

    rqbtn.classList.remove('hidden')
    iteminput[0].required = true
}

function sponsorship(){
    droptxt.classList.remove('hidden')
    dropdown.classList.remove('hidden')
    dropdown.remove(dropdown[0])
    dropdown.remove(dropdown[1])
    dropdown.remove(dropdown[2])
    dropdown.remove(dropdown[3])
    category.value = "Sponsorship"
    const op1 = document.createElement("option")
    op1.text = "Education"
    dropdown.add(op1,dropdown[0])
    const op2 = document.createElement("option")
    op2.text = "Medical Bills"
    dropdown.add(op2, dropdown[1])
    const op3 = document.createElement("option")
    op3.text = "Household Appliances"
    dropdown.add(op3, dropdown[2])
    const op4 = document.createElement("option")
    op4.text = "Recreation for NGO"
    dropdown.add(op4, dropdown[3])

    rqbtn.classList.remove('hidden')
    iteminput[0].required = true
}

function fooditem(){
    droptxt.classList.remove('hidden')
    dropdown.classList.remove('hidden')
    dropdown.remove(dropdown[0])
    dropdown.remove(dropdown[1])
    dropdown.remove(dropdown[2])
    dropdown.remove(dropdown[3])
    category.value = "Food"
    const op1 = document.createElement("option")
    op1.text = "Food Items"
    dropdown.add(op1,dropdown[0])

    rqbtn.classList.remove('hidden')
    iteminput[0].required = true
}

buttons[0].addEventListener("click",books)
buttons[1].addEventListener("click", clothes)
buttons[2].addEventListener("click", sponsorship)
buttons[3].addEventListener("click", fooditem)


const show = (text, image) => {
    image.addEventListener('mouseenter', () => {
        text.classList.add('hidden')
    })

    image.addEventListener('mouseleave', () => {
        text.classList.remove('hidden')
    })
}

show(booktext, bookimage)
show(sponsortext, sponsorimage)
show(foodtext, foodimage)
show(clothestext, clothesimage)



function showitem1(e) {
    if(e.target.value != "")
    {
        console.log("here")
        qinput[0].required = true
        qdiv[0].classList.remove('hidden')
    }
}

function showquant1(e) {
    if(e.target.value != "")
    {   
        itemdiv[1].classList.remove('hidden')
    }
}

iteminput[0].addEventListener('input',showitem1)
qinput[0].addEventListener('input',showquant1)

function showitem2(e) {
    if(e.target.value != "")
    {
        qinput[1].required = true
        qdiv[1].classList.remove('hidden')
    }
}

function showquant2(e) {
    if(e.target.value != "")
    {   
        itemdiv[2].classList.remove('hidden')
    }
}

iteminput[1].addEventListener('input',showitem2)
qinput[1].addEventListener('input',showquant2)

function showitem3(e) {
    if(e.target.value != "")
    {
        qinput[2].required = true
        qdiv[2].classList.remove('hidden')
    }
}

function showquant3(e) {
    if(e.target.value != "")
    {   
        itemdiv[3].classList.remove('hidden')
    }
}

iteminput[2].addEventListener('input',showitem3)
qinput[2].addEventListener('input',showquant3)

function showitem4(e) {
    if(e.target.value != "")
    {
        qinput[3].required = true
        qdiv[3].classList.remove('hidden')
    }
}

function showquant4(e) {
    if(e.target.value != "")
    {   
        itemdiv[4].classList.remove('hidden')
    }
}

iteminput[3].addEventListener('input',showitem4)
qinput[3].addEventListener('input',showquant4)

function showitem5(e) {
    if(e.target.value != "")
    {
        qinput[4].required = true
        qdiv[4].classList.remove('hidden')
    }
}

iteminput[4].addEventListener('input',showitem5)
