var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle('border-accordion');
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

const bookimage = document.getElementById('book-image')
const sponsorimage = document.getElementById('sponsor-image')
const foodimage = document.getElementById('food-image')
const clothesimage = document.getElementById('clothes-image')

const booktext = document.getElementById('book-text')
const sponsortext = document.getElementById('sponsor-text')
const foodtext = document.getElementById('food-text')
const clothestext = document.getElementById('clothes-text')

const show = (text, image) => {
    image.addEventListener('mouseenter', () => {
        text.classList.add('hidden')
        text.classList.remove('showing')
    })

    image.addEventListener('mouseleave', () => {
        text.classList.remove('hidden')
        text.classList.add('showing')
    })
}

show(booktext, bookimage)
show(sponsortext, sponsorimage)
show(foodtext, foodimage)
show(clothestext, clothesimage)