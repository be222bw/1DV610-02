window.customElements.define('minimise-button',
  class extends window.HTMLElement {
    constructor() {
      super()
    }

    connectedCallback() {
      if (this.isConnected) {
        this.addEventListener('click', this.#onClick)
      }
    }

    disconnectedCallback() {
      this.removeEventListener('click', this.#onClick)
    }

    #onClick = e =>  {
      const minimiseWindow = new CustomEvent('minimiseWindow',
        { bubbles: true, composed: true })
      this.dispatchEvent(minimiseWindow)
    }
})