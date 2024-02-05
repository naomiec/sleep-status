import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('sleep-card')
export class ItemCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin: 10px;
      border: 1px solid var(--border-color-metric);
      border-radius: 10px;
      padding: 20px;
      background-color: var(--background-color-metric);
    }
    ::slotted(h2) {
      color: var(--link-color);
      margin: 0 0 10px 0;
      text-align: left;
    }
    ::slotted(p) {
      color: var(--text-color-default);
      margin: 0;
    }
  `;

  render() {
    return html`
      <slot name="title"></slot>
      <slot name="description"></slot>
    `;
  }
}