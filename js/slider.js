window.onload = () => {

    // Переменные
    let slider,
        sliderContainer,
        slidesCollection,
        bodyWidth,
        containerWidth,
        timerId,
        scrollDirection,
        sliderTop,
        windowHeight,
        windowTop,
        windowBottom;

    // Вводим счетчики
    let positionCount = 0,
        slideCount = 1;



    // ===========================================================Stand-by режим:===========================================================

    //Присваиваем стили слайдеру и отслеживаем изменения размеров экрана:
    addStyles();
    sizeCalculator();
    window.onresize = onresizeCalculator;

    // Получаем текущее положение пользовательского экрана и блока слайдера (запуск слайдера при нахождении на экране):
    getCurrentPosition();
    if ((windowBottom > sliderTop) && ((sliderTop + sliderContainer.offsetHeight) > windowTop) && (!timerId)) {
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
            if ((windowBottom > sliderTop) && ((sliderTop + sliderContainer.offsetHeight) > windowTop) && (!timerId)) {
                sliderOn();
            }
            if (((sliderTop + sliderContainer.offsetHeight) < windowTop) && (timerId)) {
                clearInterval(timerId);
                timerId = false;
            }
        }

        if (scrollDirection < 0) {
            if (((sliderTop + sliderContainer.offsetHeight) > windowTop) && (windowBottom > sliderTop) && (!timerId)) {
                sliderOn();
            }
            if ((windowBottom < sliderTop) && (timerId)) {
                clearInterval(timerId);
                timerId = false;
            }
        }
    });

    //==============================================================================================================================================

    // Получаем элементы слайдера и добавляем необходимые стили:
    function addStyles() {
        slider = document.querySelector('.slider');
        slider.style.overflow = 'hidden';
        slider.style.position = 'relative';
        slider.style.cursor = 'pointer';

        sliderContainer = document.querySelector('.slider__container');
        sliderContainer.style.position = 'absolute';
        sliderContainer.style.left = '0';
        sliderContainer.style.transition = 'all ease-in-out 0.5s';
        sliderContainer.style.display = 'flex';
        sliderContainer.style.flexWrap = 'nowrap';

        slidesCollection = document.querySelectorAll('.slider__card');
        slidesCollection.forEach(element => element.style.width = "100%");
    }

    // Расчитываем и назначаем расчетные стили отображения слайдера:
    function sizeCalculator() {
        bodyWidth = document.querySelector('body').offsetWidth;
        containerWidth = bodyWidth * slidesCollection.length;
        sliderContainer.style.width = containerWidth + "px";
        slider.style.height = (sliderContainer.offsetHeight) + 'px';
    }

    // Получаем текущее положение пользовательского экрана и блока слайдера:
    function getCurrentPosition() {
        sliderTop = getCoords(slider).top;
        windowHeight = document.documentElement.clientHeight;
        windowTop = pageYOffset;
        windowBottom = windowTop + windowHeight;
    }

    // Пересчитываем и переназначаем стили отображения слайдера при измении размеров экрана:
    function onresizeCalculator() {
        sizeCalculator();
        sliderContainer.style.left = "-" + ((slideCount - 1) * bodyWidth) + "px";
        positionCount = -((slideCount - 1) * bodyWidth);
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
        slider.onclick = sliderMove;
        slider.onmouseover = () => {
            clearInterval(timerId);
        }
        slider.onmouseout = () => {
            infinitySlider();
        }
        //===========================================================================

        // Запускаем бесконечный слайдер:
        function infinitySlider() {
            timerId = setInterval(() => sliderMove(), 2000);
        }

        // По клику запускаем перелистывание, отслеживаем текущее положение
        // слайдера и граничные условия:
        function sliderMove() {
            if (slideCount < slidesCollection.length) {
                sliderLeftMove();
            } else {
                sliderContainer.style.left = 0;
                slideCount = 1;
                positionCount = 0;
            }
        }

        // Выполняем перелистывание слайдера влево
        function sliderLeftMove() {
            positionCount = (positionCount - bodyWidth);
            sliderContainer.style.left = positionCount + "px";
            slideCount++;
        }

    }
}