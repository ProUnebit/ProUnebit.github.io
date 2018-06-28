// The selectors
const menuOpenBtn = document.querySelector('.header__menu-open');
const menuCloseBtn = document.querySelector('.header__menu-close');
const menuSectionsList = document.querySelector('.header__menu-sections-list');
const menuSectionsItems = document.querySelectorAll('.header__menu-item');
const sliderArrowBack_1 = document.querySelector('.slider-1__arrow-back');
const sliderArrowNext_1 = document.querySelector('.slider-1__arrow-next');
const inputMail = document.getElementById('input-email');
const inputSubject = document.getElementById('input-subject');
const textareaMessage = document.getElementById('textarea-message');
const submitMessage = document.querySelector('.messenger__submit');

// B L O C K S
// Header
// open menu
menuOpenBtn.addEventListener('click', () => {
    menuOpenBtn.style.display = 'none';
    menuCloseBtn.style.display = 'block';
    menuSectionsList.style.display = 'block';
});
// close menu
menuCloseBtn.addEventListener('click', () => {
    menuOpenBtn.style.display = '';
    menuCloseBtn.style.display = 'none';
    menuSectionsList.style.display = '';
});

// Slider-1
// obj options
let sliderOptions_1 = {
    stock: ['img/slider-1-photo-1.jpg', 'img/pexels-photo-234.jpg', 'img/pexels-photo-345.jpg', 'img/pexels-photo-108148.jpeg', 'img/pexels-photo-289796.jpeg', 'img/pexels-photo-298298.jpeg', 'img/pexels-photo-307847.jpeg', 'img/pexels-photo-320617.jpeg', 'img/pexels-photo-610293.jpeg', 'img/pexels-photo-850624.jpeg'],
    counter: 0,
    delay: 500,
    initSlide() {
        document.sliderOne.src = this.stock[this.counter];
        document.sliderOne.classList.add('slider-animation-1');
        setTimeout(() => { document.sliderOne.classList.remove('slider-animation-1'); }, this.delay);
    },
    backSlide() {
        if (sliderOptions_1.counter < 1) {
            sliderOptions_1.counter = sliderOptions_1.stock.length;
        }
        sliderOptions_1.counter--;
        sliderOptions_1.initSlide();
    },
    nextSlide() {
        if (sliderOptions_1.counter == sliderOptions_1.stock.length - 1) {
            sliderOptions_1.counter = 0;
        } else sliderOptions_1.counter++;
        sliderOptions_1.initSlide();
    }
};
// action - arrows listeners
sliderArrowBack_1.addEventListener('click', sliderOptions_1.backSlide);
sliderArrowNext_1.addEventListener('click', sliderOptions_1.nextSlide);

// Slider-2
// init 'Slick.js' slider (jQuery)
$(document).ready(function(){
  $('.slider-2__roundabout').slick({
      slidesToShow: 3,
      focusOnSelect: true,
      dots: true,
      adaptiveHeight: true,
      speed: 900
  })
});

// Messenger
// input auto value
function blurInput(e) {
    this.value = (this.value == '') ? this.title : this.value;
};

function focusInput(e) {
    this.value = (this.value == this.title) ? '' : this.value;
};

for (elem of document.forms[0].elements) {
    if (elem.tagName == 'INPUT') {
        elem.addEventListener('blur', blurInput);
        elem.addEventListener('focus', focusInput);
    }
}
// validation form
// regular expression for #input-email (check), example: test@test.com
let regExForMail = /\S+@\S+\.\S+/;
// check #input-email & #input-subject
function checkInput() {
    if (inputSubject.value.trim() !== ''
    &&
    inputSubject.value !== inputSubject.title
    &&
    textareaMessage.value.trim() !== ''
    &&
    regExForMail.test(inputMail.value)) {
        submitMessage.style.backgroundColor = '#66CC66';
        submitMessage.style.cursor = 'pointer';
        submitMessage.disabled = false;
    } else {
        submitMessage.style.backgroundColor = '';
        submitMessage.style.cursor = 'not-allowed';
        submitMessage.disabled = true;
    }
}
// submitted data and preventDefault method for form, reload page -> to appoint default value
document.forms[0].addEventListener('submit', e => {
    e.preventDefault();

    if (inputSubject.value == inputSubject.title
        &&
        inputMail.value == inputMail.title
        &&
        textareaMessage.value == textareaMessage.placeholder) {
            return;
        }
// message value
    console.info('Message: ' + textareaMessage.value);
// reload page
    setTimeout( () => { location.reload(); }, 2500);
    inputSubject.value = inputSubject.title;
    inputMail.value = inputMail.title;
    textareaMessage.value = textareaMessage.placeholder;
});

// Scrolling to sections
function ScrollTo(e) {
    e.preventDefault();
    const speed = 0.45;
    let w = window.pageYOffset;
    let hash = this.href.replace(/[^#]*(.*)/, '$1');
    let t = document.querySelector(hash).getBoundingClientRect().top;
    let start = null;
    requestAnimationFrame(step);
    function step(time) {
        if (start === null) start = time;
        let progress = time - start;
        let r = (t < 0 ? Math.max(w - progress / speed, w + t) : Math.min(w + progress / speed, w + t));
        window.scrollTo(0, r);
        if (r !== w + t) {
            requestAnimationFrame(step);
        } else {
            location.hash = hash;
        }
    }
}
// listeners
for (let i = 0; i < menuSectionsItems.length; i++) {
    document.querySelector(`[href^="#section-${i+2}"]`).onclick = ScrollTo;
}

// Onload
// auto load first slide for "sliderOne"
document.addEventListener("DOMContentLoaded", () => {
    document.sliderOne.src = sliderOptions_1.stock[0];
});
