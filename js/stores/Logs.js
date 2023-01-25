import { log } from "../components/log.js";
import { addLogsDataToServer } from "../utils/fetch.js";

class Logs {
  #columnName;
  #title;
  #action;
  #time;
  #from;
  #to;
  $target;
  constructor($target, columnName, title, action, from = "") {
    this.#columnName = columnName;
    this.#title = title;
    this.#action = action;
    this.#from = from;
    this.#time = this.generateTime();
    this.$target = $target;
    this.render();
    this.saveOnServer();
  }

  render() {
    this.$target.insertAdjacentHTML(
      "afterbegin",
      log(this.#columnName, this.#title, this.#action, this.#from, this.#to)
    );
  }

  saveOnServer() {
    const logData = {
      title: this.#title,
      action: this.#action,
      standing: this.#columnName,
      from: this.#from,
      to: this.#to,
    };
    addLogsDataToServer(logData);
  }
}

Logs.prototype.generateTime = () => {
  const time = new Date();
  return time.getHours() * 60 + time.getMinutes();
};

export { Logs };
