class Store {
  #datas = [];
  #columnId;
  #cardId;
  constructor() {
    this.#datas = [];
    this.#columnId = 2;
    this.#cardId = 0;
  }

  addItems({ id, standing, title, text }) {
    const obj = {
      id,
      standing,
      title,
      text,
      time: generateTime(),
      status: true,
    };
    this.#datas.push(obj);
  }

  findObjectById(id) {
    return this.#datas.filter((el) => el.id === id);
  }

  removeObjectById(id) {
    this.#datas = this.#datas.filter((el) => el.id !== id);
  }

  modifyDataFromEdit(id, title, text) {
    const idx = this.#datas.findIndex((el) => el.id === id);
    this.#datas[idx] = {
      ...this.#datas[idx],
      title,
      text,
    };
  }

  modifyDataFromDrag(id, standing) {
    const idx = this.#datas.findIndex((el) => el.id === id);
    this.#datas[idx] = {
      ...this.#datas[idx],
      standing,
    };
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
