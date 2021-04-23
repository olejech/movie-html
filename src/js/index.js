import './payment'

const $buttonOpen = document.querySelector('.js-button-modal-open')
const $buttonClose = document.querySelector('.js-button-modal-close')
const $modal = document.querySelector('.js-modal')
const $overlay = document.querySelector('.js-overlay')
const $form = document.querySelector('.js-form-main')

function handleClickClose() {
  $modal.classList.remove('active')
  $overlay.classList.remove('active')
  document.body.classList.remove('js-body-lock')
}

function handleClickOpen() {
  $modal.classList.add('active')
  $overlay.classList.add('active')
  document.body.classList.add('js-body-lock')
}

function handleClickOutside(e) {
  if (e.target && e.target.classList.contains('js-overlay')) {
    handleClickClose()
  }
}

function handleSubmit(e) {
  e.preventDefault()
  window.location.href = '/unlimitedtitles/payment.html'
}

if ($buttonOpen && $buttonClose) {
  $buttonOpen.onclick = handleClickOpen
  $buttonClose.onclick = handleClickClose
}

if ($form) {
  $form.onsubmit = handleSubmit
}
document.body.onclick = handleClickOutside
