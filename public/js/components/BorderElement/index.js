window.customElements.define('border-element',
  class extends window.HTMLElement {
    #currentBorder

    constructor () {
      super()
    }

    connectedCallback() {
      if (this.isConnected) {
        this.addEventListener('mousedown', this.#onMouseDown)
      }
    }

    disconnectedCallback() {
      this.removeEventListener('mousedown', this.#onMouseDown)
    }
    
    #onMouseDown = e =>  {
      this.#currentBorder = e.target
      window.addEventListener('mousemove', this.#onMouseMove)
      window.addEventListener('mouseup', this.#onMouseUp)
    }

    #onMouseUp = e => {
      window.removeEventListener('mousemove', this.#onMouseMove)
      window.removeEventListener('mouseup', this.#onMouseUp)
    }

    #onMouseMove = e => {
      const sides = JSON.parse(this.#currentBorder
        .getAttribute('data-sides'))
      const directions = JSON.parse(this.#currentBorder
        .getAttribute('data-directions'))
      
      const coordinates = []
      for (const direction of directions) {
        coordinates.push(e[direction])
      }

      const resizeWindow = new CustomEvent('resizeWindow',
        { bubbles: true, composed: true, detail: 
          { sides, coordinates }})
      this.dispatchEvent(resizeWindow)
    }
})
