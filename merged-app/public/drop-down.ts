import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("drop-down")
export class DropDownElement extends LitElement {
  @property({ reflect: true, type: Boolean })
  open: boolean = false;

  render() {
    return html`
      <input
        type="checkbox"
        id="is-shown"
        @change=${this._handleChange}
        .checked=${this.open}
      />
      <label for="is-shown">
        <slot></slot>
      </label>
    `;
  }

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    #is-shown {
      display: none;
    }

    label {
      cursor: pointer;
    }

    slot[name="menu"] {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      border: 1px solid;
      background: white;
    }

    #is-shown:checked ~ slot[name="menu"] {
      display: block;
    }

    /* CSS for slotted elements and default slot content */

    ::slotted(ul[slot="menu"]),
    slot[name="menu"] > ul {
      margin: 0;
      padding: 0.25em;
      list-style: none;
      white-space: nowrap;
    }
  `;

  _handleChange(ev: InputEvent) {
    const target = ev.target as HTMLInputElement;
    this._toggle(target?.checked);
  }

  _toggle(open: boolean) {
    this.open = open;
    this._toggleClickAway(open);
  }

  _toggleClickAway(open: boolean) {
    const clickawayHandler = (ev: MouseEvent) => {
      // Check if the click is outside the dropdown
      if (this.open && !this.contains(ev.target as Node)) {
        this._toggle(false);
        // Remove the event listener after the click outside is detected
        document.removeEventListener("click", clickawayHandler);
      }
    };

    // Add the event listener when the dropdown is opened
    if (open) {
      // Use setTimeout to add the event listener after the current click event finishes,
      // preventing the immediate closing of the dropdown when it is opened.
      setTimeout(() => document.addEventListener("click", clickawayHandler), 0);
    }
}
}