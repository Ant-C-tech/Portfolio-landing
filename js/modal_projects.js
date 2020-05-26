//По клику на кнопке выполняем функцию:
document.querySelector('.btn-modalButton').addEventListener("click", function () {

    //Получаем необходимые элементы документа:
    let modalWindowProjects = document.querySelector('#modalWindow-Projects');
    let modalProjects = document.querySelector('.modalProjects');
    let iFrame = document.querySelector('.modalProjects__iframeBlock');
    let textPart = document.querySelector('.modalProjects__textPart');
    // let wrapper = document.querySelector('.modalProjects__wrapper');
    let textBlock = document.querySelectorAll('.modalProjects__text');

    //Назначаем свойства в зависимости от размеров пользовательского экрана и его ориентации:
    modalDimCalc();

    //Пересчитываем свойства модального окна при смене ориентации экрана:
    window.addEventListener('resize', function (event) {
        modalDimCalc();
    });

    function modalDimCalc() {

        if (modalWindowProjects.offsetWidth > modalWindowProjects.offsetHeight) {
            modalProjects.style.flexDirection = "row";
            iFrame.style.height = modalWindowProjects.offsetHeight + "px";
            iFrame.style.order = 1;
            textPart.style.height = modalWindowProjects.offsetHeight + "px";
            textPart.style.order = 2;
            textBlock.forEach(element => element.style.maxHeight = (modalWindowProjects.offsetHeight / 100) * 45 + 'px');
        } else if (modalWindowProjects.offsetWidth == 320 && modalWindowProjects.offsetHeight == 568) {
            //Iphone5/SE
            modalProjects.style.flexDirection = "column";
            iFrame.style.order = 2;
            iFrame.style.width = '100%';
            iFrame.style.height = ((modalWindowProjects.offsetHeight / 100) * 60) + "px";
            textPart.style.order = 1;
            textPart.style.height = ((modalWindowProjects.offsetHeight / 100) * 40) + "px";
            textPart.style.width = '100%';
            textBlock.forEach(element => element.style.maxWidth = '100%');
            textBlock.forEach(element => element.style.maxHeight = 55 + 'px');
        } else {
            modalProjects.style.flexDirection = "column";
            iFrame.style.order = 2;
            iFrame.style.width = '100%';
            iFrame.style.height = ((modalWindowProjects.offsetHeight / 100) * 60) + "px";
            textPart.style.order = 1;
            textPart.style.height = ((modalWindowProjects.offsetHeight / 100) * 40) + "px";
            textPart.style.width = '100%';
            textBlock.forEach(element => element.style.maxWidth = '100%');
            textBlock.forEach(element => element.style.maxHeight = 85 + 'px');
        }
    }

});