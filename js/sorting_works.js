window.onload = function () {


    for (item of document.querySelectorAll('.sortingBtn')) {
        item.addEventListener("click", sorting)
    }

    function sorting(event) {
        const sortElem = document.querySelectorAll('.sortElem')
        for (item of sortElem) {
            console.log(item.getAttribute('data-content'))
        }
        // console.log(this.getAttribute('data-sort'))

        if (this.getAttribute('data-sort') === 'all') {
            for (item of sortElem) {
                item.style.display = 'flex'
            }
        } else if (this.getAttribute('data-sort') === 'app') {
            for (item of sortElem) {
                if (item.getAttribute('data-content') === 'app') {
                    item.style.display = 'flex'
                } else {
                    item.style.display = 'none'
                }
            }
        } else if (this.getAttribute('data-sort') === 'website') {
            for (item of sortElem) {
                if (item.getAttribute('data-content') === 'website') {
                    item.style.display = 'flex'
                } else {
                    item.style.transition = 'all 0.5s linear'
                    item.style.display = 'none'
                }
            }
        } else if (this.getAttribute('data-sort') === 'interaction') {
            for (item of sortElem) {
                if (item.getAttribute('data-content') === 'interaction') {
                    item.style.display = 'flex'
                } else {
                    item.style.display = 'none'
                }
            }
        }
    }
}