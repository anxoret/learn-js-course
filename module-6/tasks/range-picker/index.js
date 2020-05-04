export default class RangePicker {
  element;
  subElements = {};
  // TODO: rename "selectingFrom"
  selectingFrom = true;
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

  // get template() {
  //   // ...template here
  // }

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
            // this.selectedBetweenCells.push(rangepickerCellButton);

          } else {
            rangepickerCellButton.className = "rangepicker__cell";
          }

        } else {
          if (dateCount === day) {
            rangepickerCellButton.className = "rangepicker__cell rangepicker__selected-to";
            this.selectedToCell = rangepickerCellButton;
          
          } else if (dateCount < day) {
            rangepickerCellButton.className = "rangepicker__cell rangepicker__selected-between";
            // this.selectedBetweenCells.push(rangepickerCellButton);

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

  createRangePicker () {
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
    console.log(event.target)

    if (event.target === this.selectedFromCell) {
      this.selectedFromCell.classList.remove("rangepicker__selected-from");
      this.selectedFromCell = null;

      this.rangePickerCells.forEach(cell => {
        cell.classList.remove("rangepicker__selected-between");
      });

    } else if (event.target === this.selectedToCell) {
      this.selectedToCell.classList.remove("rangepicker__selected-to");
      this.selectedToCell = null;

      this.rangePickerCells.forEach(cell => {
        cell.classList.remove("rangepicker__selected-between");
      });

    } else {
      let targetDataMs = Date.parse(event.target.getAttribute("data-value")); 
      let selectedFromMs = Date.parse(this.selectedFromCell.getAttribute("data-value"));
      let selectedToMs = Date.parse(this.selectedToCell.getAttribute("data-value"));
      
      if (targetDataMs - selectedFromMs < 0) {
        let selectedFromCellPreviousSibling = this.selectedFromCell.previousSibling;

        while (selectedFromCellPreviousSibling !== event.target) {
          selectedFromCellPreviousSibling.classList.add("rangepicker__selected-between");
          // this.selectedBetweenCells.push(selectedFromCellPreviousSibling);

          selectedFromCellPreviousSibling = selectedFromCellPreviousSibling.previousSibling;
        }

        this.selectedFromCell.classList.remove("rangepicker__selected-from");
        this.selectedFromCell.classList.add("rangepicker__selected-between");
        this.selectedFromCell = event.target;
        event.target.classList.add("rangepicker__selected-from");

      // } else if (targetDataMs - selectedFromMs > 0 && targetDataMs - selectedToMs < 0) {
        // let selectedFromCellNextSibling = this.selectedFromCell.nextSibling;

        // console.log(selectedFromCellNextSibling)

        // while (selectedFromCellNextSibling !== event.target) {
        //   selectedFromCellNextSibling.classList.remove("rangepicker__selected-between");
        //   // this.selectedBetweenCells.push(selectedFromCellNextSibling);

        //   selectedFromCellNextSibling = selectedFromCellNextSibling.nextSibling;
        // }

        // this.selectedFromCell.classList.remove("rangepicker__selected-from");
        // this.selectedFromCell = event.target;
        // event.target.classList.remove("rangepicker__selected-between");
        // event.target.classList.add("rangepicker__selected-from");
        
        // this.rangePickerCells.forEach(cell => {
        //   let cellDataMs = Date.parse(cell.getAttribute("data-value")); 
        //   if (cellDataMs - selectedFromMs < 0 || selectedToMs - cellDataMs < 0) {
        //     cell.classList.remove("rangepicker__selected-between");
        //   }

        // });
      }
      

    }
  }

  initEventListeners () {
    let rangepickerCells = Array.from(this.element.querySelectorAll(".rangepicker__cell"));

    rangepickerCells.forEach(cell => {
      cell.addEventListener('pointerdown', this.selectDate.bind(this));
    });
  }

  remove () {
    this.element.remove ();
    // ...logic here
  }

  destroy () {
    this.remove();
    // ...logic here
  }
}
// rangepicker__selected-from