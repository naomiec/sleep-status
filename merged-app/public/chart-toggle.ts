import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("chart-toggle")
export class ChartToggleElement extends LitElement {
  @property({ reflect: true, type: Boolean })
  showChart: boolean = false;

  render() {
    console.log("Rendering chart-toggle, showChart:", this.showChart);
    return html`
      <label>
        <span class="label">${this.showChart ? "Chart View" : "Data View"}</span>
        <span class="slider">
          <input type="checkbox" ?checked=${this.showChart} @change=${this._toggleShowChart} />
        </span>
        <slot></slot>
      </label>
    `;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('showChart')) {
      this._toggleChartDisplay();
    }
  }

  _toggleShowChart(ev: Event) {
    const target = ev.target as HTMLInputElement;
    this.showChart = target.checked;
  }

  _toggleChartDisplay() {
    const chartContainer = document.getElementById('chartContainer');
    const dataContainer = document.getElementById('dataContainer');
    if (this.showChart) {
      if (chartContainer) chartContainer.style.display = 'block';
      if (dataContainer) dataContainer.style.display = 'none';
    } else {
      if (chartContainer) chartContainer.style.display = 'none';
      if (dataContainer) dataContainer.style.display = 'block';
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._toggleChartDisplay();
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
      transition: background-color var(--time-transition-control);
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
}