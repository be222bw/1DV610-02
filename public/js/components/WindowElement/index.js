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
    console.log(name)
    if (name === 'data-max' && newValue === '') {
      this.removeAttribute('data-min')
    } else if (name === 'data-min' && newValue === '') {
      this.removeAttribute('data-max')
    } else if (name === 'data-title') {
      this.shadowRoot.querySelector('title-bar').setTitle(newValue)
    } else if (name === 'data-application') {
      const objectName = this.#getImportableString(newValue)
      console.log(objectName)
      import(`../${objectName}/index.js`)
      const application = document.createElement(newValue)
      this.shadowRoot.querySelector('#content').appendChild(application)
    }
  }

  #getImportableString (elementName) {
    let string = ''
    for (let i = 0; i < elementName.length; i++) {
      const currentCharacter = elementName.charAt(i)
      if (i === 0) {
        string += currentCharacter.toUpperCase()
      } else if (currentCharacter === '-') {
        const nextCharacter = elementName.charAt(i + 1).toUpperCase()
        string += nextCharacter
        i++
      } else {
        string += currentCharacter
      }
    }
    return string
  }

  connectedCallback() {
    if (this.isConnected) {
      this.addEventListener('closeWindow', this.close)
      this.addEventListener('maximiseWindow', this.maximise)
      this.addEventListener('minimiseWindow', this.minimise)
      document.addEventListener('mousedown', this.#activateOrDeactivateWindow)
      this.addEventListener('resizeWindow', this.#resize)
      this.addEventListener('moveWindow', this.#moveWindow)
    }
  }
  
  disconnectedCallback() {
    this.removeEventListener('closeWindow', this.close)
    this.removeEventListener('minimiseWindow', this.minimise)
    this.removeEventListener('maximiseWindow', this.maximise)
    this.removeEventListener('mousedown', this.#activateOrDeactivateWindow)
    this.removeEventListener('resizeWindow', this.#resize)
    this.removeEventListener('moveWindow', this.#moveWindow)
  }

  setContent(innerHTML) {
    this.shadowRoot.querySelector('#content').innerHTML =
      innerHTML
  }
  
  setTitle = (title) =>
    this.shadowRoot.querySelector('title-bar').setTitle(title)
  close = () => this.remove()
  minimise = () => this.toggleAttribute('data-min')

  #dispatchEvent(name, detail) {
    this.dispatchEvent(new CustomEvent(name,
      {bubbles: true, composed: true, detail}))
  }
  
  maximise = (e) => {
    e.stopPropagation()
    this.toggleAttribute('data-max')
    this.#toggleResize()
    this.#dispatchEvent('wasMaximised', {isMaximised:
      this.hasAttribute('data-max')})
  }

  #toggleResize() {
    if (this.hasAttribute('data-max')) {
      this.removeEventListener('resizeWindow', this.#resize)
    } else {
      this.addEventListener('resizeWindow', this.#resize)
    }
  }
  
  #activateOrDeactivateWindow = (e) => {
    if (e.target === this) {
      if (!this.hasAttribute('data-active')) {
        this.activateWindow()
      }
    } else {
      this.deactivateWindow()
    }
  }

  activateWindow() {
    this.setAttribute('data-active', '')
    document.body.appendChild(this)
    this.#dispatchEvent('activateWindow')
  }

  deactivateWindow() {
    this.removeAttribute('data-active')
    this.#dispatchEvent('deactivateWindow')
  }

  #resize(e) {
    e.stopPropagation()
    const sides = e.detail.sides
    const coordinates = e.detail.coordinates
    
    for (let i = 0; i < sides.length; i++) {
      let side = sides[i]
      const coordinate = coordinates[i]
      if (!this.#wouldBeLessThanMinimum(side, coordinate)) {
        this.setSide(side, coordinate)
      }
    }

    this.#dispatchEvent('wasResized', {sides, coordinates})
  }
  
  #moveWindow = (e) => {
    e.stopPropagation()
    const movementX = e.detail.movementX
    const movementY = e.detail.movementY

    this.moveHorizontally(movementX)
    this.moveVertically(movementY)

    this.#dispatchEvent('wasMoved', {movementX, movementY})
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
      default:
        throw new Error('IllegalArgumentException')
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
        break
      case 'top':
        this.setTop(pixels)
        break
      case 'right':
        this.setRight(pixels)
        break
      case 'bottom':
        this.setBottom(pixels)
        break
      default:
        console.log(side)
        throw new Error('IllegalArgumentException')
    }
  }
  
  setLeft(pixels) {
    const boundingClientRect = this.getBoundingClientRect()
    this.style.setProperty('--translate-x', `${pixels}px`)
    const oldWidth = boundingClientRect.width
    const oldLeft = boundingClientRect.left
    this.style.width = (oldWidth - pixels + oldLeft) + 'px'
  }

  setTop(pixels) {
    const boundingClientRect = this.getBoundingClientRect()
    this.style.setProperty('--translate-y', `${pixels}px`)
    const oldHeight = boundingClientRect.height
    const oldTop = boundingClientRect.top
    this.style.height = (oldHeight - pixels + oldTop) + 'px'
  }

  setRight(pixels) {
    const boundingClientRect = this.getBoundingClientRect()
    const oldRight = boundingClientRect.right
    const oldWidth = boundingClientRect.width
    this.style.width = (oldWidth + pixels - oldRight) + 'px'
  }

  setBottom(pixels) {
    const boundingClientRect = this.getBoundingClientRect()
    const oldBottom = boundingClientRect.bottom
    const oldHeight = boundingClientRect.height
    this.style.height = (oldHeight + pixels - oldBottom) + 'px'
  }

  #wouldBeLessThanMinimum(side, newCoordinate) {
    const boundingClientRect = this.getBoundingClientRect()
    const oppositeSide = this.#getOppositeSide(side)
    const dimension = this.#getDimensionBySide(side)
    const minDimension = this.#getMinDimension(dimension)
    const difference =
      Math.abs(newCoordinate - boundingClientRect[oppositeSide])
    return difference < minDimension
  }

  #getMinDimension(dimension) {
    const computedDimension =
      window.getComputedStyle(this)[`min-${dimension}`]
    return parseInt(computedDimension, 10)
  }

  static get observedAttributes() {
    return ['data-min', 'data-max', 'data-active', 'data-title',
      'data-application']
  }
})
