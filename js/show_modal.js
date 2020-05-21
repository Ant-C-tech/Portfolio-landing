// window.onload = function () {

// Размеры модального окна по заданию:
const modalWindowWidth = 1200,
    modalWindowHeight = 775;

//Получаем размеры пользовательского окна:
let windowWidth = document.documentElement.clientWidth;
// let windowHeight = document.documentElement.clientHeight;!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//Получаем необходимые элементы документа:
let modalWindow = document.querySelector('.modalWindow');
let body = document.querySelector('body');
let modalMask = document.querySelector('.modalMask');
let btnWindowClose = document.querySelector('.modalWindow__closeButton');
let hline = document.querySelector('.modalWindow__btnGraph-h');
let vline = document.querySelector('.modalWindow__btnGraph-v');

//"Слушаем" событие клик на кнопке:
document.querySelector('.btn-modalButton').addEventListener("click", function () {

    //Включение модальной маски:
    body.style.overflow = "hidden";
    modalMask.style.display = "flex";
    setTimeout(() => {
        modalMask.style.opacity = "0.7"
    }, 100);

    //Обнуляем свойства кнопки закрытия окна:
    hline.style.width = '';
    vline.style.height = '';

    //Расчитываем размеры модального окна, положение модального окна, показываем пользователю модальное окно:
    modalWindowParam();

});

//Пересчитываем свойства модального окна при смене ориентации экрана:
window.addEventListener('resize', function (event) {
    //Работаем при показанном модальном окне:
    if (modalMask.style.display == "flex") {
        modalWindowRecalc();
    }
});

//Закрываем модальное окно по клику:
btnWindowClose.addEventListener("click", function () {

    //Анимация кнопки закрытия окна:
    hline.style.width = 0;
    vline.style.height = 0;

    setTimeout(() => {
        modalWindow.style.bottom = -3000 + 'px';
    }, 300);
    setTimeout(() => {
        modalMask.style.opacity = "0";
    }, 500);
    setTimeout(() => {
        modalMask.style.display = "none";
    }, 1000);
    body.style.overflow = "visible";
});

function modalWindowParam() {

    windowWidth = document.documentElement.clientWidth;
    windowHeight = document.documentElement.clientHeight;

    modalWindow.style.display = "block";

    if (windowWidth > modalWindowWidth) {
        modalWindow.style.width = modalWindowWidth + "px";
        modalWindow.style.left = ((windowWidth - modalWindowWidth) / 2) + "px";
    } else {
        modalWindow.style.width = windowWidth + "px";
        modalWindow.style.left = 0;
    }

    if (windowHeight > modalWindowHeight) {
        modalWindow.style.height = modalWindowHeight + "px";
        setTimeout(() => {
            modalWindow.style.bottom = ((windowHeight - modalWindowHeight) / 2) + "px";
        }, 100);
    } else {
        modalWindow.style.height = windowHeight + "px";
        setTimeout(() => {
            modalWindow.style.bottom = 0;
        }, 100);
    }
}

function modalWindowRecalc() {

    windowWidth = document.documentElement.clientWidth;
    windowHeight = document.documentElement.clientHeight;

    if (windowWidth > modalWindowWidth) {
        modalWindow.style.width = modalWindowWidth + "px";
        modalWindow.style.left = ((windowWidth - modalWindowWidth) / 2) + "px";
    } else {
        modalWindow.style.width = windowWidth + "px";
        modalWindow.style.left = 0;
    }

    if (windowHeight > modalWindowHeight) {
        modalWindow.style.height = modalWindowHeight + "px";
        modalWindow.style.bottom = ((windowHeight - modalWindowHeight) / 2) + "px";
    } else {
        modalWindow.style.height = windowHeight + "px";
        modalWindow.style.bottom = 0;
    }
}



// }