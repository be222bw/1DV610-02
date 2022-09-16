import windowTemplate from './window-template'
import  '../CloseButton'
import '../MaximiseButton'
window.customElements.define('window-element',
  class extends window.HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = windowTemplate
      this.addEventListener('closeWindow', (e) => {
        this.remove()
      })
      this.addEventListener('maximiseWindow', (e) => {
        if (this.hasAttribute('maximised')) {
          console.log('Remove attribute maximised')
          this.removeAttribute('maximised')
        } else {
          console.log('Set attribute maximised')
          this.setAttribute('maximised', '')
        }
      })
    }
})
