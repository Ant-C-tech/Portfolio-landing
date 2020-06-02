//По клику на кнопке выполняем функцию:
for (item of document.querySelectorAll('.btn-showModalResume')) {
    item.addEventListener("click", function () {

        
         document.querySelector('.modalResume').style.height = parseInt(document.querySelector('#modalWindow-Resume').style.height) + 'px'

        //Анимация раздела skill:
        const design = document.querySelector('.modalResume__skillGraph-design')
        const illustrator = document.querySelector('.modalResume__skillGraph-illustrator')
        const photoshop = document.querySelector('.modalResume__skillGraph-photoshop')
        const sketch = document.querySelector('.modalResume__skillGraph-sketch')

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

    });

}
