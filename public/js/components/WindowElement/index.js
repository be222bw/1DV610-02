import windowTemplate from './window-template'
import  '../CloseButton'
import '../MaximiseButton'
import '../MinimiseButton'
import '../BorderElement'
import '../TitleBar'

window.customElements.define('window-element',
class extends window.HTMLElement {
  #pos1
  #pos2
  #pos3
  #pos4
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = windowTemplate
      this.#pos1 = 0
      this.#pos2 = 0
      this.#pos3 = 0
      this.#pos4 = 0
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'data-max' && newValue === '') {
        this.removeAttribute('data-min')
      } else if (name === 'data-min' && newValue === '') {
        this.removeAttribute('data-max')
      }
    }

    connectedCallback() {
      if (this.isConnected) {
        this.addEventListener('closeWindow', this.#onClose)
        this.addEventListener('maximiseWindow', this.#onMaximise)
        this.addEventListener('minimiseWindow', this.#onMinimise)
        this.addEventListener('resizeWindow', this.#onResize)
        this.addEventListener('moveWindow', this.#onMoveWindow)
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
    
    #onClose = e => this.close()
    #onMaximise = e => this.maximise()
    #onMinimise = e => this.minimise()
    #onResize = e => this.#resize(e)
    #onMoveWindow = e => this.#initMoveWindow(e)
    #onClick = e => this.activateWindow()
    
    maximise() {
      if (this.hasAttribute('max')) {
        this.addEventListener('resizeWindow', this.#onResize)
      } else {
        this.removeEventListener('resizeWindow', this.#onResize)
      }
      this.toggleAttribute('data-max')
    }
    
    minimise(e) {
      this.toggleAttribute('data-min')
    }

    close(e) {
      this.remove()
    }

    #resize(e) {
      const sides = e.detail.sides
      const coordinates = e.detail.coordinates

      this.#iterateSidesAndCoordinates(sides, coordinates)
    }

    #iterateSidesAndCoordinates(sides, coordinates) {
      for (let i = 0; i < sides.length; i++) {
        const boundingClientRect = this.getBoundingClientRect()
        const side = sides[i]
        const oppositeSide = this.#getOppositeSide(side)
        const dimension = this.#getDimensionBySide(side)
        const minDimension = this.#getMinDimension(dimension)
        const coordinate = coordinates[i]

        const newPosition = this.#getCssFriendlySize(side, coordinate)
        const dif = Math.abs(coordinate - boundingClientRect[oppositeSide])

        if (dif >= minDimension) {
          this.style[side] = `${newPosition}px`
        }
      }
    }

    #getOppositeSide(direction) {
      switch (direction) {
        case 'left':
          return 'right'
        case 'right':
          return 'left'
        case 'top':
          return 'bottom'
        case 'bottom':
          return 'top'
      }
    }
    
    #getDimensionBySide(side) {
      switch (side) {
        case 'left':
        case 'right':
          return 'width'
        case 'top':
        case 'bottom':
          return 'height'
        default:
          throw new Error('IllegalArgumentException')
      }
    }

    #getMinDimension(dimension) {
      const computedDimension =
        window.getComputedStyle(this)[`min-${dimension}`]
      return parseInt(computedDimension, 10)
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

    activateWindow() {
      this.setAttribute('data-active', '')
    }

    #initMoveWindow(e) {
      console.log('initmove')
      this.pos3 = e.detail.clientX
      this.pos4 = e.detail.clientY

      document.addEventListener('mousemove', this.#moveWindow)
      document.addEventListener('mouseup', this.#exitMoveWindow)
    }

    static get observedAttributes() {
      return ['data-min', 'data-max', 'data-active']
    }

    #moveWindow = (e) => {
      console.log(e.clientX)
      this.#pos1 = this.#pos3 - e.clientX
      this.#pos2 = this.#pos4 - e.clientY
      this.#pos3 = e.clientX
      this.#pos4 = e.clientY
      this.style.top = (this.offsetTop - this.#pos2) + 'px'
      this.style.left = (this.offsetLeft - this.#pos1) + 'px'
    }

    #exitMoveWindow = () => {
      document.removeEventListener('mousemove', this.#moveWindow)
      this.removeEventListener('mouseup', this.#exitMoveWindow)
    }
  })
