export default class SortableTable {
  element;
  subElements = {};
  headersConfig = [];
  data = [];

  constructor(headersConfig, {
    data = []
  } = {}) {
    this.headersConfig = headersConfig;
    this.data = data;

    this.render();
  }

  render() {
    this.element = document.createElement('div');
    this.element.setAttribute("data-elem", "productsContainer");
    this.element.className="products-list__container";    

    const sortableTable = document.createElement('div');
    sortableTable.className="sortable-table";
    this.element.append(sortableTable);

    const header = document.createElement('div');
    header.className="sortable-table__header sortable-table__row";
    header.setAttribute("data-elem", "header");
    sortableTable.append(header);

    this.headersConfig.forEach(headerConfig => {
      let headerSortableTableCell = document.createElement('div');
      headerSortableTableCell.setAttribute("data-name", `${headerConfig.id}`);
      headerSortableTableCell.className = "sortable-table__cell";
      
      if (headerConfig.sortable) {
        headerSortableTableCell.setAttribute("data-sortable", "");
      }
      
      if (headerConfig.title === "Name") {
        headerSortableTableCell.innerHTML = `<span>${headerConfig.title}</span><span class="sortable-table__sort-arrow_asc"></span></span>`
      } else {
        headerSortableTableCell.innerHTML = `<span>${headerConfig.title}</span>`
      }

      header.append(headerSortableTableCell);
    });

    let body = document.createElement('div');
    body.setAttribute("data-elem", "body");
    body.className = "sortable-table__body";

    this.data.forEach(dataElement => {
      // for (let headerIndex = 0; headerIndex < this.headersConfig.length; headerIndex++) {
      //   let dataElementTd = document.createElement('td');

      //   if (this.headersConfig[headerIndex].id === 'images') {
      //     dataElementTd.innerHTML = this.headersConfig[headerIndex].template(dataElement.images);
      //   } else {
      //     dataElementTd.textContent = dataElement[this.headersConfig[headerIndex].id];
      //   }

      //   body.append(dataElementTd);
      // }

      this.headersConfig.forEach((header, headerIndex) => {
        let sortableTableRow = document.createElement("a");
        sortableTableRow.className = "sortable-table__row";
        // sortableTableRow.setAttribute("href", `${this.data.images.url}`);

        if (this.headersConfig[headerIndex].id === 'images') {
          sortableTableRow.innerHTML = this.headersConfig[headerIndex].template(dataElement.images);
        } else {
          sortableTableRow.textContent = dataElement[this.headersConfig[headerIndex].id];
        }

        body.append(sortableTableRow);
      });

      this.element.append(body);
    });

  }

  sortNumbers () {
    
  }

  sortStrings () {
    
  }

  sort (field, order) {
    let headerIndex;

    this.headersConfig.forEach((headerConfig, index) => {
      if (headerConfig.hasOwnProperty(field)) {
        headerIndex = index;
        return
      }
    });
    
    if (!this.headersConfig[headerIndex].sortable) return;

  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }
}

