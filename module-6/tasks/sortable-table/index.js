import fetchJson from "../../utils/fetch-json.js";

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class SortableTable {
  element;
  headersConfig = [];
  data = [];
  pageSize = 30;
  sortArrow = {};

  onSortClick = event => {
    // ...logic
  };

  constructor(headersConfig = [], {
    url = '',
    // sorted = {
    //   id: headersConfig.find(item => item.sortable).id,
    //   order: 'asc'
    // },
    isSortLocally = false
  } = {}) {

    this.headersConfig = headersConfig;
    this.url = new URL(url, BACKEND_URL);
    this.isSortLocally = isSortLocally;
    this.headersConfig = headersConfig,

    this.render();
  }

  createTable () {
    const sortableTable = document.createElement('div');
    sortableTable.className="sortable-table";

    const header = document.createElement('div');
    header.className="sortable-table__header sortable-table__row";
    header.setAttribute("data-elem", "header");
    sortableTable.append(header);

    this.headersConfig.forEach(headerConf => {
      let headerSortableTableCell = document.createElement('div');
      headerSortableTableCell.setAttribute("data-name", `${headerConf.id}`);
      headerSortableTableCell.className = "sortable-table__cell";
      
      if (headerConf.sortable) {
        headerSortableTableCell.setAttribute("data-sortable", "true");
      }

      if (this.sortArrow.field === headerConf.id) {
        headerSortableTableCell.setAttribute("data-order", `${this.sortArrow.order}`);
      }

      headerSortableTableCell.innerHTML = `<span>${headerConf.title}</span><span data-element="arrow" class="sortable-table__sort-arrow"><span class="sort-arrow"></span></span>`;

      header.append(headerSortableTableCell);
    });

    let body = document.createElement('div');
    body.setAttribute("data-elem", "body");
    body.className = "sortable-table__body";

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

        body.append(sortableTableRow);

        sortableTable.append(body);
      }
    });

    return sortableTable;
  }

  async render() {
    if (this.element) {
      this.element.innerHTML = "";
      this.element.append(this.createTable());
    } else {
      this.element = document.createElement('div');
      this.element.setAttribute("data-elem", "productsContainer");
      this.element.className="products-list__container";
      this.element.append(this.createTable());
    }

    this.addClickEvents();
  }
// products?_embed=subcategory.category&_sort=title&_order=asc&_start=0&_end=30
  async loadData (field, order) {
    console.log(this.url)
    this.url.searchParams.append("_embed", "subcategory.category");
    this.url.searchParams.append("_sort", field);
    this.url.searchParams.append("_order", order);
    this.url.searchParams.append("_start", 0);
    this.url.searchParams.append("_end", this.pageSize);
    console.log(this.url)
    
    let response = await fetch(this.url)
    
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
      this.data = await response.json();
      console.log(this.data)
      this.render();
    } else {
      alert("Ошибка HTTP: " + response.status);
    } 
    
  }

  // initEventListeners () {
  //   this.subElements.header.addEventListener('pointerdown', this.onSortClick);
  // }

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
      this.loadData()
    }
    
  }

  addClickEvents() {
    let titles = Array.from(this.element.querySelectorAll(".sortable-table__cell[data-sortable='true']"));

    titles.forEach(title => {
      title.addEventListener('click', this.sortEvent.bind(this));
    });
  }

  removeClickEvents() {
    let titles = Array.from(this.element.querySelectorAll(".sortable-table__cell[data-sortable='true']"));

    titles.forEach(title => {
      title.removeEventListener('click', this.sortEvent.bind(this));
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
