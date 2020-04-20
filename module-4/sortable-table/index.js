export default class SortableTable {
  element;
  headersConfig = [];
  data = [];

  constructor(headersConfig, {
    data = []
  } = {}) {
    this.headersConfig = headersConfig;
    this.data = data;

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
        headerSortableTableCell.setAttribute("data-sortable", "");
      }
      
      if (headerConf.title === "Name") {
        headerSortableTableCell.innerHTML = `<span>${headerConf.title}</span><span class="sortable-table__sort-arrow_asc"></span></span>`
      } else {
        headerSortableTableCell.innerHTML = `<span>${headerConf.title}</span>`
      }

      header.append(headerSortableTableCell);
    });

    let body = document.createElement('div');
    body.setAttribute("data-elem", "body");
    body.className = "sortable-table__body";

    this.data.forEach((dataElement, dataIndex) => {
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
    });

    return sortableTable;
  }

  render () {
    if (this.element) {
      this.element.innerHTML = "";
      this.element.append(this.createTable());
      return;
    }
    
    this.element = document.createElement('div');
    this.element.setAttribute("data-elem", "productsContainer");
    this.element.className="products-list__container";
    this.element.append(this.createTable());
  }

  sortNumbers (array, field, order) {
    const makeSorting = (a, b) => {
      if (a[field] > b[field]) return 1; 
      if (a[field] === b[field]) return 0; 
      if (a[field] < b[field]) return -1;
    };

    if (order === "asc") {
      array.sort(makeSorting);
    } else {
      array.sort(makeSorting).reverse();
    }

  }

  sortStrings (array, field, order) {
    const makeSorting = (array, field, order) => {
      return array.sort((a, b) =>
        order * a[field].localeCompare(b[field], 'default', { caseFirst: 'upper' }));
    }

    switch (order) {
      case 'asc':
        return makeSorting(array, field, 1);
      case 'desc':
        return makeSorting(array, field, -1);
      default:
        return makeSorting(array, field, 1);
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

    this.render();

  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

