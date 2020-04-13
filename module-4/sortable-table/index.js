export default class SortableTable {
  element;
  subElements = {};
  headersConfig = [];
  data = [];
  sortedBody;

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

      this.element.append(body);
    });

  }

  sortNumbers (field, order) {
    const makeSorting = (a, b) => {
      if (a[field] > b[field]) return 1; 
      if (a[field] == b[field]) return 0; 
      if (a[field] < b[field]) return -1;
    };

    if (order === "asc") {
      this.data.sort(makeSorting);
    } else {
      this.data.sort(makeSorting).reverse();
    }

    this.render();
  }

  sortStrings (array, order) {
    const makeSorting = (array, direction) => {
      return array.sort((a, b) =>
        direction * a.localeCompare(b, 'default', {caseFirst: 'upper'}));
    };

    // switch (order) {
    //   case 'asc':
    //     return makeSorting(array, 1);
    //   case 'desc':
    //     return makeSorting(array, -1);
    //   default:
    //     return makeSorting(array, 1);
  }

  sort (field, order) {
    let headerIndex;

    this.headersConfig.forEach((headerConf, index) => {
      if (headerConf.hasOwnProperty(field)) {
        headerIndex = index;
        return;
      }
    });

    console.log(this.headerIndex);

    switch (this.headersConfig[headerIndex].sortType) {
      case "number":
        sortNumbers(field, order);
        break;
      
      case "string":
        sortStrings(field, order);
        break;
    
      default:
        break;
    }

  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // this.subElements = {};
  }
}

