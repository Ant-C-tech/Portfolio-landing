window.onload = () => {

    // Переменные
    let slider,
        slidesCollection,
        bodyWidth,
        timerId,
        scrollDirection,
        sliderTop,
        windowHeight,
        windowTop,
        windowBottom;

    // Вводим счетчик:
    slideCount = 0;



    // ===========================================================Stand-by режим:===========================================================

    //Присваиваем стили слайдеру и отслеживаем изменения размеров экрана:
    addStyles();
    sizeCalculator();
    window.onresize = pauseOnresize;
    // Получаем текущее положение пользовательского экрана и блока слайдера (запуск слайдера при нахождении на экране):
    getCurrentPosition();
    if ((windowBottom > sliderTop) && ((sliderTop + slider.offsetHeight) > windowTop) && (!timerId)) {
        sliderOn();
    }
    // Получаем направление скролла:
    document.onwheel = function (event) {
        scrollDirection = event.deltaY;
    }
    // Работа слайдера только в пределах пользовательского экрана при прокрутке:
    window.addEventListener('scroll', function () {
        getCurrentPosition();

        if (scrollDirection > 0) {
            if ((windowBottom > sliderTop) && ((sliderTop + slider.offsetHeight) > windowTop) && (!timerId)) {
                sliderOn();
            }
            if (((sliderTop + slider.offsetHeight) < windowTop) && (timerId)) {
                clearInterval(timerId);
                timerId = false;
            }
        }

        if (scrollDirection < 0) {
            if (((sliderTop + slider.offsetHeight) > windowTop) && (windowBottom > sliderTop) && (!timerId)) {
                sliderOn();
            }
            if ((windowBottom < sliderTop) && (timerId)) {
                clearInterval(timerId);
                timerId = false;
            }
        }
    });
    console.log(slider.onclick);
    //==============================================================================================================================================

    // Получаем элементы слайдера и добавляем необходимые стили:
    function addStyles() {
        slider = document.querySelector('.slider');
        slider.style.overflow = 'hidden';
        slider.style.cursor = 'pointer';
        slider.style.position = 'relative';

        slidesCollection = document.querySelectorAll('.slider__card');
        slidesCollection.forEach(element => element.style.width = "100%");
        slidesCollection.forEach(element => element.style.position = 'absolute');
        slidesCollection.forEach(element => element.style.left = '0');
        slidesCollection.forEach(element => element.style.top = '0');
        slidesCollection.forEach(element => element.style.transition = 'none');
    }

    // Расчитываем и назначаем расчетные стили отображения слайдера:
    function sizeCalculator() {
        let slidesHeight = [];
        for (let i = 0; i < slidesCollection.length; i++) {
            slidesHeight[i] = slidesCollection[i].offsetHeight;
        };
        slider.style.height = getMaxOfArray(slidesHeight) + 'px';
        bodyWidth = document.querySelector('body').offsetWidth;
        for (let i = 1; i < slidesCollection.length; i++) {
            slidesCollection[i].style.left = bodyWidth + 'px';
        };
    }

    // Нахождение максимального числа в масиве:
    function getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray);
    }


    // Получаем текущее положение пользовательского экрана и блока слайдера:
    function getCurrentPosition() {
        sliderTop = getCoords(slider).top;
        windowHeight = document.documentElement.clientHeight;
        windowTop = pageYOffset;
        windowBottom = windowTop + windowHeight;
    }

    // Пересчитываем и переназначаем стили отображения слайдера при измении размеров экрана:
    function pauseOnresize() {
        addStyles();
        sizeCalculator();
        slideCount = 0;
        slidesCollection[0].style.opacity = '1';
    }

    // Получаем координаты элемента относительно документа:
    function getCoords(elem) {
        let elemPosition = elem.getBoundingClientRect();
        return {
            top: elemPosition.top + pageYOffset,
            left: elemPosition.left + pageXOffset
        };
    }

    function sliderOn() {

        //==================== Play режим:===========================================
        infinitySlider();

        // В процессе - отслеживаем клик и наведение мыши:

        slider.onclick = sliderLeftMove;

        slider.onmouseover = () => {
            clearInterval(timerId);
        }
        slider.onmouseout = () => {
            infinitySlider();
        }
        //===========================================================================

        // Запускаем бесконечный слайдер:
        function infinitySlider() {
            timerId = setInterval(() => sliderLeftMove(), 2000);
        }

        // Выполняем перелистывание слайдера влево
        function sliderLeftMove() {

            // Запрещаем бастрое прокликивание:
            slider.onclick = null;
            setTimeout(() => {
                slider.onclick = sliderLeftMove;
            }, 500);

            if (slideCount == 0) {
                slidesCollection[slidesCollection.length - 1].style.opacity = '0';
                slidesCollection[slidesCollection.length - 1].style.left = bodyWidth + 'px';

                slidesCollection.forEach(element => element.style.transition = 'left ease-in-out 0.5s');
                slidesCollection[0].style.left = -bodyWidth + 'px';
                slidesCollection[1].style.opacity = '1';
                slidesCollection[1].style.left = 0 + 'px';
                slideCount++;
                return false;
            }

            if ((0 < slideCount) && (slideCount < (slidesCollection.length - 1))) {
                slidesCollection[slideCount - 1].style.opacity = '0';
                slidesCollection[slideCount - 1].style.left = bodyWidth + 'px';

                slidesCollection[slideCount].style.left = -bodyWidth + 'px';

                slidesCollection[slideCount + 1].style.transition = 'left ease-in-out 0.5s';
                slidesCollection[slideCount + 1].style.opacity = '1';
                slidesCollection[slideCount + 1].style.left = 0 + 'px';

                slideCount++;
                return false;
            }

            if (slideCount == (slidesCollection.length - 1)) {
                slidesCollection[slideCount - 1].style.opacity = '0';
                slidesCollection[slideCount - 1].style.left = bodyWidth + 'px';

                slidesCollection[slideCount].style.left = -bodyWidth + 'px';

                slidesCollection[0].style.opacity = '1';
                slidesCollection[0].style.left = 0 + 'px';
                slideCount = 0;
                return false;
            }

        }

    }
}