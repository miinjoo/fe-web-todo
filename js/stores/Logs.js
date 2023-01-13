import { log } from "../components/log.js";

class Logs {
  #columnName;
  #title;
  #action;
  #time;
  $target;
  constructor($target, columnName, title, action) {
    this.#columnName = columnName;
    this.#title = title;
    this.#action = action;
    this.#time = this.generateTime();
    this.$target = $target;
    this.render();
  }

  render() {
    this.$target.insertAdjacentHTML(
      "afterbegin",
      log(this.#columnName, this.#title, this.#action)
    );
  }
}

Logs.prototype.generateTime = () => {
  const time = new Date();
  return time.getHours() * 60 + time.getMinutes();
};

export { Logs };
