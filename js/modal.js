window.onload = function () {

    // Размеры модального окна по заданию:
    const modalWindowWidth = 1200,
        modalWindowHeight = 775;

    //Получаем размеры пользовательского окна:
    let windowWidth = document.documentElement.clientWidth;
    let windowHeight = document.documentElement.clientHeight;
    //Получаем необходимые элементы документа:
    let modalWindow = document.querySelector('.modalWindow');
    let body = document.querySelector('body');
    let modalMask = document.querySelector('.modalMask');

    //"Слушаем" событие клик на кнопке:
    document.querySelector('.btn-modalButton').addEventListener("click", function () {

        //Включение модальной маски:
        body.style.overflow = "hidden";
        modalMask.style.display = "flex";
        setTimeout(() => {
            modalMask.style.opacity = "0.7"
        }, 100);

        //Расчитываем размеры модального окна, положение модального окна, показываем пользователю модальное окно:
        modalWindowParam();

    });

    // Пересчитываем размеры модального окна в случае поворота экрана:
    window.onresize = modalWindowRecalc;



    function modalWindowParam() {

        modalWindow.style.display = "flex";

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


    
}