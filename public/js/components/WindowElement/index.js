import windowTemplate from './window-template'
import  '../CloseButton'
window.customElements.define('window-element',
  class extends window.HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = windowTemplate
      this.addEventListener('closeWindow', (e) => {
        this.remove()
      })
    }
})
