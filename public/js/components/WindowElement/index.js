import windowTemplate from './window-template'
import  '../CloseButton'
import '../MaximiseButton'
import '../MinimiseButton'
import '../BorderElement'
import '../TitleBar'

'use strict'

window.customElements.define('window-element',
class extends window.HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = windowTemplate
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'data-max' && newValue === '') {
        this.removeAttribute('data-min')
      } else if (name === 'data-min' && newValue === '') {
        this.removeAttribute('data-max')
      } else if (name === 'data-title') {
        this.shadowRoot.querySelector('title-bar').setTitle(newValue)
      }
    }

    connectedCallback() {
      if (this.isConnected) {
        this.addEventListener('closeWindow', this.close)
        this.addEventListener('maximiseWindow', this.maximise)
        this.addEventListener('minimiseWindow', this.minimise)
        this.addEventListener('resizeWindow', this.#resize)
        this.addEventListener('moveWindow', this.#moveWindow)
        this.addEventListener('activateWindow', this.activateWindow)
      }
    }
    
    disconnectedCallback() {
      this.removeEventListener('activateWindow', this.activateWindow)
      this.removeEventListener('closeWindow', this.close)
      this.removeEventListener('minimiseWindow', this.minimise)
      this.removeEventListener('maximiseWindow', this.maximise)
      this.removeEventListener('resizeWindow', this.#resize)
      this.removeEventListener('moveWindow', this.#moveWindow)
    }
    
    activateWindow = () => this.setAttribute('data-active', '')
    close = () => this.remove()
    minimise = () => this.toggleAttribute('data-min')
    
    maximise() {
      if (this.hasAttribute('max')) {
        this.addEventListener('resizeWindow', this.#resize)
      } else {
        this.removeEventListener('resizeWindow', this.#resize)
      }
      this.toggleAttribute('data-max')
    }
    
    #resize(e) {
      const sides = e.detail.sides
      const coordinates = e.detail.coordinates
      
      for (let i = 0; i < sides.length; i++) {
        let side = sides[i]
        const coordinate = coordinates[i]
        if (!this.#wouldBeLessThanMinimum(side, coordinate)) {
          this.setSide(side, coordinate)
        }
      }
    }
    
    #moveWindow = (e) => {
      const movementX = e.detail.movementX
      const movementY = e.detail.movementY

      this.moveHorizontally(movementX)
      this.moveVertically(movementY)
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

    
    moveVertically(movement) {
      const boundingClientRect = this.getBoundingClientRect()
      this.style.setProperty('--translate-y', `${boundingClientRect.y + 
        movement}px`)
    }
    
    moveHorizontally(movement) {
      const boundingClientRect = this.getBoundingClientRect()
      this.style.setProperty('--translate-x', `${boundingClientRect.x + 
        movement}px`)
    }

    setSide(side, pixels) {
      switch (side) {
        case 'left':
          this.setLeft(pixels)
        case 'top':
          this.setTop(pixels)
        case 'right':
          this.setRight(pixels)
        case 'bottom':
          this.setBottom(pixels)
      }
    }

    setTop(pixels) {
      const boundingClientRect = this.getBoundingClientRect()
    }

    setLeft(pixels) {
      const oldX = parseInt(this.style.getPropertyValue('--translate-x'))
      const oldWidth = this.getBoundingClientRect().width
      console.log(oldWidth)
      this.style.width = (oldWidth + pixels) + 'px'
      this.style.setProperty('--translate-x', `${pixels}px`)
    }

    setBottom(pixels) {
      const boundingClientRect = this.getBoundingClientRect()
    }

    setRight(pixels) {
      const oldRight = this.getBoundingClientRect().right
      const oldWidth = this.getBoundingClientRect().width
      this.style.width = (oldWidth + (pixels - oldRight)) + 'px'
    }

    #wouldBeLessThanMinimum(side, newPosition) {
      const boundingClientRect = this.getBoundingClientRect()
      const oppositeSide = this.#getOppositeSide(side)
      const dimension = this.#getDimensionBySide(side)
      const minDimension = this.#getMinDimension(dimension)
      const difference =
        Math.abs(newPosition - boundingClientRect[oppositeSide])
      return difference < minDimension
    }

    #getMinDimension(dimension) {
      const computedDimension =
        window.getComputedStyle(this)[`min-${dimension}`]
      return parseInt(computedDimension, 10)
    }

    static get observedAttributes() {
      return ['data-min', 'data-max', 'data-active', 'data-title']
    }
  })
