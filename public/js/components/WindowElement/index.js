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
        this.addEventListener('closeWindow', this.close)
        this.addEventListener('maximiseWindow', this.maximise)
        this.addEventListener('minimiseWindow', this.minimise)
        this.addEventListener('resizeWindow', this.#resize)
        this.addEventListener('moveWindow', this.#moveWindow)
        this.addEventListener('click', this.#onClick)
      }
    }

    disconnectedCallback() {
      this.removeEventListener('closeWindow', this.close)
      this.removeEventListener('maximiseWindow', this.maximise)
      this.removeEventListener('minimiseWindow', this.minimise)
      this.removeEventListener('resizeWindow', this.#resize)
      this.removeEventListener('moveWindow', this.#moveWindow)
      this.removeEventListener('click', this.activateWindow)
    }
    
    #onClick = () => this.activateWindow()
    
    maximise() {
      if (this.hasAttribute('max')) {
        this.addEventListener('resizeWindow', this.#resize)
      } else {
        this.removeEventListener('resizeWindow', this.#resize)
      }
      this.toggleAttribute('data-max')
    }
    
    minimise = () => this.toggleAttribute('data-min')
    close = () => this.remove()

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

    activateWindow = () => this.setAttribute('data-active', '')

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
  })
