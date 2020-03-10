class TableProcessor {

  static #instance;

  #table;
  #removeColumnButton;
  #removeRowButton;
  #addRowButton;
  #addColumnButton;
  #itemSize;
  #columnIndex = 0;
  #rowIndex = 0;


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
    this.#itemSize = getComputedStyle(document.body)
      .getPropertyValue('--item-size');
    this.#itemSize = parseInt(this.#itemSize);
    this.generateDefaultTable();
    this.#addRowButton.addEventListener('click', this.addRow);
    this.#addColumnButton.addEventListener('click', this.addColumn);
    this.#removeRowButton.addEventListener('click', this.removeRow);
    this.#removeColumnButton.addEventListener('click', this.removeColumn);
    this.#table.addEventListener('mouseover', this.showButtonOnMouseOverTable);
    this.#table.addEventListener('mouseleave', this.hideButtonOnMouseLeaveTableOrButton);
    this.#removeRowButton.addEventListener('mouseleave', this.hideButtonOnMouseLeaveTableOrButton);
    this.#removeColumnButton.addEventListener('mouseleave', this.hideButtonOnMouseLeaveTableOrButton);
  }

  generateDefaultTable() {
    for (let i = 0; i < this.DEFAULT_ROW_NUMBER; i++) {
      this.addRow();
    }
  }

  showButtonOnMouseOverTable = (event) => {
    console.log(event)
    if (!(event.target instanceof HTMLTableCellElement)) return;
    const { 
      target: { 
        cellIndex: columnIndex,
        parentNode: { rowIndex },
        offsetTop,
        offsetLeft,
      },
    } = event;
    this.#columnIndex = columnIndex;
    this.#rowIndex = rowIndex;
    if (this.#table.rows.length !== 1) {
      this.#removeRowButton.style.visibility = 'visible';
      this.#removeRowButton.style.top = `${offsetTop}px`;
    };
    if (this.#table.rows[0].cells.length !== 1) {
      this.#removeColumnButton.style.visibility = 'visible';
      this.#removeColumnButton.style.left =  `${offsetLeft}px`;
    };
  }

  hideButtonOnMouseLeaveTableOrButton = (event) => {
    const isMouseMovedOnButton = event.relatedTarget.classList.contains('remove-button') ||
      (event.relatedTarget.parentElement && event.relatedTarget.parentElement.classList.contains('remove-button'));
    const isMouseMovedFromTable = event.target.id === 'main-table';
    if (isMouseMovedFromTable && isMouseMovedOnButton) return;
    this.hideRemoveButtons();
  }

  hideRemoveButtons() {
    this.#removeRowButton.style.visibility = 'hidden';
    this.#removeColumnButton.style.visibility = 'hidden';
  }

  removeRow = () => {
    if (this.rowsNumber > 1) {
      this.#table.deleteRow(this.#rowIndex)	
    }
    this.hideRemoveButtons();
  }

  removeColumn = () => {
    if (this.cellsNumber > 1) {
      for (let row of this.#table.rows) {
        row.deleteCell(this.#columnIndex);
      }
    }
    this.hideRemoveButtons();
  }

  addRow = () => {
    const createdRow = this.#table.insertRow();
    const n = this.cellsNumber || this.DEFAULT_COL_NUMBER;
    for (let i = 0; i < n; i++) {
      createdRow.insertCell(i);
    }
  }

  addColumn = () => {
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