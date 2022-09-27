import titleBarTemplate from './titlebar-template'

window.customElements.define('title-bar',
  class extends window.HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = titleBarTemplate
    }

    connectedCallback() {
      if (this.isConnected) {
        this.addEventListener('mousedown', this.#onMouseDown)
        this.addEventListener('click', this.#onClick)
      }
    }

    disconnectedCallback() {
      this.removeEventListener('mousedown', this.#onMouseDown)
    }
    
    #onMouseDown = e =>  {
      window.addEventListener('mousemove', this.#onMouseMove)
      window.addEventListener('mouseup', this.#onMouseUp)
    }

    #onClick = e => {
      const activateWindow = new CustomEvent('activateWindow',
      { bubbles: true, composed: true })
      this.dispatchEvent(activateWindow)
    }

    #onMouseUp = e => {
      window.removeEventListener('mousemove', this.#onMouseMove)
      window.removeEventListener('mouseup', this.#onMouseUp)
    }

    #onMouseMove = e => {
      const clientX = e.clientX
      const clientY = e.clientY

      const moveWindow = new CustomEvent('moveWindow',
        { bubbles: true, composed: true, detail: 
          { clientX, clientY }})
      this.dispatchEvent(moveWindow)
    }
})