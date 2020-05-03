// import fetchJson from "../../utils/fetch-json.js";

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class SortableTable {
  element;
  headersConfig = [];
  data = [];
  pageSize = 30;
  sortArrow = {};
  table = null;
  tableHeader = null;
  tableBody = null;
  selectedSortHeaderCell = null;

  constructor(headersConfig = [], {
    url = '',
    isSortLocally = false
  } = {}) {

    this.headersConfig = headersConfig;
    this.url = new URL(url, BACKEND_URL);
    this.isSortLocally = isSortLocally;
    this.headersConfig = headersConfig;

    this.render();
  }

  createTableHeader () {
    this.tableHeader = document.createElement('div');
    this.tableHeader.className="sortable-table__header sortable-table__row";
    this.tableHeader.setAttribute("data-elem", "header");

    this.headersConfig.forEach(headerConf => {
      let headerSortableTableCell = document.createElement('div');
      headerSortableTableCell.setAttribute("data-name", `${headerConf.id}`);
      headerSortableTableCell.className = "sortable-table__cell";
      
      if (headerConf.sortable) {
        headerSortableTableCell.setAttribute("data-sortable", "true");
      }

      headerSortableTableCell.innerHTML = `<span>${headerConf.title}</span><span data-element="arrow" class="sortable-table__sort-arrow"><span class="sort-arrow"></span></span>`;

      this.tableHeader.append(headerSortableTableCell);
    });

    return this.tableHeader;
  }

  createEmptyTableBody () {
    this.tableBody = document.createElement('div');
    this.tableBody.setAttribute("data-elem", "body");
    this.tableBody.className = "sortable-table__body";

    return this.tableBody;
  }

  fillTableBodyWithData () {
    this.tableBody.innerHTML = "";

    if (this.data.length) {
      this.data.forEach((dataElement, dataIndex) => {
        if (this.data[dataIndex].images.length) {
          let sortableTableRow = document.createElement("a");
          sortableTableRow.className = "sortable-table__row";
          sortableTableRow.setAttribute("href", `${this.data[dataIndex].images[0].url}`);
  
          this.headersConfig.forEach((header, headerIndex) => {
            let sortableTableCell = document.createElement("div");
            sortableTableCell.className = "sortable-table__cell";
  
            if (this.headersConfig[headerIndex].id === 'images') {
              let img = document.createElement("img");
              img.className = "sortable-table-image";
              img.setAttribute("alt", "Image");
              img.setAttribute("src", `${this.data[dataIndex].images[0].url}`);
              sortableTableCell.append(img);
            } else {
              sortableTableCell.textContent = dataElement[this.headersConfig[headerIndex].id];
            }
  
            sortableTableRow.append(sortableTableCell);
          });
  
          this.tableBody.append(sortableTableRow);
        }
      });
    } else {
      let emptyPlaceholder = document.createElement('div');
      emptyPlaceholder.setAttribute("data-elem", "emptyPlaceholder");
      emptyPlaceholder.className = "sortable-table__empty-placeholder";
      emptyPlaceholder.innerHTML = "<div><p>No products satisfies your filter criteria</p><button type='button' class='button-primary-outline'>Reset all filters</button></div>"
      
      this.tableBody.append(emptyPlaceholder);
    }
  }

  createEmptyTable() {
    this.table = document.createElement('div');
    this.table.className="sortable-table";

    this.table.append( this.createTableHeader() );
    this.table.append( this.createEmptyTableBody() );

    return this.table;
  }

  render() {
    if (this.element) {
      this.element.innerHTML = "";
      this.fillTableBody();
    } else {
      this.element = document.createElement('div');
      this.element.setAttribute("data-elem", "productsContainer");
      this.element.className="products-list__container";
      
      for (let header of this.headersConfig) {
        if (header.sortable === true) {
          this.element.append(this.createEmptyTable());
          this.addClickEvents();
          this.loadData(header.id, "asc");
          break;
        }
      }
    }
  }

  async loadData (field, order) {
    this.url = new URL(this.url, BACKEND_URL);

    if (this.url.searchParams.has("_embed")) {
      this.url.searchParams.set("_embed", "subcategory.category");
    } else {
      this.url.searchParams.append("_embed", "subcategory.category");
    }

    if (this.url.searchParams.has("_sort")) {
      this.url.searchParams.set("_sort", field);
    } else {
      this.url.searchParams.append("_sort", field);
    }

    if (this.url.searchParams.has("_order")) {
      this.url.searchParams.set("_order", order);
    } else {
      this.url.searchParams.append("_order", order);
    }

    if (this.url.searchParams.has("_start")) {
      this.url.searchParams.set("_start", 0);
    } else {
      this.url.searchParams.append("_start", 0);
    }

    if (this.url.searchParams.has("_end")) {
      this.url.searchParams.set("_end", this.pageSize);
    } else {
      this.url.searchParams.append("_end", this.pageSize);
    }
    
    let response = await fetch(this.url);
    
    if (response.ok) {
      this.data = await response.json();
      this.sortArrow.field = field;
      this.sortArrow.order = order;
      this.fillTableBodyWithData();
    } else {
      alert("Ошибка HTTP: " + response.status);
    } 
  }

  sort (field, order) {
    let headerIndex;
    
    this.headersConfig.forEach((headerConf, index) => {
      if (headerConf.id === field) {
        headerIndex = index;
        return;
      }
    });

    switch (this.headersConfig[headerIndex].sortType) {
      case "number":
        this.sortNumbers(this.data, field, order);
        break;
      
      case "string":
        this.sortStrings(this.data, field, order);
        break;
    
      default:
        break;
    }

    this.sortArrow.field = field;
    this.sortArrow.order = order;

    this.render();
  }

  sortEvent(event) {
    let fieldValue = event.target.parentElement.getAttribute("data-name");
    let orderValue;
    
    if (!this.sortArrow.order || this.sortArrow.order === "desc") {
      orderValue = "asc";
    } else {
      orderValue = "desc";
    }

    if (this.isSortLocally === true) {
      this.sort(fieldValue, orderValue);
    } else {
      this.loadData(fieldValue, orderValue);
    }

    if (this.selectedSortHeaderCell) {
      this.selectedSortHeaderCell.removeAttribute("data-order");
    }

    for (let headerConf of this.headersConfig) {
      if (fieldValue === headerConf.id) {
        let headerSortableTableCell = this.tableHeader.querySelector(`.sortable-table__cell[data-name='${headerConf.id}']`);
        headerSortableTableCell.setAttribute("data-order", `${orderValue}`);

        this.selectedSortHeaderCell = headerSortableTableCell;
        break;       
      }
    }
  }

  addClickEvents() {
    let titles = Array.from(this.element.querySelectorAll(".sortable-table__cell[data-sortable='true']"));
    titles.forEach(title => {
      title.addEventListener('pointerdown', this.sortEvent.bind(this));
    });
  }

  removeClickEvents() {
    let titles = Array.from(this.element.querySelectorAll(".sortable-table__cell[data-sortable='true']"));

    titles.forEach(title => {
      title.removeEventListener('pointerdown', this.sortEvent.bind(this));
    });
  }

  remove() {
    this.sortArrow = {};
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.removeClickEvents();
  }
}
