// FileDropzone — custom HTML element <file-dropzone>.
// Self-contained drop area with its own Shadow DOM styles. Supports drag & drop
// AND click-to-browse. When a file is selected, emits a 'file-selected' CustomEvent
// (bubbling and composed so it crosses the Shadow DOM boundary into React).

class FileDropzone extends HTMLElement {
  // connectedCallback runs when the element is first inserted into the DOM.
  connectedCallback() {
    // Shadow DOM keeps the dropzone's styles isolated from the rest of the app.
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          margin-top: 2rem;
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
        Drag &amp; drop a JSON / CSV file here, or click to browse
        <input type="file" accept=".json,.csv" hidden />
      </div>
    `

    const zone  = shadow.querySelector('.zone')
    const input = shadow.querySelector('input')

    // Click-to-browse path: the visible zone triggers the hidden <input type="file">.
    zone.addEventListener('click', () => input.click())
    input.addEventListener('change', (e) => {
      const file = e.target.files[0]
      if (file) this.#emit(file)
      input.value = ''   // reset so the same file can be picked again later
    })

    // Drag & drop path: highlight on dragover, accept on drop.
    zone.addEventListener('dragover', (e) => {
      e.preventDefault()                  // required to allow the drop
      zone.classList.add('active')
    })
    zone.addEventListener('dragleave', () => {
      zone.classList.remove('active')
    })
    zone.addEventListener('drop', (e) => {
      e.preventDefault()                  // prevent the browser from opening the file
      zone.classList.remove('active')
      const file = e.dataTransfer.files[0]
      if (file) this.#emit(file)
    })
  }

  // Private method (#) — emits a CustomEvent so React can react via addEventListener.
  // composed: true is required for the event to cross the Shadow DOM boundary.
  #emit(file) {
    this.dispatchEvent(new CustomEvent('file-selected', {
      detail: { file },
      bubbles: true,
      composed: true,
    }))
  }
}

// Guard against double-registration — Vite HMR re-runs modules during development.
if (!customElements.get('file-dropzone')) {
  customElements.define('file-dropzone', FileDropzone)
}