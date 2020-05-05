export default class RangePicker {
  element;
  selected = {
    from: new Date(),
    to: new Date()
  };
  selectedFromCell = null;
  selectedToCell = null;
  rangePickerCells = [];
  rangePicker = null;

  constructor({
    from = new Date(),
    to = new Date()} = {}
  ) {
    this.showDateFrom = new Date(from);
    this.selected = {from, to};

    this.render();
  }

  createRangePickerCalendar () {

  }

  getDaysInMonth (monthNumber, dateObject) {
    let nextMonthNumber = ++monthNumber;

    let dateObjectCopy = Object.assign(dateObject);
    dateObjectCopy.setMonth(nextMonthNumber);
    dateObjectCopy.setDate(0);

    let daysInFromMonth = dateObjectCopy.getDate();

    return daysInFromMonth;
  }

  getMonthFirstDayNumber (dateObject) {
    let dateObjectCopy = Object.assign(dateObject);
    dateObjectCopy.setDate(0);

    let monthFirstDayNumber = dateObjectCopy.getDay();

    return monthFirstDayNumber++;
  }

  createCalendar (dateObject, isFromDateObject) {
    let rangepickerCalendar = document.createElement("div");
    rangepickerCalendar.className = "rangepicker__calendar";

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

    let monthNumber = dateObject.getMonth();
    let monthName = monthNames[monthNumber];

    rangepickerMonthIndicator.innerHTML = `<time datetime="${monthName}">${monthName}</time>`;
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

    let year = dateObject.getFullYear() + "";
    let month = dateObject.getMonth() + "";
    let day = dateObject.getDate();
    let hours = dateObject.getHours() + "";
    let minutes = dateObject.getMinutes() + "";
    let seconds = dateObject.getSeconds() + "";
    let milliseconds = dateObject.getMilliseconds() + "";

    let daysInMonth = this.getDaysInMonth(monthNumber, dateObject);

    let dateCount = 1;
    let monthFirstDayNumber = this.getMonthFirstDayNumber(dateObject);

    while (daysInMonth) {
      let dateCountStr = dateCount + "";

      let rangepickerCellButton = document.createElement("button");
      rangepickerCellButton.setAttribute("type", "button");
      rangepickerCellButton.setAttribute("data-value", `${year}-${month.length < 2 ? "0" + month : month}-${dateCountStr.length  < 2 ? "0" + dateCountStr : dateCountStr}T${hours.length < 2 ? "0" + hours : hours}:${minutes.length < 2 ? "0" + minutes : minutes}:${seconds.length < 2 ? "0" + seconds : seconds}.${milliseconds.length < 2 ? "0" + milliseconds : milliseconds}Z`);
      
        if (isFromDateObject) {
          if (dateCount === day) {
            rangepickerCellButton.className = "rangepicker__cell rangepicker__selected-from";
            this.selectedFromCell = rangepickerCellButton;

          } else if (dateCount > day) {
            rangepickerCellButton.className = "rangepicker__cell rangepicker__selected-between";

          } else {
            rangepickerCellButton.className = "rangepicker__cell";
          }

        } else {
          if (dateCount === day) {
            rangepickerCellButton.className = "rangepicker__cell rangepicker__selected-to";
            this.selectedToCell = rangepickerCellButton;
          
          } else if (dateCount < day) {
            rangepickerCellButton.className = "rangepicker__cell rangepicker__selected-between";

          } else {
            rangepickerCellButton.className = "rangepicker__cell";
          }
        }
      
      if (dateCount === 1) {
        rangepickerCellButton.setAttribute("style", `--start-from: ${monthFirstDayNumber}`);
      }

      rangepickerCellButton.textContent = dateCount;
      rangepickerDateGrid.append(rangepickerCellButton);
      this.rangePickerCells.push(rangepickerCellButton);

      dateCount++;
      daysInMonth--;
    }

    return rangepickerCalendar;
  }

  getDateStr (dateObject) {
    let year = dateObject.getFullYear() + "";
    let month = dateObject.getMonth() + 1 + "";
    let day = dateObject.getDate() + "";

    year = year.slice(-4, -2);
    month = month.length < 2 ? "0" + month : month;
    day = day.length < 2 ? "0" + day : day;

    return `${month}/${day}/${year}`
  }

  changeRangePickerSelectedDates () {
    let fromSpan = this.element.querySelector("span[data-elem='from']");
    let toSpan = this.element.querySelector("span[data-elem='to']");

    if (this.selectedFromCell !== null) {
      let selectedFromCellData = Date.parse(this.selectedFromCell.getAttribute("data-value"));
      this.selected.from = new Date(selectedFromCellData);
      fromSpan.innerHTML = this.getDateStr(this.selected.from);
    } else {
      fromSpan.innerHTML = "**/**/**";
    }

    if (this.selectedToCell !== null) {
      let selectedToCellData = Date.parse(this.selectedToCell.getAttribute("data-value"));
      this.selected.to = new Date(selectedToCellData);
      toSpan.innerHTML = this.getDateStr(this.selected.to);
    } else {
      toSpan.innerHTML = "**/**/**";
    }
  }

  createRangePicker () {
    this.rangePicker = document.createElement("div");
    this.rangePicker.className = "rangepicker rangepicker_open";

    let rangePickerInput = document.createElement("div");
    rangePickerInput.className = "rangepicker__input";
    rangePickerInput.setAttribute("data-elem", "input");
    rangePickerInput.innerHTML = `<span data-elem="from">${this.getDateStr(this.selected.from)}</span> - <span data-elem="to">${this.getDateStr(this.selected.to)}</span>`;
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
    rangePickerSelector.append(this.createCalendar(this.selected.from, true));
    rangePickerSelector.append(this.createCalendar(this.selected.to, false));

    return this.rangePicker;
  }

  render () {
    this.element = document.createElement("div");
    this.element.className = "container";
    this.element.append(this.createRangePicker());

    this.initEventListeners();
  }

  selectDate (event) {
    if (event.target === this.selectedFromCell) {
      if (this.selectedToCell === null) {
        this.selectedFromCell.classList.remove("rangepicker__selected-from");
        this.selectedFromCell = null;

      } else {
        this.selectedFromCell.classList.remove("rangepicker__selected-from");
        this.selectedToCell.classList.remove("rangepicker__selected-to");

        this.selectedFromCell= this.selectedToCell;
        this.selectedFromCell.classList.add("rangepicker__selected-from");
        this.selectedToCell = null;
  
        this.rangePickerCells.forEach(cell => {
          cell.classList.remove("rangepicker__selected-between");
        });
      }

    } else if (event.target === this.selectedToCell) {
      this.selectedToCell.classList.remove("rangepicker__selected-to");
      this.selectedToCell = null;

      this.rangePickerCells.forEach(cell => {
        cell.classList.remove("rangepicker__selected-between");
      });
    } else {
      let targetDataMs = Date.parse(event.target.getAttribute("data-value")); 
      let selectedFromMs = this.selectedFromCell !== null ? Date.parse(this.selectedFromCell.getAttribute("data-value")) : 0;
      let selectedToMs = this.selectedToCell !== null ? Date.parse(this.selectedToCell.getAttribute("data-value")) : 0;
      
      if (targetDataMs < selectedToMs) {
        if (this.selectedFromCell) {
          this.selectedFromCell.classList.remove("rangepicker__selected-from");
        }

        if (targetDataMs < selectedFromMs) {
          this.selectedToCell.classList.remove("rangepicker__selected-to");
          this.selectedToCell = this.selectedFromCell;
          this.selectedToCell.classList.add("rangepicker__selected-to");
        }

        this.selectedFromCell = event.target;
        event.target.classList.add("rangepicker__selected-from");
      } else if (this.selectedFromCell === null) {
        this.selectedFromCell = event.target;
        event.target.classList.add("rangepicker__selected-from");
      } else if (this.selectedFromCell !== null && this.selectedToCell === null) {
        if (selectedFromMs < targetDataMs) {
          this.selectedToCell = event.target;
          this.selectedToCell.classList.add("rangepicker__selected-to");
        } else {
          this.selectedFromCell.remove("rangepicker__selected-from");
          this.selectedToCell = this.selectedFromCell;
          this.selectedToCell.classList.add("rangepicker__selected-to");

          this.selectedFromCell = event.target;
          this.selectedFromCell.add("rangepicker__selected-from");
        }
      } else {
        if (this.selectedToCell) {
          this.selectedToCell.classList.remove("rangepicker__selected-to");
        }

        if (targetDataMs > selectedToMs && this.selectedToCell !== null) {
          this.selectedFromCell.classList.remove("rangepicker__selected-from");
          this.selectedFromCell = this.selectedFromCell;
          this.selectedFromCell.classList.add("rangepicker__selected-from");
        }

        this.selectedToCell = event.target;
        event.target.classList.add("rangepicker__selected-to");
      }

      selectedFromMs = Date.parse(this.selectedFromCell.getAttribute("data-value"));
      selectedToMs = this.selectedToCell !== null ? Date.parse(this.selectedToCell.getAttribute("data-value")) : 0;

      this.rangePickerCells.forEach(cell => {
        let cellDataMs = Date.parse(cell.getAttribute("data-value")); 

        if (cellDataMs < selectedFromMs || cellDataMs > selectedToMs) {
          cell.classList.remove("rangepicker__selected-between");
        } else if (cellDataMs === selectedFromMs || cellDataMs === selectedToMs) {
          cell.classList.remove("rangepicker__selected-between");
        } else {
          cell.classList.add("rangepicker__selected-between");
        }
      });
    }

    this.changeRangePickerSelectedDates();
  }

  toggleRangePickerSelector () {
    this.rangePicker.classList.toggle("rangepicker_open");
  }

  initEventListeners () {
    this.rangePickerCells.forEach(cell => {
      cell.addEventListener('pointerdown', this.selectDate.bind(this));
    });

    let rangePickerInput = this.element.querySelector(".rangepicker__input");
    rangePickerInput.addEventListener('pointerdown', this.toggleRangePickerSelector.bind(this));
  }

  removeClickEvents() {
    this.rangePickerCells.forEach(cell => {
      cell.removeEventListener('pointerdown', this.selectDate.bind(this));
    });
  }

  remove () {
    this.element.remove ();
  }

  destroy () {
    this.remove();
    this.removeClickEvents();
  }
}