window.customElements.define('title-bar',
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
    
    #onMouseDown = e =>  {
      window.addEventListener('mousemove', this.#onMouseMove)
      window.addEventListener('mouseup', this.#onMouseUp)
    }

    #onMouseUp = e => {
      window.removeEventListener('mousemove', this.#onMouseMove)
      window.removeEventListener('mouseup', this.#onMouseUp)
    }

    #onMouseMove = e => {
      const xCoordinate = e.clientX
      const yCoordinate = e.clientY

      const moveWindow = new CustomEvent('moveWindow',
        { bubbles: true, composed: true, detail: 
          { xCoordinate, yCoordinate }})
      this.dispatchEvent(moveWindow)
    }
})