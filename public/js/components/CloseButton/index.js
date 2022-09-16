window.customElements.define('close-button',
  class extends window.HTMLElement {
    constructor () {
      super()
      this.addEventListener('click', this.#onClick)
    }

    #onClick ()  {
      const closeWindow = new CustomEvent('closeWindow',
        { bubbles: true, composed: true })
      this.removeEventListener('click', this.#onClick)
      this.dispatchEvent(closeWindow)
    }
})
