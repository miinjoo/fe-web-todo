import {
  getElem,
  getTargetParentByClassName,
  cardCountChecker,
} from "../utils/utils.js";
import { columns } from "../stores/Columns.js";
import { store } from "../init.js";
import { Logs } from "../stores/Logs.js";

const logWrapper = getElem(".log-wrapper");

const dragNdrop = () => {
  const columnsWrapperEl = getElem(".columns-wrapper");
  columnsWrapperEl.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("card-wrapper")) {
      const card = event.target;
      const cardWrapper = card.parentNode;
      const newCard = card.cloneNode(true);
      card.style.opacity = "0.5";
      newCard.style.zIndex = 10000;
      cardWrapper.append(newCard);
      newCard.style.position = "absolute";
      document.body.append(newCard);
      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        newCard.style.left = pageX - newCard.offsetWidth / 2 + "px";
        newCard.style.top = pageY - newCard.offsetHeight / 2 + "px";
      }

      moveAt(event.pageX, event.pageY);

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener("mousemove", onMouseMove);
      newCard.onmouseup = (event) => {
        document.removeEventListener("mousemove", onMouseMove);
        newCard.onmouseup = null;
        const originColumn = getTargetParentByClassName(card, "column-wrapper");
        const originColName = getElem(
          ".column-header-title",
          originColumn
        ).textContent;
        const x = event.pageX - newCard.offsetWidth / 2;
        const columnWidths = columns.getWidths();
        const cardTitle = getElem(".card-title", newCard).innerHTML;
        card.remove();
        for (const col of columnWidths) {
          if (x >= col.startX && x <= col.endX) {
            newCard.style = "";
            const targetColumn = document.getElementById(col.id);
            const targetColName = getElem(
              ".column-header-title",
              targetColumn
            ).innerHTML;
            targetColumn.appendChild(newCard);
            if (targetColName === originColName) return;
            store.modifyDataFromDrag(newCard.id, targetColumn.id);
            new Logs(
              logWrapper,
              originColName,
              cardTitle,
              "MOVE",
              targetColName
            );
            cardCountChecker();
            return;
          }
        }
      };
      document.ondragstart = function () {
        return false;
      };
    }
  });
};

export { dragNdrop };
