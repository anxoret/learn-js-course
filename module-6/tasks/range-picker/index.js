export default class RangePicker {
  element;
  subElements = {};
  // TODO: rename "selectingFrom"
  selectingFrom = true;
  selected = {
    from: new Date(),
    to: new Date()
  };
  rangePicker = null;

  constructor({
    from = new Date(),
    to = new Date()} = {}
  ) {
    this.showDateFrom = new Date(from);
    this.selected = {from, to};

    this.render();
  }

  get template() {
    // ...template here
  }

  createRangePickerCalendar() {

  }

  createRangePicker() {
    this.rangePicker = document.createElement("div");
    this.rangePicker.className = "rangepicker rangepicker_open";

    let rangePickerInput = document.createElement("div");
    rangePickerInput.className = "rangepicker__input";
    rangePickerInput.setAttribute("data-elem", "input");
    rangePickerInput.innerHTML = '<span data-elem="from">11/26/19</span> - <span data-elem="to">12/26/19</span>';
    this.rangePicker.append(rangePickerInput);

    let rangePickerSelector = document.createElement("div");
    rangePickerSelector.className = "rangepicker__selector";
    rangePickerSelector.setAttribute("data-elem", "selector");
    this.rangePicker.append(rangePickerSelector);

    let rangePickerSelectorArrow = document.createElement("div");
    rangePickerSelectorArrow.className = "rangepicker__selector-arrow";
    rangePickerSelector.append(rangePickerSelectorArrow);

    let rangePickerSelectorControlLeft = document.createElement("div");
    rangePickerSelectorControlLeft.className = "rangepicker__selector-control-left";
    rangePickerSelector.append(rangePickerSelectorControlLeft);

    let rangePickerSelectorControlRight = document.createElement("div");
    rangePickerSelectorControlRight.className = "rangepicker__selector-control-right";
    rangePickerSelector.append(rangePickerSelectorControlRight);

    // Calendar
    let rangepickerCalendar = document.createElement("div");
    rangepickerCalendar.className = "rangepicker__calendar";
    rangePickerSelector.append(rangepickerCalendar);

    let rangepickerMonthIndicator = document.createElement("div");
    rangepickerMonthIndicator.className = "rangepicker__month-indicator";
    
    let monthNames = [
      "январь" 
      , "февраль"
      , "март"
      , "апрель"
      , "май"
      , "июнь"
      , "июль"
      , "август"
      , "сентябрь"
      , "октябрь"
      , "ноябрь"
      , "декабрь"
    ];

    let fromMonthNumber = this.selected.from.getMonth();
    let fromMonthName = monthNames[fromMonthNumber];

    rangepickerMonthIndicator.innerHTML = `<time datetime="${fromMonthName}">${fromMonthName}</time>`;
    rangepickerCalendar.append(rangepickerMonthIndicator);

    let rangepickerDayOfWeek = document.createElement("div");
    rangepickerDayOfWeek.className = "rangepicker__day-of-week";
    rangepickerCalendar.append(rangepickerDayOfWeek);

    ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].forEach(dayName => {
      let day = document.createElement("div");
      day.textContent = dayName;
      rangepickerDayOfWeek.append(day);
    });

    let rangepickerDateGrid = document.createElement("div");
    rangepickerDateGrid.className = "rangepicker__date-grid";
    rangepickerCalendar.append(rangepickerDateGrid);

    let daysInFromMonth = this.selected.from;
    console.log(daysInFromMonth.getMonth());

    let fromYear = this.selected.from.getFullYear();
    let fromMonth = this.selected.from.getMonth();
    let fromDay = this.selected.from.getDate();
    let fromHour = this.selected.from.getHours();
    let fromMinute = this.selected.from.getMinutes();
    let fromSeconds = this.selected.from.getSeconds();
    let fromMilliseconds = this.selected.from.getMilliseconds();

    let rangepickerCellButton = document.createElement("button");
    rangepickerCellButton.setAttribute("type", "button");
    rangepickerCellButton.setAttribute("data-value", `${fromYear}-${fromMonth}-${fromDay}T${fromHour}:${fromMinute}:${fromSeconds}.${fromMilliseconds}Z`);
    rangepickerCellButton.className = "rangepicker__cell";
    rangepickerCellButton.style.gridColumnStart = "5";
    rangepickerCellButton.textContent = "1";
    rangepickerCalendar.append(rangepickerCellButton);

    return this.rangePicker;
  }

  render() {
    this.element = document.createElement("div");
    this.element.className = "container";
    this.element.append(this.createRangePicker());

    this.initEventListeners();
  }

  getSubElements(element) {
    const subElements = {};

    for (const subElement of element.querySelectorAll('[data-elem]')) {
      subElements[subElement.dataset.elem] = subElement;
    }

    return subElements;
  }

  initEventListeners() {
    // ...logic here
  }

  remove() {
    this.element.remove();
    // ...logic here
  }

  destroy() {
    this.remove();
    // ...logic here
  }
}
