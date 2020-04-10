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
    this.element = document.createElement('table');

    let headersTr =  document.createElement('tr');

    this.headersConfig.forEach(header => {
      let headerTh = document.createElement('th');
      headerTh.textContent = header.title;

      headersTr.append(headerTh);
    });
    
    this.element.append(headersTr);

    this.data.forEach(dataElement => {
      let dataElementTr = document.createElement('tr');
      
      for (let headerIndex = 0; headerIndex < this.headersConfig.length; headerIndex++) {
        let dataElementTd = document.createElement('td');

        if (this.headersConfig[headerIndex].id === 'images') {
          dataElementTd.innerHTML = this.headersConfig[headerIndex].template(dataElement.images);
        } else {
          dataElementTd.textContent = dataElement[this.headersConfig[headerIndex].id];
        }

        dataElementTr.append(dataElementTd);
      }

      this.element.append(dataElementTr);
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

