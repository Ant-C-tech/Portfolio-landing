window.onload = function () {

    const stepTime = 5, // Время шага прокрутки;
        scrollTime = 700; //Время прокрутки;

    let currentScreenPosition,
        x = 0, //Координата Х цели прокрутки;
        timer; //Переменная таймера - служебная переменная;

    // Получаем коллекцию верхних кнопок запуска скролла:
    let scrollTopButtonCollection = document.querySelectorAll('.scroll__topButton');
    // Получаем коллекцию нижних кнопок запуска скролла:
    let scrollBottomButtonCollection = document.querySelectorAll('.scroll__bottomButton');
    // Получаем коллекцию целей скролла:
    let scrollTargetCollection = document.querySelectorAll('.scroll__target');


    //Вешаем слушатель на каждую кнопку верхнего ряда с исполнением по клику анонимной функции:
    for (let i = 0; i < scrollTopButtonCollection.length; i++) {
        scrollTopButtonCollection[i].addEventListener("click", function () {
            currentScreenPosition = window.pageYOffset; //Текущее положение экрана - служебная переменная;
            let targetY = getCoords(scrollTargetCollection[i]).top, //Определяем координату Y цели прокрутки;
                step = (targetY - currentScreenPosition) / (scrollTime / stepTime); //Шаг прокрутки - служебная переменная;
            scrollToBottom();

            // Плавный скролл до цели вниз:
            function scrollToBottom() {
                if (currentScreenPosition < targetY) {
                    window.scrollTo(0, currentScreenPosition);
                    currentScreenPosition = currentScreenPosition + step;
                    timer = setTimeout(scrollToBottom, stepTime);
                } else {
                    clearTimeout(timer);
                    window.scrollTo(0, targetY);
                }
            }
        });
    }

    //Вешаем слушатель на каждую кнопку верхнего ряда с исполнением по клику анонимной функции:
    for (let i = 0; i < scrollBottomButtonCollection.length; i++) {
        scrollBottomButtonCollection[i].addEventListener("click", function () {
            currentScreenPosition = window.pageYOffset; //Текущее положение экрана - служебная переменная;
            let targetY = getCoords(scrollTargetCollection[i]).top, //Определяем координату Y цели прокрутки;
                step = (currentScreenPosition - targetY) / (scrollTime / stepTime); //Шаг прокрутки - служебная переменная;
            scrollToTop();

            // Плавный скролл до цели вверх:
            function scrollToTop() {
                if (currentScreenPosition > targetY) {
                    window.scrollTo(0, currentScreenPosition);
                    currentScreenPosition = currentScreenPosition - step;
                    timer = setTimeout(scrollToTop, stepTime);
                } else {
                    clearTimeout(timer);
                    window.scrollTo(0, targetY);
                }
            }
        });
    }

    // Получаем координаты элемента относительно документа:
    function getCoords(elem) {
        let elemPosition = elem.getBoundingClientRect();
        return {
            top: elemPosition.top + pageYOffset,
            left: elemPosition.left + pageXOffset
        };
    }

}