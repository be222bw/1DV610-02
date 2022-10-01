import titleBarTemplate from './titlebar-template'

window.customElements.define('title-bar',
  class extends window.HTMLElement {
    #title

    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = titleBarTemplate
    }

    connectedCallback() {
      if (this.isConnected) {
        this.#title = this.shadowRoot.querySelector('#title')
        this.addEventListener('mousedown', this.#onMouseDown)
      }
    }

    setTitle(title) {
      this.#title.innerHTML = title
    }

    getTitle = () => this.#title.innerHTML

    disconnectedCallback() {
      this.removeEventListener('mousedown', this.#onMouseDown)
    }
    
    #onMouseDown = e =>  {
      window.addEventListener('mousemove', this.#onMouseMove)
      window.addEventListener('mouseup', this.#onMouseUp)
      const activateWindow = new CustomEvent('activateWindow',
      { bubbles: true, composed: true })
      this.dispatchEvent(activateWindow)
    }

    #onMouseUp = e => {
      window.removeEventListener('mousemove', this.#onMouseMove)
      window.removeEventListener('mouseup', this.#onMouseUp)
    }

    #onMouseMove = e => {
      console.log(e.pageX)
      const movementX = e.movementX
      const movementY = e.movementY

      const moveWindow = new CustomEvent('moveWindow',
        { bubbles: true, composed: true, detail: 
          { movementX, movementY }})
      this.dispatchEvent(moveWindow)
    }
})