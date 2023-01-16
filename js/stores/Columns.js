class Columns {
  #cols;
  #widths;
  constructor() {
    this.#cols = [];
    this.#widths = [];
  }

  addCol(id) {
    const columnObj = {
      id,
    };
    this.#cols.push(columnObj);
    this.updateColumnWidth();
  }

  removeCol(id) {
    const parsedId = parseInt(id);
    this.#cols = this.#cols.filter((ele) => ele.id !== parsedId);
    const numOfColumns = this.#cols.length;
    this.#widths.splice(numOfColumns, 1);
    this.updateColumnWidth();
  }

  updateColumnWidth() {
    const numOfColumns = this.#cols.length;
    this.#widths = [];
    const WIDTH = 300;
    const DISTINGUISHER = 1;
    for (let i = 0; i < numOfColumns; i = i + 1) {
      if (i === 0) {
        this.#widths.push({
          id: 0,
          startX: 0,
          endX: 380,
        });
      } else {
        this.#widths.push({
          id: i,
          startX: parseInt(this.#widths[i - 1].endX + DISTINGUISHER),
          endX: parseInt(this.#widths[i - 1].endX + WIDTH),
        });
      }
    }
  }

  getWidths() {
    return this.#widths;
  }

  print() {
    console.log(this.#cols);
    console.log(this.#widths);
  }
}

const columns = new Columns();
columns.addCol(0);
columns.addCol(1);
columns.addCol(2);

export { columns };
