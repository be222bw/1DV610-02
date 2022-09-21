window.customElements.define('maximise-button',
  class extends window.HTMLElement {
    #isMaximised

    constructor () {
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
      const maximiseWindow = new CustomEvent('maximiseWindow',
        { bubbles: true, composed: true })
      this.dispatchEvent(maximiseWindow)
    }
})