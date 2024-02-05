import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("toggle-switch")
export class ToggleSwitchElement extends LitElement {
  @property({ reflect: true, type: Boolean })
  on: boolean = false;

  render() {
    return html`<label>
      <span class="slider">
        <input type="checkbox" ?checked=${this.on} @change=${this._handleChange} />
      </span>
      <slot></slot>
    </label>`;
  }

  static styles = css`
    :host {
      display: block;
    }
    label {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: var(--size-spacing-medium);
      line-height: 2em;
    }
    .slider {
      display: inline-block;
      border: 1px solid var(--link-color);
      border-radius: 0.75em;
      background-color: var(--background-color);
      height: 1.5em;
      width: 2.75em;
      position: relative;
      transition: background-color
        var(--time-transition-control);
    }
    .slider:has(input:checked) {
      background-color: var(--link-color);
    }
    input {
      appearance: none;
      background-color: var(--background-color-metric);
      border-radius: 50%;
      width: 1.25em;
      height: 1.25em;
      vertical-align: center;
      position: absolute;
      left: 0;
      transition: left var(--time-transition-control);
    }
    input:checked {
      left: 1.5em;
    }
  `;

  _handleChange(ev: Event) {
    const target = ev.target as HTMLInputElement;
    this.on = target?.checked;
    localStorage.setItem('lightMode', String(this.on));
  }

  constructor() {
    super();
    // Check if 'lightMode' state is saved in localStorage and set 'on' accordingly
    const savedState = localStorage.getItem('lightMode');
    this.on = savedState === 'true';
  }
}