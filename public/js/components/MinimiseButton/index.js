window.customElements.define('minimise-button',
  class extends window.HTMLElement {
    constructor () {
      super()
      this.addEventListener('click', this.#onClick)
    }

    #onClick ()  {
      const minimiseWindow = new CustomEvent('minimiseWindow',
        { bubbles: true, composed: true })
      this.dispatchEvent(minimiseWindow)
    }
})