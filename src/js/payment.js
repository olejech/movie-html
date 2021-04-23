var form = document.querySelector('.js-form')
var errorMessage = document.querySelector('.js-error-message')
var popup = document.querySelector('.js-popup')
var closeButton = document.querySelector('.js-popup-close')

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    if (form.elements[0].value) {
      errorMessage.classList.remove('active')
      popup.classList.add('active')

      setTimeout(() => {
        popup.classList.remove('active')
      }, 3000)
    } else {
      errorMessage.classList.add('active')
    }
  })

  closeButton.addEventListener('click', function () {
    popup.classList.remove('active')
  })
}
