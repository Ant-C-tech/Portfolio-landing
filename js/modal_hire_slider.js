window.onload = function () {

    const layerCollection = document.getElementsByClassName('modalHire__photoItem');
    let zIndex = 90
    for (let i = 0; i < layerCollection.length; i++) {
        layerCollection[i].style.zIndex = zIndex
        zIndex = zIndex - 10
    }

    let slide = 0
    let y = 0

    document.querySelector(".modalHire__photo").addEventListener('mousewheel', function (event) {
        event = event || window.event; //Для Mozzilla
        y = y + Math.round(event.deltaY);

        layerCollection[slide].style.top = -(y / 8) + "px";
        if (y > 5300) {
            if (slide < (layerCollection.length - 2)) {
                slide++;
                y = 0;
            } else {
                y = 5300;
                //Останавливаем реакцию на прокрутку
            }
        } else if (y < 0) {
            if (slide > 0) {
                slide--;
                y = 5300;
            } else {
                y = 0;
                layerCollection[slide].style.top = 0 + "px";
                //Останавливаем реакцию на прокрутку
            }
        }
        console.log(y);
        // return false; //Чтобы не прокручивалась страница
    })

    console.log(layerCollection)
    console.log(document.querySelector(".modalHire__photo"))

}