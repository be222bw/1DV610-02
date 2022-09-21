import windowTemplate from './window-template'
import  '../CloseButton'
import '../MaximiseButton'
import '../MinimiseButton'
import '../BorderElement'
window.customElements.define('window-element',
  class extends window.HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = windowTemplate
    }

    connectedCallback() {
      if (this.isConnected) {
        this.addEventListener('closeWindow', this.#onClose)
        this.addEventListener('maximiseWindow', this.#onMaximise)
        this.addEventListener('minimiseWindow', this.#onMinimise)
      }
    }

    disconnectedCallback() {
      this.removeEventListener('closeWindow', this.#onClose)
      this.removeEventListener('maximiseWindow', this.#onMaximise)
      this.removeEventListener('minimiseWindow', this.#onMinimise)
    }

    #onClose = e => this.close(e)
    #onMaximise = e => this.maximise(e)
    #onMinimise = e => this.minimise(e)
    
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'max' && newValue === '') {
        this.removeAttribute('min')
      } else if (name === 'min' && newValue === '') {
        this.removeAttribute('max')
      }
    }

    maximise(e) {
      if (this.hasAttribute('max')) {
        this.removeAttribute('max')
      } else {
        this.setAttribute('max', '')
      }
    }
    
    minimise(e) {
      this.setAttribute('min', '')
    }

    close(e) {
      this.remove()
    }

    static get observedAttributes() {
      return ['min', 'max']
    }
  })
