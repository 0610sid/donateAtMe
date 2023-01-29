const bookdiv = document.getElementById('bookdiv')
const books = document.getElementById('books')
const sponsordiv = document.getElementById('sponsordiv')
const sponsor = document.getElementById('sponsor')
const fooddiv = document.getElementById('fooddiv')
const food = document.getElementById('food')
const appdiv = document.getElementById('appdiv')
const app = document.getElementById('app')
const but = document.getElementsByClassName('btn')
const apptxt = document.getElementById('apptext')
const booktxt = document.getElementById('booktext')
const foodtxt = document.getElementById('foodtext')
const spontxt = document.getElementById('spontext')
const formdiv = document.getElementById('formdiv')

var cat
var subcat

const addevent = (div, name) => {
    div.addEventListener("mouseenter", () => {
        name.classList.remove('hidden');
        name.classList.add('centered');
    })

    div.addEventListener("mouseleave", () => {
        name.classList.add('hidden');
        name.classList.remove('centered');
    })
}

const newevent = (div, name) => {
    div.addEventListener("mouseleave", () => {
        name.classList.remove('hidden');
    })

    div.addEventListener("mouseenter", () => {
        name.classList.add('hidden');
    })
}


newevent(appdiv, apptxt)
newevent(bookdiv, booktxt)
newevent(sponsordiv, spontxt)
newevent(fooddiv, foodtxt)
addevent(bookdiv, books)
addevent(sponsordiv, sponsor)
addevent(fooddiv, food)
addevent(appdiv, app)


function setval() {
    document.getElementById('cat').value = cat;
    document.getElementById('subcat').value = subcat;
}

function acad() {
    formdiv.classList.remove('hidden')
    cat = 'Books'
    subcat = 'Academic'
    setval()
}

function uacad() {
    formdiv.classList.remove('hidden')
    cat = 'Books'
    subcat = 'Unacademic'
    setval()
}

function fooditm() {
    formdiv.classList.remove('hidden')
    cat = 'Food'
    subcat = 'Food Items'
    setval()
}

function edu() {
    formdiv.classList.remove('hidden')
    cat = 'Sponsorship'
    subcat = 'Education'
    setval()
}

function med() {
    formdiv.classList.remove('hidden')
    cat = 'Sponsorship'
    subcat = 'Medical Bills'
    setval()
}

function rec() {
    formdiv.classList.remove('hidden')
    cat = 'Sponsorship'
    subcat = 'Recreation for NGO'
    setval()
}

function happ() {
    formdiv.classList.remove('hidden')
    cat = 'Sponsorship'
    subcat = 'Household Appliances'
    setval()
}

function med() {
    formdiv.classList.remove('hidden')
    cat = 'Sponsorship'
    subcat = 'Medical Bills'
    setval()
}

function toil() {
    formdiv.classList.remove('hidden')
    cat = 'Apparel and Toileteries'
    subcat = 'Toiletaries'
    setval()
}

function cloth() {
    formdiv.classList.remove('hidden')
    cat = 'Apparel and Toileteries'
    subcat = 'Clothes'
    setval()
}

function sport() {
    formdiv.classList.remove('hidden')
    cat = 'Apparel and Toileteries'
    subcat = 'Sports Gear'
    setval()
}

but[0].addEventListener("click", acad);
but[1].addEventListener("click", uacad);
but[2].addEventListener("click", med);
but[3].addEventListener("click", edu);
but[4].addEventListener("click", happ);
but[5].addEventListener("click", rec);
but[6].addEventListener("click", fooditm);
but[7].addEventListener("click", cloth);
but[8].addEventListener("click", toil);
but[9].addEventListener("click", sport);

for (let btn of but) {
    btn.addEventListener('click', function () {
        $('html,body').animate({
            scrollTop: $("#formdiv").offset().top
        }, 'fast');
    });
}