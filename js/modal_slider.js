document.querySelector('.btn-modalButton').addEventListener("click", function () {

    //Получаем необходимые элементы документа:
    let prevButton = document.querySelector('.modalProjects__controlButon-prev'),
        nextButton = document.querySelector('.modalProjects__controlButon-next'),
        modalSlider = document.querySelectorAll('.modalProjects__iframeBlock'),
        ifraimSlidesCollection = document.querySelectorAll('.modalProjects__iframe'),
        iframeBlockWidth;

    // Вводим счетчик:
    ifraimSlidesCount = 0;

    //Подготовительное позиционирование слайдов
    modalSliderPositionCalc();
    //Пересчет позиционирования при изминении ориентации экрана
    window.addEventListener('resize', function (event) {
        modalSliderPositionCalc();
        ifraimSlidesCount = 0;
        ifraimSlidesCollection.forEach(element => element.style.opacity = '1');
        ifraimSlidesCollection[0].style.left = 0 + 'px';
    });
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);



    //Функции
    function modalSliderPositionCalc() {
        iframeBlockWidth = document.querySelector('.modalProjects__iframeBlock').offsetWidth;
        for (let i = 1; i < ifraimSlidesCollection.length; i++) {
            ifraimSlidesCollection[i].style.left = iframeBlockWidth + 'px';
        };
        ifraimSlidesCollection[ifraimSlidesCollection.length - 1].style.left = -iframeBlockWidth + 'px';
    }

    function nextSlide() {
        // Запрещаем бастрое прокликивание:
        nextButton.removeEventListener("click", nextSlide);
        setTimeout(() => {
            nextButton.addEventListener("click", nextSlide);
        }, 500);

        if (ifraimSlidesCount == 0) {
            ifraimSlidesCollection[ifraimSlidesCollection.length - 1].style.opacity = '0';
            ifraimSlidesCollection[ifraimSlidesCollection.length - 1].style.left = iframeBlockWidth + 'px';;
            ifraimSlidesCollection[ifraimSlidesCount + 1].style.opacity = '1';

            ifraimSlidesCollection[ifraimSlidesCount].style.left = -iframeBlockWidth + 'px';
            ifraimSlidesCollection[ifraimSlidesCount + 1].style.left = 0 + 'px';

            ifraimSlidesCount++;
        } else if (ifraimSlidesCount == (ifraimSlidesCollection.length - 1)) {
            ifraimSlidesCollection[ifraimSlidesCount - 1].style.opacity = '0';
            ifraimSlidesCollection[ifraimSlidesCount - 1].style.left = iframeBlockWidth + 'px';
            ifraimSlidesCollection[0].style.opacity = '1';


            ifraimSlidesCollection[ifraimSlidesCount].style.left = -iframeBlockWidth + 'px';
            ifraimSlidesCollection[0].style.left = 0 + 'px';

            ifraimSlidesCount = 0;
        } else {
            ifraimSlidesCollection[ifraimSlidesCount - 1].style.opacity = '0';
            ifraimSlidesCollection[ifraimSlidesCount - 1].style.left = iframeBlockWidth + 'px';
            ifraimSlidesCollection[ifraimSlidesCount + 1].style.opacity = '1';


            ifraimSlidesCollection[ifraimSlidesCount].style.left = -iframeBlockWidth + 'px';
            ifraimSlidesCollection[ifraimSlidesCount + 1].style.left = 0 + 'px';

            ifraimSlidesCount++;
        }
    }

    function prevSlide() {
        // Запрещаем бастрое прокликивание:
        prevButton.removeEventListener("click", prevSlide);
        setTimeout(() => {
            prevButton.addEventListener("click", prevSlide);
        }, 500);

        // ifraimSlidesCollection.forEach(element => element.style.opacity = '1');

        if (ifraimSlidesCount == 0) {
            ifraimSlidesCollection[ifraimSlidesCollection.length - 2].style.opacity = '0';
            ifraimSlidesCollection[ifraimSlidesCollection.length - 2].style.left = -iframeBlockWidth + 'px';;
            ifraimSlidesCollection[ifraimSlidesCollection.length - 1].style.opacity = '1';

            ifraimSlidesCollection[ifraimSlidesCount].style.left = iframeBlockWidth + 'px';
            ifraimSlidesCollection[ifraimSlidesCollection.length - 1].style.left = 0 + 'px';

            ifraimSlidesCount = (ifraimSlidesCollection.length - 1);

        } else if (ifraimSlidesCount == 1) {
            ifraimSlidesCollection[ifraimSlidesCollection.length - 1].style.opacity = '0';
            ifraimSlidesCollection[ifraimSlidesCollection.length - 1].style.left = -iframeBlockWidth + 'px';;
            ifraimSlidesCollection[ifraimSlidesCount - 1].style.opacity = '1';

            ifraimSlidesCollection[ifraimSlidesCount].style.left = iframeBlockWidth + 'px';
            ifraimSlidesCollection[ifraimSlidesCount - 1].style.left = 0 + 'px';

            ifraimSlidesCount--;
        } else {
            ifraimSlidesCollection[ifraimSlidesCount - 2].style.opacity = '0';
            ifraimSlidesCollection[ifraimSlidesCount - 2].style.left = -iframeBlockWidth + 'px';
            ifraimSlidesCollection[ifraimSlidesCount - 1].style.opacity = '1';


            ifraimSlidesCollection[ifraimSlidesCount].style.left = iframeBlockWidth + 'px';
            ifraimSlidesCollection[ifraimSlidesCount - 1].style.left = 0 + 'px';

            ifraimSlidesCount--;
        }
    }

});