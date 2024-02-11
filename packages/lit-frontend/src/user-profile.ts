// src/user-profiles.ts
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Profile } from "./models/profile";
import { serverPath } from "./rest";

@customElement("user-profile")
export class UserProfileElement extends LitElement {
  @property()
  path: string = "";

  @state()
  profile?: Profile;

  render() {
    return html`
      <div>
        <h1>User Profile</h1>
        <p><strong>User ID:</strong> ${this.profile?.userid}</p>
        <p><strong>Name:</strong> ${this.profile?.name}</p>
        <p><strong>Nickname:</strong> ${this.profile?.nickname}</p>
        <p><strong>Email:</strong> ${this.profile?.email}</p>
    </div>
    `;
  }

  static styles = css`
  :host {
    display: block;
    padding: var(--size-spacing-medium);
    color: var(--text-color-default);
  }

  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--background-color-page);
    border-radius: 10px;
    padding: var(--size-spacing-large);
    margin-top: var(--size-spacing-large);
  }

  .profile-header {
    font-family: 'Handjet', sans-serif;
    color: var(--text-color-header);
    margin-bottom: var(--size-spacing-medium);
  }

  .profile-details {
    text-align: center;
    font-family: 'Workbench', serif;
  }

  .toggle-switch {
    margin-top: var(--size-spacing-large);
  }
`;

  _fetchData(path: string) {
    fetch(serverPath(path))
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json: unknown) => {
          if (json) this.profile = json as Profile;
      });
  }

  connectedCallback() {
    if (this.path) {
      this._fetchData(this.path);
    }
    super.connectedCallback();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
    ) {
    if (name === "path" && oldValue !== newValue && oldValue) {
        this._fetchData(newValue);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
    }
}

@customElement("user-profile-edit")
export class UserProfileEditElement extends UserProfileElement {
  render() {
    return html`<form @submit=${this._handleSubmit}>
        <!-- fill in form here -->
        <button type="submit">Submit</button>
    </form> `;
  }

  static styles = UserProfileElement.styles;

  _handleSubmit(ev: Event) {
    ev.preventDefault(); // prevent browser from submitting form data itself

    const target = ev.target as HTMLFormElement;
    const formdata = new FormData(target);
    const entries = Array.from(formdata.entries())
      .map(([k, v]) => (v === "" ? [k] : [k, v]))
      .map(([k, v]) =>
        k === "airports"
          ? [k, (v as string).split(",").map((s) => s.trim())]
          : [k, v]
      );
    const json = Object.fromEntries(entries);

    this._putData(json);
  }

  _putData(json: Profile) {
    fetch(serverPath(this.path), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json)
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return null;
      })
      .then((json: unknown) => {
        if (json) this.profile = json as Profile;
      })
      .catch((err) =>
        console.log("Failed to PUT form data", err)
      );
  }

}