import windowTemplate from './window-template'
import  '../CloseButton'
import '../MaximiseButton'
import '../MinimiseButton'
import '../BorderElement'
window.customElements.define('window-element',
  class extends window.HTMLElement {
    #clickedBorder

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
        this.addEventListener('resizeWindow', this.#onResize)
      }
    }

    disconnectedCallback() {
      this.removeEventListener('closeWindow', this.#onClose)
      this.removeEventListener('maximiseWindow', this.#onMaximise)
      this.removeEventListener('minimiseWindow', this.#onMinimise)
      this.removeEventListener('resizeWindow', this.#onResize)
    }

    #onClose = e => this.close(e)
    #onMaximise = e => this.maximise(e)
    #onMinimise = e => this.minimise(e)
    #onResize = e => this.resize(e.detail.sidesOrDimensions,
      e.detail.coordinates)
    
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'max' && newValue === '') {
        this.removeAttribute('min')
      } else if (name === 'min' && newValue === '') {
        this.removeAttribute('max')
      }
    }

    #getCssFriendlySize(side, magnitude) {
      let size
      switch (side) {
        case 'top':
          size = magnitude
          break
        case 'left':
          size = magnitude
          break
        case 'bottom':
          size = window.innerHeight - magnitude
          break
        case 'right':
          size = window.innerWidth - magnitude
      }
      
      return size
    }

    maximise(e) {
      if (this.hasAttribute('max')) {
        this.removeAttribute('max')
        this.addEventListener('resizeWindow', this.#onResize)
      } else {
        this.setAttribute('max', '')
        this.removeEventListener('resizeWindow', this.#onResize)
      }
    }
    
    minimise(e) {
      if (this.hasAttribute('min')) {
        this.removeAttribute('min')
      } this.setAttribute('min', '')
    }

    close(e) {
      this.remove()
    }

    resize(sides, coordinates) {
      for (let i = 0; i < sides.length; i++) {
        const side = sides[i]
        const coordinate = coordinates[i]

        this.style[side] =
          `${this.#getCssFriendlySize(side, coordinate)}px`
      }
    }

    static get observedAttributes() {
      return ['min', 'max']
    }
  })
