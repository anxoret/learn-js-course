class Tooltip {
  static instance;

  element;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
  }

  createTooltip(event) {
    if (event.target.hasAttribute("data-tooltip")) {
      let dataTooltip = event.target.getAttribute("data-tooltip");
      Tooltip.instance.render(dataTooltip);
      Tooltip.instance.replaceTooltip(event.offsetX, event.offsetY);
    }
  }

  hideTooltip() {
    Tooltip.instance.removeTooltip();
  }

  removeTooltip() {
    if (this.element) {
      this.element.remove();
      this.element = null;

      document.removeEventListener('pointermove', this.hideTooltip);
    }
  }

  initEventListeners() {
    document.addEventListener("pointerover", this.createTooltip);
    document.addEventListener('pointerout', this.hideTooltip);
  }

  initialize() {
    this.initEventListeners()
  }

  render(dataTooltip) {
    this.element = document.createElement("div");
    this.element.className = "tooltip";
    this.element.textContent = dataTooltip;
    document.body.append(this.element);
  }

  replaceTooltip(offsetX, offsetY) {
    this.element.style.top = offsetY + 10 + "px";
    this.element.style.left = offsetX + 10 + "px";
  }

  destroy() {
    document.removeEventListener('pointerover', this.createTooltip);
    document.removeEventListener('pointerout', this.hideTooltip);
    this.removeTooltip();
  }
}

const tooltip = new Tooltip();

export default tooltip;
