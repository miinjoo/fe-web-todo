class Store {
  #datas = [];
  #columnId;
  #cardId;
  constructor() {
    this.#datas = [];
    this.#columnId = 2;
    this.#cardId = 0;
  }

  addItems({ id, standing, title, contents }) {
    const obj = {
      id,
      standing,
      title,
      contents,
      time: generateTime(),
      status: true,
    };
    this.#datas.push(obj);
  }

  findObjectById(id) {
    console.log("argument is : " + id);
    return this.#datas.filter((elem) => {
      elem.id === id;
    });
  }

  removeObjectById(id) {
    this.#datas = this.#datas.filter((ele) => ele.id !== id);
    console.log(this.#datas);
  }

  modifyDataFromEdit(id, title, contents) {
    const idx = this.#datas.findIndex((ele) => ele.id === id);
    this.#datas[idx] = {
      ...this.#datas[idx],
      title,
      contents,
    };
    console.log(this.#datas);
  }

  modifyDataFromDrag(id, standing) {
    const idx = this.#datas.findIndex((ele) => ele.id === id);
    this.#datas[idx] = {
      ...this.#datas[idx],
      standing,
    };
    console.log(this.#datas);
  }

  getDatas() {
    return this.#datas;
  }

  getStandingList(standing) {
    return this.#datas.filter((data) => data.standing === standing);
  }

  updateCardId() {
    this.#cardId = this.#cardId + 1;
  }

  getCardId() {
    return this.#cardId;
  }

  updateColumnId() {
    this.#columnId = this.#columnId + 1;
  }

  getColumnId() {
    return this.#columnId;
  }
  //임시 출력 메소드
  print() {
    console.log(this.#datas);
  }
}

const generateTime = () => {
  const date = new Date();
  return date.getMinutes();
};

export { Store };
