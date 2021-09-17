class ButtonBase extends HTMLElement {
  static TYPE = {
    PRIMARY: {
      value: 'primary',
      style: `
        .btn_primary {
          background: var(--theme-60);
          border: none;
          border-radius: 0.25rem;
          color: var(--color-white);
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .btn_primary:hover,
        .btn_primary:focus {
          background-color: var(--theme-70);
        }
        .btn_primary:active {
          background-color: var(--theme-80);
        }

        /* ::slotted can only target slotted top-level nodes */
        /* ::slotted(svg) path { }; won't work */
        .btn_primary svg path {
          fill: var(--color-white);
          transition: fill 0.2s;
        }
        .btn_primary:hover svg path {
          fill: var(--color-white);
        }
      `,
    },
    SECONDARY: {
      value: 'secondary',
      style: `
        .btn_secondary {
          background: var(--color-white);
          border: none;
          border-radius: 0.25rem;
          color: var(--theme-60);
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .btn_secondary:hover,
        .btn_secondary:focus {
          border-color: var(--theme-70)
          color: var(--theme-70);
        }
        .btn_secondary:active {
          background: var(--theme-00);
          border-color: var(--theme-80);
          color: var(--theme-80);
        }
        .btn_secondary svg path {
          fill: var(--theme-70);
          transition: fill 0.2s;
        }
        .btn_secondary:hover svg path {
          fill: var(--theme-80);
        }
      `,
    },
  }
  static PROP = {
    ID: {
      tag: 'id',
      default: '',
    },
    LABEL: {
      tag: 'label',
      default: 'button-base',
    },
    TYPE: {
      tag: 'type',
      default: ButtonBase.TYPE.PRIMARY,
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
    .host([disabled]) {
      opcacity: 0.3;
      pointer-events: none;
    }
    .btn {
      border: none;
      border-radius: 0.25rem;
      box-sizing: border-box;
      cursor: pointer;

      font-family: 'Open Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      min-height: 2rem;

      letter-spacing: -0.016rem;
      line-height: 1.25rem;

      outline: none;
      padding: 0 1rem;
      text-align: center;
    }
    .btn_svg {
      min-width: 1rem;
      padding: 0 0.5rem;
    }
  `

  static get observedAttributes() {
    const attrs = Object.values(ButtonBase.PROP)
    const attrList = attrs.map((attr) => attr.tag)
    return attrList
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })

    const mainStyle = document.createElement('style')
    mainStyle.textContent = ButtonBase.MAIN_STYLE

    const button = document.createElement('button')
    button.classList.add('btn')

    shadowRoot.append(mainStyle, button)
  }

  //LifeCycles
  attributeChangeCallback(attrName, oldValue, newValue) {
    //This lifecycle will be called firstm though node is not connected yet
    if (this.isConnected && newValue !== oldValue) {
      switch (attrName) {
        case ButtonBase.PROP.ID.tag:
        case ButtonBase.PROP.LABEL.tag:
        case ButtonBase.PROP.TYPE.tag:
          this[attrName] = newValue
          break
        case ButtonBase.PROP.DISABLED.tag:
          this[attrName] = this.hasAttribute(ButtonBase.PROP.DISABLED.tag)
        default:
          break
      }
    }
  }
  connectedCallback() {
    const id = this.getAttribute(ButtonBase.PROP.ID.tag)
    const label = this.getAttribute(ButtonBase.PROP.LABEL.tag)
    const type = this.getAttribute(ButtonBase.PROP.TYPE.tag)

    this.updateId(this, id ?? ButtonBase.PROP.ID.default)
    this.updateLabel(this, label ?? ButtonBase.PROP.LABEL.default)
    this.updateType(this, type ?? ButtonBase.PROP.TYPE.default)

    // this.addEventListener('click', (e) => this.handleClick(e))
  }
  disconnectedCallback() {
    // this.removeEventListener('click', (e) => this.handleClick(e))
  }

  //Properties
  get id() {
    return this.getAttribute(ButtonBase.PROP.ID.tag)
  }
  set id(value) {
    const val = value ?? ButtonBase.PROP.ID.default
    this.setAttribute(ButtonBase.PROP.ID.tag, val)
    this.updateId(this, val)
  }

  get label() {
    return this.getAttribute(ButtonBase.PROP.LABEL.tag)
  }
  set label(value) {
    const val = value ?? ButtonBase.PROP.LABEL.default
    this.setAttribute(ButtonBase.PROP.LABEL.tag, val)
    this.updateLabel(this, val)
  }

  get type() {
    return this.getAttribute(ButtonBase.PROP.ID.tag)
  }
  set type(value) {
    const val = value ?? ButtonBase.PROP.ID.default
    this.setAttribute(ButtonBase.PROP.ID.tag, val)
    this.updateType(this, val)
  }

  get disabled() {
    return this.hasAttribute(ButtonBase.PROP.DISABLED.tag)
  }
  set disabled(value) {
    if (value) {
      this.setAttribute(ButtonBase.PROP.DISABLED.tag, '')
    } else {
      this.removeAttribute(ButtonBase.PROP.DISABLED.tag)
    }
  }

  //Methods
  //Property initializer with arrow functions, to bind function to 'this' class
  updateId = (elem, value) => {
    const btn = elem.shadowRoot.querySelector('.btn')
    btn.id = value ?? ButtonBase.PROP.ID.default
  }
  updateLabel = (elem, value) => {
    const btn = elem.shadowRoot.querySelector('.btn')
    btn.innerHTML = value ?? ButtonBase.PROP.LABEL.default
    btn.classList.toggle('btn_svg', value.startsWith('<svg'))
  }
  updateType = (elem, value) => {
    const btn = elem.shadowRoot.querySelector('.btn')
    const mainStyle = elem.shadowRoot.querySelector('style')

    //Only 1 style at a time
    const types = Object.values(ButtonBase.TYPE)
    const typeList = types.map((type) => type.value)
    typeList.forEach((type) => btn.classList.remove(`btn_${type}`))

    let style = ''
    switch (value) {
      case ButtonBase.TYPE.SECONDARY.value:
        style = ButtonBase.TYPE.SECONDARY.style
        btn.classList.add('btn_secondary')
        break
      case ButtonBase.TYPE.PRIMARY.value:
      default:
        style = ButtonBase.TYPE.PRIMARY.style
        btn.classList.add('btn_primary')
    }

    mainStyle.textContent = ButtonBase.MAIN_STYLE + style
  }
}
customElements.define('button-base', ButtonBase)
