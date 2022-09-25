import windowTemplate from './window-template'
import  '../CloseButton'
import '../MaximiseButton'
import '../MinimiseButton'
import '../BorderElement'
import '../TitleBar'

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
        this.addEventListener('resizeWindow', this.#onResize)
        this.addEventListener('moveWindow', this.#moveWindow)
        this.addEventListener('click', this.#onClick)
      }
    }

    disconnectedCallback() {
      this.removeEventListener('closeWindow', this.#onClose)
      this.removeEventListener('maximiseWindow', this.#onMaximise)
      this.removeEventListener('minimiseWindow', this.#onMinimise)
      this.removeEventListener('resizeWindow', this.#onResize)
      this.removeEventListener('moveWindow', this.#onMoveWindow)
      this.removeEventListener('click', this.#onClick)
    }

    #onClose = e => this.close(e)
    #onMaximise = e => this.maximise(e)
    #onMinimise = e => this.minimise(e)
    #onResize = e => this.resize(e.detail.sidesOrDimensions,
      e.detail.coordinates)
    #onMoveWindow = e => this.moveWindow(e)
    #onClick = e => this.activateWindow(e)
    
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

    #getDimensionByDirection(direction) {
      switch (direction) {
        case 'left':
        case 'right':
          return 'width'
        case 'top':
        case 'bottom':
          return 'height'
      }
    }

    #getPageByDirection(direction) {
      switch (direction) {
        case 'left':
        case 'right':
          return 'pageX'
        case 'top':
        case 'bottom':
          return 'pageY'
      }
    }

    maximise(e) {
      if (this.hasAttribute('max')) {
        this.addEventListener('resizeWindow', this.#onResize)
      } else {
        this.removeEventListener('resizeWindow', this.#onResize)
      }
      this.toggleAttribute('max')
    }
    
    minimise(e) {
      this.toggleAttribute('min')
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

    activateWindow(e) {
      console.log('Activate')
      this.toggleAttribute('data-active')
    }

    #moveWindow(e) {
      const xCoordinate = e.xCoordinate
      const yCoordinate = e.yCoordinate
      const boundingClient = this.getBoundingClientRect()

      this.style.left = (boundingClient.width - xCoordinate) + 'px'
      this.style.top = (boundingClient.top - yCoordinate) + 'px'
    }

    static get observedAttributes() {
      return ['min', 'max', 'active']
    }
  })
