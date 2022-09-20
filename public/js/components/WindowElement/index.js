import windowTemplate from './window-template'
import  '../CloseButton'
import '../MaximiseButton'
import '../MinimiseButton'
window.customElements.define('window-element',
  class extends window.HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = windowTemplate

      this.addEventListener('closeWindow', (e) => {
        this.close()
      })

      this.addEventListener('maximiseWindow', (e) => {
        this.maximise()
      })

      this.addEventListener('minimiseWindow', (e) => {
          this.minimise()
      })
    }

    
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'max' && newValue === '') {
        this.removeAttribute('min')
      } else if (name === 'min' && newValue === '') {
        this.removeAttribute('max')
      }
    }

    maximise() {
      if (this.hasAttribute('max')) {
        this.removeAttribute('max')
      } else {
        this.setAttribute('max', '')
      }
    }
    
    minimise() {
      this.setAttribute('min', '')
    }

    close() {
      this.remove()
    }

    static get observedAttributes() {
      return ['min', 'max']
    }
  })
