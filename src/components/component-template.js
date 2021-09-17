class CompName extends HTMLElement {
  static PROP = {
    ID: {
      tag: 'id',
      default: '',
    },
    DISABLED: {
      tag: 'disabled',
      default: false,
    },
  }
  static MAIN_STYLE = `
    :host {
        /* By default, Shadow DOM element is display:inline; */
        display: block;
        contain: content;
    }
    .compName {

    }
  `

  static get observedAttributes() {
    const attrs = Object.values(CompName.PROP)
    const attrList = attrs.map((attr) => attr.tag)
    return attrList
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })

    const mainStyle = document.createElement('style')
    mainStyle.textContent = CompName.MAIN_STYLE

    const div = document.createElement('div')
    div.classList.add('compName')

    shadowRoot.append(mainStyle, div)
  }

  //LifeCycles
  attributeChangeCallback(attrName, oldValue, newValue) {
    //This lifecycle will be called firstm though node is not connected yet
    if (this.isConnected && newValue !== oldValue) {
      switch (attrName) {
        case CompName.PROP.ID.tag:
          this[attrName] = newValue
          break
        case CompName.PROP.DISABLED.tag:
          this[attrName] = this.hasAttribute(CompName.PROP.DISABLED.tag)
        default:
          break
      }
    }
  }
  connectedCallback() {
    const id = this.getAttribute(CompName.PROP.ID.tag)

    this.updateId(this, id ?? CompName.PROP.ID.default)

    // this.addEventListener('click', (e) => this.handleClick(e))
  }
  disconnectedCallback() {
    // this.removeEventListener('click', (e) => this.handleClick(e))
  }

  //Properties
  get id() {
    return this.getAttribute(CompName.PROP.ID.tag)
  }
  set id(value) {
    const val = value ?? CompName.PROP.ID.default
    this.setAttribute(CompName.PROP.ID.tag, val)
    this.updateId(this, val)
  }

  //Methods
  //Property initializer with arrow functions, to bind function to 'this' class
  updateId = (elem, value) => {
    const root = elem.shadowRoot.querySelector('.compName')
    root.id = value ?? CompName.PROP.ID.default
  }
}
customElements.define('comp-name', CompName)
