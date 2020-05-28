// window.onload = function () {

// Размеры модального окна по атрибуту кнопки:
let modalWindowWidth,
    modalWindowHeight,
    modalWindowcontent;

//Получаем размеры пользовательского окна:
let windowWidth = document.documentElement.clientWidth;
// let windowHeight = document.documentElement.clientHeight;!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//Получаем необходимые элементы документа:

let modalWindow;
let body = document.querySelector('body');
let modalMask = document.querySelector('.modalMask');
let btnWindowCloseCollection = document.querySelectorAll('.modalWindow__closeButton');

let hlineCollection = document.querySelectorAll('.modalWindow__btnGraph-h');
let vlineCollection = document.querySelectorAll('.modalWindow__btnGraph-v');

let btnShowModalCollection = document.querySelectorAll('.btn-modalButton');

//"Слушаем" событие клик на кнопках показ модальных окон:
for (let i = 0; i < btnShowModalCollection.length; i++) {
    btnShowModalCollection[i].addEventListener("click", function () {

        //Включение модальной маски:
        body.style.overflow = "hidden";
        modalMask.style.display = "flex";
        setTimeout(() => {
            modalMask.style.opacity = "0.7"
        }, 100);

        //Обнуляем свойства кнопки закрытия окна:
        for (let i = 0; i < hlineCollection.length; i++) {
            hlineCollection[i].style.width = '';
        }
        for (let i = 0; i < vlineCollection.length; i++) {
            vlineCollection[i].style.height = '';
        }

        //Получаем атрибуты модального окна:
        modalWindowWidth = getAttributeWidth(event);
        modalWindowHeight = getAttributeHeight(event);
        modalWindowcontent = getAttributeContent(event);

        //Выбираем контент модального окна:
        if (modalWindowcontent == 'projects') {
            modalWindow = document.querySelector('#modalWindow-Projects');
        } else if (modalWindowcontent == 'resume') {
            modalWindow = document.querySelector('#modalWindow-Resume');
        } else {
            modalWindow = document.querySelector('#modalWindow-Hire');
        }



        //Расчитываем размеры модального окна, положение модального окна, показываем пользователю модальное окно:
        modalWindowParam();

    });
}

//Пересчитываем свойства модального окна при смене ориентации экрана:
window.addEventListener('resize', function (event) {
    //Работаем при показанном модальном окне:
    if (modalMask.style.display == "flex") {
        modalWindowRecalc();
    }
});

//Закрываем модальное окно по клику:
for (let i = 0; i < btnWindowCloseCollection.length; i++) {
    btnWindowCloseCollection[i].addEventListener("click", function () {

        //Анимация кнопки закрытия окна:
        for (let i = 0; i < hlineCollection.length; i++) {
            hlineCollection[i].style.width = 0;
        }
        for (let i = 0; i < vlineCollection.length; i++) {
            vlineCollection[i].style.height = 0;
        }

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
}

//Функции
function getAttributeWidth(event) {
    return event.target.getAttribute('data-width');
}

function getAttributeHeight(event) {
    return event.target.getAttribute('data-height');
}

function getAttributeContent(event) {
    return event.target.getAttribute('data-modal');
}

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