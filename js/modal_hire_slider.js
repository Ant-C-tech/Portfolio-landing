window.onload = function () {

    //Необходимые элементы
    const btnShowModalCollection = document.querySelectorAll('.btn-modalButton')
    const btnWindowCloseCollection = document.querySelectorAll('.modalWindow__closeButton')

    //Подсказка наличия слайдера в модальном окне (анимация)
    for (let i = 0; i < btnShowModalCollection.length; i++) {
        btnShowModalCollection[i].addEventListener("click", function () {
            if (event.target.getAttribute('data-modal') === "hireMe") {

                layerCollection[slide].style.transition = 'top ease-in-out 0.15s'
                layerCollection[slide].style.top = 0

                timer = setInterval(jumping, 2500)

                function jumping() {
                    layerCollection[slide].style.top = -70 + 'px'
                    setTimeout(back, 150)

                    function back() {
                        layerCollection[slide].style.top = 0
                    }
                }

            }
        })

    }

    //Предварительная расстановка слайдов
    const layerCollection = document.getElementsByClassName('modalHire__photoItem');
    let zIndex = 90
    for (let i = 0; i < layerCollection.length; i++) {
        layerCollection[i].style.zIndex = zIndex
        zIndex = zIndex - 10
    }

    let slide = 0
    let y = 0
    let timer


    //Слайдер по скроллу
    document.querySelector(".modalHire__photo").addEventListener('mousewheel', function (event) {
        clearInterval(timer)

        event = event || window.event; //Для Mozzilla
        y = y + Math.round(event.deltaY);

        layerCollection[slide].style.top = -(y / 10) + "px";
        if (y > 6700) {
            if (slide < (layerCollection.length - 2)) {
                slide++;
                y = 0;
            } else {
                y = 6700;
                //Останавливаем реакцию на прокрутку
            }
        } else if (y < 0) {
            if (slide > 0) {
                slide--;
                y = 6700;
            } else {
                y = 0;
                layerCollection[slide].style.top = 0 + "px";
                //Останавливаем реакцию на прокрутку
            }
        }
    })

    //Останавливаем работу анимационной подсказки при закрытии
    for (let i = 0; i < btnWindowCloseCollection.length; i++) {
        btnWindowCloseCollection[i].addEventListener("click", function () {
            clearInterval(timer)
        })
    }
}