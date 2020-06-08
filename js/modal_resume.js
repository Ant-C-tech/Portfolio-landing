//По клику на кнопке выполняем функцию:
for (item of document.querySelectorAll('.btn-showModalResume')) {
    item.addEventListener("click", function () {

        const resume = document.querySelector('#modalWindow-Resume')
        const modalResumeContent = document.querySelector('.modalResume')
        const design = document.querySelector('.modalResume__skillGraph-design')
        const illustrator = document.querySelector('.modalResume__skillGraph-illustrator')
        const photoshop = document.querySelector('.modalResume__skillGraph-photoshop')
        const sketch = document.querySelector('.modalResume__skillGraph-sketch')

        //Высота элемента согласно высоте модального окна:
        modalResumeContent.style.height = parseInt(resume.style.height) + 'px'

        //Разрешаем прокрутку на планшетах:
        if (parseInt(resume.style.height) < 960) {
            resize()
        } else {
            modalResumeContent.style.overflowY = "visible"
            modalResumeContent.style.overflowX = "visible"
        }


        //Запуск анимации блока skill при наличии прокрутки (в мобильной версии) или desktop:
        if (modalResumeContent.style.overflowY == "scroll") {
            const skillBlock = document.querySelector('.modalResume__skills')
            let indicator = true
            resume.addEventListener('mousewheel', function (event) {
                if (skillBlock.getBoundingClientRect().top < parseInt(resume.style.height) / 1.5 && indicator == true) {
                    skillAnimation()
                    indicator = false
                }
            })
        } else {
            skillAnimation()
        }

        //Пересчитываем свойства модального окна при смене ориентации экрана:
        window.addEventListener('resize', function (event) {
            modalResumeContent.style.height = parseInt(resume.style.height) + 'px'
            if (parseInt(resume.style.height) < 960) {
                resize()
            } else {
                modalResumeContent.classList.remove('overflowY')
                modalResumeContent.classList.remove('overflowX')
            }
        });

        //Нажатие кнопки "HIRE ME" в данном окне
        document.querySelector('.JS_resumeHire').addEventListener("click", function () {
            //Обнуляем стили после закрытия модального окна:
            design.style.width = 0
            illustrator.style.width = 0
            photoshop.style.width = 0
            sketch.style.width = 0

            //Скрываем модальное окно "RESUME":
            const modalWindow = document.querySelector('#modalWindow-Resume')
            setTimeout(() => {
                modalWindow.style.bottom = -3000 + 'px';
            }, 300);
        })

        //Обнуляем стили после закрытия модального окна:
        const closeBtnResume = document.querySelector('#closeBtnResume')
        closeBtnResume.addEventListener('click', function (event) {
            design.style.width = 0
            illustrator.style.width = 0
            photoshop.style.width = 0
            sketch.style.width = 0
        })

        //Функции

        //Анимация раздела skill:
        function skillAnimation() {

            const timeAnime = 1000
            const timeStep = 20
            let designTimer
            let illustratorTimer
            let photoshopTimer
            let sketchTimer

            skillMove(design, 127, designTimer)
            skillMove(illustrator, 136, illustratorTimer)
            skillMove(photoshop, 129, photoshopTimer)
            skillMove(sketch, 113, sketchTimer)

            function skillMove(skill, width, skillTimer) {
                skill.style.width = 0
                let step = width / (timeAnime / timeStep)
                skillTimer = setInterval(() => {
                    skill.style.width = parseInt(skill.style.width) + step + "px"
                    if (parseInt(skill.style.width) > width) {
                        clearTimeout(skillTimer)
                    }
                }, timeStep)
            }
        }

        function resize() {
            modalResumeContent.style.overflowX = "hidden"
            modalResumeContent.style.display = "block"
        }

    });

}