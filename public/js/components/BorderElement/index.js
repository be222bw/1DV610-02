window.customElements.define('border-element',
  class extends window.HTMLElement {
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

    #onMouseUp = e => {
      this.removeEventListener('mousemove', this.#onMouseMove)
      this.removeEventListener('mouseup', this.#onMouseUp)
    }

    #onMouseMove = e => {
      this.addEventListener('mouseup', this.#onMouseUp)
    }

    #onMouseDown = e =>  {
      this.addEventListener('mousemove', this.#onMouseMove)
      let side
      switch (e.target) {
        case 'bottomside':
        side = 'bottom'
      }
      
      const resizeWindow = new CustomEvent('resizeWindow',
        { bubbles: true, composed: true, details: { side: side }})
      this.dispatchEvent(minimiseWindow)
    }
})