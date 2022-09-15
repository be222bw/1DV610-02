window.customElements.define('close-button',
  class extends window.HTMLElement {
    #onClick ()
    constructor () {
      super()
      this.addEventListener('click', this.#onClick)
    }
    
    #onClick () {
      const closeWindow = new CustomEvent('closeWindow')
      this.removeEventListener('click', this.#onClick)
      this.dispatchEvent(closeWindow)
    }
})
