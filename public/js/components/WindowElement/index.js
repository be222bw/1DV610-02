import windowTemplate from './window-template'
import  '../CloseButton'
window.customElements.define('window-element',
  class extends window.HTMLElement {
    constructor () {
      super()
      this.innerHTML = windowTemplate
      this.addEventListener('closeWindow', (e) => {
        this.remove()
      })
    }
})
