window.onload = function () {

    //Действия по нажатию кнопки 'HIRE ME'
    for (item of document.querySelectorAll('.btn-showModalHireMe')) {
        item.addEventListener("click", function () {

            //Необходимые элементы
            const btnShowModalCollection = document.querySelectorAll('.btn-modalButton')
            const btnWindowCloseCollection = document.querySelectorAll('.modalWindow__closeButton')
            const hireMe = document.querySelector('#modalWindow-Hire')
            const modalHireMeContent = document.querySelector('.modalHire')
            const photoBlock = document.querySelector('.modalHire__photo')
            //Предварительная расстановка слайдов
            const layerCollection = document.querySelectorAll('.modalHire__photoItem');
            let zIndex = 90
            for (let i = 0; i < layerCollection.length; i++) {
                layerCollection[i].style.zIndex = zIndex
                zIndex = zIndex - 10
            }

            let slide = 0
            let y = 0
            let timer

            //Разрешаем прокрутку по размерам:
            if (parseInt(hireMe.style.height) < 675 || parseInt(hireMe.style.width) < 820) {
                modalHireMeContent.style.height = parseInt(hireMe.style.height) + 'px'
                modalHireMeContent.style.overflowY = "scroll"
            } else {
                modalHireMeContent.style.overflowY = 'hidden'
            }

            //На телефоне корректируем размер фото:
            if (parseInt(hireMe.style.width) < 495) {
                for (let i = 0; i < layerCollection.length; i++) {
                    layerCollection[i].style.width = parseInt(hireMe.style.width) + 'px'
                }
                modalHireMeContent.style.overflow = 'hidden auto'
                photoBlock.style.minHeight = document.querySelector('.modalHire__photoItem').offsetHeight + 'px'
            } else {
                for (let i = 0; i < layerCollection.length; i++) {
                    layerCollection[i].style.width = 'auto'
                }
            }

            // Проверяем тип устройства пользователя и принимаем решение
            // о подключении слайдера:
            if (navigator.userAgent.match("iPhone") ||
                navigator.userAgent.match("iPad") ||
                navigator.userAgent.match("Android") ||
                navigator.userAgent.match("RIM")) {
                console.log("Mobile");
            } else {
                //Подсказка наличия слайдера в модальном окне (анимация)
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

                //Слайдер по скроллу
                document.querySelector(".modalHire__photo").addEventListener('mousewheel', function (event) {
                    event.preventDefault()

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

            }

            //Действия по закрытию модального окна
            for (let i = 0; i < btnWindowCloseCollection.length; i++) {
                btnWindowCloseCollection[i].addEventListener("click", function () {
                    //Останавливаем работу анимационной подсказки при закрытии
                    clearInterval(timer)

                    setTimeout(() => {
                        //Обнуляем переменные
                        slide = 0
                        y = 0

                        //Обнуляем положение фотографий
                        for (let i = 0; i < layerCollection.length; i++) {
                            layerCollection[i].style.top = 0
                        }
                    }, 1000)

                })
            }

            window.addEventListener('resize', function (event) {
                //Разрешаем прокрутку изменении ориентации устройства:
                if (parseInt(hireMe.style.height) < 675 || parseInt(hireMe.style.width) < 820) {
                    modalHireMeContent.style.height = parseInt(hireMe.style.height) + 'px'
                    modalHireMeContent.style.overflowY = 'scroll'
                } else {
                    modalHireMeContent.style.overflowY = 'hidden'
                }

                //На телефоне корректируем размер фото:
                if (parseInt(hireMe.style.width) < 495) {
                    modalHireMeContent.style.overflow = 'hidden visible'
                    for (let i = 0; i < layerCollection.length; i++) {
                        layerCollection[i].style.width = parseInt(hireMe.style.width) + 'px'
                    }
                } else {
                    for (let i = 0; i < layerCollection.length; i++) {
                        layerCollection[i].style.width = 'auto'
                    }
                }
            })

        })
    }
}