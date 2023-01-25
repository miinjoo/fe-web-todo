import { cardEvents } from "./events/card.js";
import { columnEvents } from "./events/column.js";
import { logBtnClickEvent } from "./events/logBtn.js";
import { modalEvent } from "./events/modal.js";
import { Store } from "./store.js";
import { dragNdrop } from "./events/drag.js";
import { initJSONdata } from "./utils/fetch.js";

const init = () => {
  cardEvents();
  modalEvent();
  dragNdrop();
  columnEvents();
  logBtnClickEvent();
  initJSONdata();
};

export const store = new Store();

init();
