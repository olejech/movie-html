import './payment'

const $buttonOpen = document.querySelector('.js-button-modal-open')
const $buttonClose = document.querySelector('.js-button-modal-close')
const $modal = document.querySelector('.js-modal')
const $overlay = document.querySelector('.js-overlay')

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

if ($buttonOpen && $buttonClose) {
  $buttonOpen.onclick = handleClickOpen
  $buttonClose.onclick = handleClickClose
}
document.body.onclick = handleClickOutside
