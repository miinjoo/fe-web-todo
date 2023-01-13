import { cardEvents } from "./events/card.js";
import { columnEvents } from "./events/column.js";
import { logBtnClickEvent } from "./events/logBtn.js";
import { modalEvent } from "./events/modal.js";
import { Store } from "./store.js";
import { dragNdrop } from "./events/drag.js";

const init = () => {
  cardEvents();
  modalEvent();
  dragNdrop();
  columnEvents();
  logBtnClickEvent();
};

export const store = new Store();
store.addItems({
  id: "card-1",
  standing: "2",
  title: "card title",
  contents: "add, commit, push",
});
store.print();

init();
