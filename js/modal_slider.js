document.querySelector('.btn-modalButton').addEventListener("click", function () {

    //Получаем необходимые элементы документа:
    let prevButton = document.querySelector('.modalProjects__controlButon-prev'),
        nextButton = document.querySelector('.modalProjects__controlButon-next'),
        sliderVisualPanel = document.querySelector('.modalProjects__sliderVisualPanel'),
        ifraimSlidesCollection = document.querySelectorAll('.modalProjects__iframe'),
        descriptionSlidesCollection = document.querySelectorAll('.modalProjects__descriptionCard'),
        iframeBlockWidth,
        visualPanelCollection,
        firstTimeOutID,
        nextTimeOutID;

    // Вводим счетчик:
    ifraimSlidesCount = 0;

    //Подготовительное позиционирование слайдов:
    modalSliderPositionCalc();
    //Создание навигационной панели слайдера:
    createSliderVisualPanel();


    //Пересчет позиционирования и обновление элементов слайдера при изминении ориентации экрана:
    window.addEventListener('resize', function (event) {
        modalSliderPositionCalc();
        updateSliderVisualPanel();
        ifraimSlidesCount = 0;
        ifraimSlidesCollection.forEach(element => element.style.opacity = '1');
        ifraimSlidesCollection[0].style.left = 0 + 'px';
        descriptionSlidesCollection.forEach(element => element.style.transform = 'rotate3d(0, 1, 0, 90deg)');
        descriptionSlidesCollection[0].style.transform = 'rotate3d(0, 1, 0, 0deg)';
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
        descriptionSlidesCollection.forEach(element => element.style.transform = 'rotate3d(0, 1, 0, 90deg)');
        descriptionSlidesCollection[0].style.transform = 'rotate3d(0, 1, 0, 0deg)';
    }

    function createSliderVisualPanel() {
        //Visualpanel
        for (let i = 0; i < ifraimSlidesCollection.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.className = ('modalProjects__visualPanelItem');
            if (i == ifraimSlidesCount) {
                newDiv.classList.add("modalProjects__visualPanelItem-active");
            }
            sliderVisualPanel.append(newDiv);
        };
        setTimeout(() => {
            sliderVisualPanel.style.left = '50%';
        }, 500);
        firstTimeOutID = setTimeout(() => {
            sliderVisualPanel.style.left = '-250px';
        }, 3000);
    }

    function updateSliderVisualPanel() {
        if (sliderVisualPanel.style.left == '-250px') {
            setTimeout(() => {
                sliderVisualPanel.style.left = '50%';
            }, 500);
            nextTimeOutID = setTimeout(() => {
                sliderVisualPanel.style.left = '-250px';
            }, 3000);
        } else {
            clearTimeout(firstTimeOutID);
            clearTimeout(nextTimeOutID);
            nextTimeOutID = setTimeout(() => {
                sliderVisualPanel.style.left = '-250px';
            }, 3000);
        }

        visualPanelCollection = document.querySelectorAll('.modalProjects__visualPanelItem');
        visualPanelCollection.forEach(element => element.classList.remove("modalProjects__visualPanelItem-active"));
        setTimeout(() => {
            for (let i = 0; i < visualPanelCollection.length; i++) {
                if (i == ifraimSlidesCount) {
                    visualPanelCollection[i].classList.add("modalProjects__visualPanelItem-active");
                };
            }
        }, 600);
    }

    function nextSlide() {
        // Запрещаем бастрое прокликивание:
        nextButton.removeEventListener("click", nextSlide);
        setTimeout(() => {
            nextButton.addEventListener("click", nextSlide);
        }, 600);

        if (ifraimSlidesCount == 0) {
            ifraimSlidesCollection[ifraimSlidesCollection.length - 1].style.opacity = '0';
            ifraimSlidesCollection[ifraimSlidesCollection.length - 1].style.left = iframeBlockWidth + 'px';
            ifraimSlidesCollection[ifraimSlidesCount + 1].style.opacity = '1';

            ifraimSlidesCollection[ifraimSlidesCount].style.left = -iframeBlockWidth + 'px';
            ifraimSlidesCollection[ifraimSlidesCount + 1].style.left = 0 + 'px';

            //description
            descriptionSlidesCollection[ifraimSlidesCount].style.transform = 'rotate3d(0, 1, 0, 90deg)';
            setTimeout(() => {
                descriptionSlidesCollection[ifraimSlidesCount + 1].style.transform = 'rotate3d(0, 1, 0, 0deg)';
                ifraimSlidesCount++;
            }, 500);
        } else if (ifraimSlidesCount == (ifraimSlidesCollection.length - 1)) {
            ifraimSlidesCollection[ifraimSlidesCount - 1].style.opacity = '0';
            ifraimSlidesCollection[ifraimSlidesCount - 1].style.left = iframeBlockWidth + 'px';
            ifraimSlidesCollection[0].style.opacity = '1';


            ifraimSlidesCollection[ifraimSlidesCount].style.left = -iframeBlockWidth + 'px';
            ifraimSlidesCollection[0].style.left = 0 + 'px';

            //description
            descriptionSlidesCollection[ifraimSlidesCount].style.transform = 'rotate3d(0, 1, 0, 90deg)';
            setTimeout(() => {
                descriptionSlidesCollection[0].style.transform = 'rotate3d(0, 1, 0, 0deg)';
                ifraimSlidesCount = 0;
            }, 500);
        } else {
            ifraimSlidesCollection[ifraimSlidesCount - 1].style.opacity = '0';
            ifraimSlidesCollection[ifraimSlidesCount - 1].style.left = iframeBlockWidth + 'px';
            ifraimSlidesCollection[ifraimSlidesCount + 1].style.opacity = '1';


            ifraimSlidesCollection[ifraimSlidesCount].style.left = -iframeBlockWidth + 'px';
            ifraimSlidesCollection[ifraimSlidesCount + 1].style.left = 0 + 'px';

            //description
            descriptionSlidesCollection[ifraimSlidesCount].style.transform = 'rotate3d(0, 1, 0, 90deg)';
            setTimeout(() => {
                descriptionSlidesCollection[ifraimSlidesCount + 1].style.transform = 'rotate3d(0, 1, 0, 0deg)';
                ifraimSlidesCount++;
            }, 500);
        }
        updateSliderVisualPanel();
    }

    function prevSlide() {
        // Запрещаем бастрое прокликивание:
        prevButton.removeEventListener("click", prevSlide);
        setTimeout(() => {
            prevButton.addEventListener("click", prevSlide);
        }, 600);

        if (ifraimSlidesCount == 0) {
            ifraimSlidesCollection[ifraimSlidesCollection.length - 2].style.opacity = '0';
            ifraimSlidesCollection[ifraimSlidesCollection.length - 2].style.left = -iframeBlockWidth + 'px';;
            ifraimSlidesCollection[ifraimSlidesCollection.length - 1].style.opacity = '1';

            ifraimSlidesCollection[ifraimSlidesCount].style.left = iframeBlockWidth + 'px';
            ifraimSlidesCollection[ifraimSlidesCollection.length - 1].style.left = 0 + 'px';

            //description
            descriptionSlidesCollection[ifraimSlidesCount].style.transform = 'rotate3d(0, 1, 0, 90deg)';
            setTimeout(() => {
                descriptionSlidesCollection[ifraimSlidesCollection.length - 1].style.transform = 'rotate3d(0, 1, 0, 0deg)';
                ifraimSlidesCount = (ifraimSlidesCollection.length - 1);
            }, 500);
        } else if (ifraimSlidesCount == 1) {
            ifraimSlidesCollection[ifraimSlidesCollection.length - 1].style.opacity = '0';
            ifraimSlidesCollection[ifraimSlidesCollection.length - 1].style.left = -iframeBlockWidth + 'px';;
            ifraimSlidesCollection[ifraimSlidesCount - 1].style.opacity = '1';

            ifraimSlidesCollection[ifraimSlidesCount].style.left = iframeBlockWidth + 'px';
            ifraimSlidesCollection[ifraimSlidesCount - 1].style.left = 0 + 'px';

            //description
            descriptionSlidesCollection[ifraimSlidesCount].style.transform = 'rotate3d(0, 1, 0, 90deg)';
            setTimeout(() => {
                descriptionSlidesCollection[ifraimSlidesCount - 1].style.transform = 'rotate3d(0, 1, 0, 0deg)';
                ifraimSlidesCount--;
            }, 500);
        } else {
            ifraimSlidesCollection[ifraimSlidesCount - 2].style.opacity = '0';
            ifraimSlidesCollection[ifraimSlidesCount - 2].style.left = -iframeBlockWidth + 'px';
            ifraimSlidesCollection[ifraimSlidesCount - 1].style.opacity = '1';


            ifraimSlidesCollection[ifraimSlidesCount].style.left = iframeBlockWidth + 'px';
            ifraimSlidesCollection[ifraimSlidesCount - 1].style.left = 0 + 'px';

            //description
            descriptionSlidesCollection[ifraimSlidesCount].style.transform = 'rotate3d(0, 1, 0, 90deg)';
            setTimeout(() => {
                descriptionSlidesCollection[ifraimSlidesCount - 1].style.transform = 'rotate3d(0, 1, 0, 0deg)';
                ifraimSlidesCount--;
            }, 500);
        }
        updateSliderVisualPanel();
    }
});