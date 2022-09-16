window.customElements.define('maximise-button',
  class extends window.HTMLElement {
    #isMaximised

    constructor () {
      super()
      this.addEventListener('click', this.#onClick)
    }

    #onClick ()  {
      const maximiseWindow = new CustomEvent('maximiseWindow',
        { bubbles: true, composed: true })
      this.dispatchEvent(maximiseWindow)
    }
})