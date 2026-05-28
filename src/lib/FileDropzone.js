class FileDropzone extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .zone {
          border: 2px dashed #CBD5E1;
          border-radius: 10px;
          padding: 1.5rem;
          text-align: center;
          color: #94A3B8;
          font-size: 0.9rem;
          font-family: 'Inter', system-ui, sans-serif;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .zone:hover {
          border-color: #4F46E5;
          color: #4F46E5;
        }
        .zone.active {
          border-color: #4F46E5;
          background: #EEF2FF;
          color: #4F46E5;
        }
      </style>
      <div class="zone">
        Drag &amp; drop a JSON / CSV file here for import / Click to browse
        <input type="file" accept=".json,.csv" hidden />
      </div>
    `

    const zone  = shadow.querySelector('.zone')
    const input = shadow.querySelector('input')

    zone.addEventListener('click', () => input.click())
    input.addEventListener('change', (e) => {
      const file = e.target.files[0]
      if (file) this.#emit(file)
      input.value = ''
    })

    // Drag & drop
    zone.addEventListener('dragover', (e) => {
      e.preventDefault()
      zone.classList.add('active')
    })
    zone.addEventListener('dragleave', () => {
      zone.classList.remove('active')
    })
    zone.addEventListener('drop', (e) => {
      e.preventDefault()
      zone.classList.remove('active')
      const file = e.dataTransfer.files[0]
      if (file) this.#emit(file)
    })
  }

  #emit(file) {
    this.dispatchEvent(new CustomEvent('file-selected', {
      detail: { file },
      bubbles: true,
      composed: true,
    }))
  }
}

if (!customElements.get('file-dropzone')) {
  customElements.define('file-dropzone', FileDropzone)
}