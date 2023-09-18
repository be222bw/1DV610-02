window.customElements.define('close-button',
  class extends window.HTMLElement {
    constructor () {
      super()
    }

    
    connectedCallback () {
      if (this.isConnected) {
        this.addEventListener('click', this.#onClick)
      }
    }
    
    disconnectedCallback () {
      this.removeEventListener('click', this.#onClick)
    }
    
    #onClick = e => {
      const closeWindow = new CustomEvent('closeWindow',
        { bubbles: true, composed: true })
      this.dispatchEvent(closeWindow)
    }
})
