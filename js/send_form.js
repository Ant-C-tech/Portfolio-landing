window.onload = function () {
    'use strict'

    const inp_email = document.querySelector('.modalHire__mailInput[name=mailInput]')
    const inp_request = document.querySelector('.modalHire__textInput[name=textInput]')


    document.querySelector('.btn-submit').onclick = function () {
            let params = 'email=' + inp_email.value + '&' + 'phone=' + inp_request.value
            ajaxPost('someserver.php', params)
    }



    function ajaxPost(url, params) {

        let request = new XMLHttpRequest()
        request.open('POST', url)
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.send(params)

        request.onreadystatechange = function () {

            if (request.readyState === 4 && request.status === 200) {
                if (request.responseText === 1) {
                    alert('Your request is on the to me!')
                } else {
                    alert(request.responseText)
                }
            }

        }

    }
}