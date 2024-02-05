import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('user-panel')
export class UserPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
    a {
      display: block;
      margin-bottom: 8px;
      color: var(--text-color-header);
      text-decoration: none;
      white-space: nowrap;
      text-align: right;
    }
  `;

  render() {
    return html`
      <a href="profile_page.html">Profile Page</a>
      <a href="index.html">Sign Out</a>
    `;
  }
}