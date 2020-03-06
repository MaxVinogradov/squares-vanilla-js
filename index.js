class TableProcessor {

  static #instance;

  #table;
  #removeColumnButton;
  #removeRowButton;
  #addRowButton;
  #addColumnButton;

  static getInstance() {
    if (!TableProcessor.instance)
      TableProcessor.instance = new TableProcessor();
    return TableProcessor.instance;
  }

  constructor() {
    if (TableProcessor.instance) {
      throw new Error('Cannot construct singleton');
    }
    this.#table = document.querySelector('#main-table');
    this.#removeColumnButton = document.querySelector('#remove-column-button');
    this.#removeRowButton = document.querySelector('#remove-row-button');
    this.#addRowButton = document.querySelector('#add-row-button');
    this.#addColumnButton = document.querySelector('#add-column-button');
    this.generateDefaultTable();
    this.#addRowButton.addEventListener('click', this.addRow.bind(this))
    this.#addColumnButton.addEventListener('click', this.addColumn.bind(this))
    this.#removeRowButton.addEventListener('click', this.removeRow.bind(this))
    this.#removeColumnButton.addEventListener('click', this.removeColumn.bind(this))
  } 

  generateDefaultTable() {
    console.log('this.DEFAULT_ROW_NUMBER', this.DEFAULT_ROW_NUMBER)
    for (let i = 0; i < this.DEFAULT_ROW_NUMBER; i++) {
      this.addRow();
    }
  }

  removeRow(index) {
    if (this.rowsNumber > 1) {
      this.#table.deleteRow(0)	
    }
  }

  removeColumn() {
    if (this.cellsNumber > 1) {
      for (let row of this.#table.rows) {
        row.deleteCell(0);
      }
    }
  }

  addRow() {
    const createdRow = this.#table.insertRow();
    const n = this.cellsNumber || this.DEFAULT_COL_NUMBER;
    for (let i = 0; i < n; i++) {
      createdRow.insertCell(i);
    }
  }

  addColumn() {
    const newCellIndex = this.cellsNumber;
    for (let row of this.#table.rows) {
      row.insertCell(newCellIndex);
    }
  }

  get DEFAULT_ROW_NUMBER() {
    return 4;
  };

  get DEFAULT_COL_NUMBER() {
    return 4;
  };

  get rowsNumber() {
    return this.#table.rows.length;
  }

  get cellsNumber() {
    return this.#table.rows.item(0) ? this.#table.rows.item(0).cells.length : 0;
  }
}


TableProcessor.getInstance();