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
      const originColumn = getTargetParentByClassName(card, "column-wrapper");
      const newCard = card.cloneNode(true);
      card.style.opacity = "0.5";
      card.classList.add("afterimage");
      newCard.style.zIndex = 100;
      cardWrapper.append(newCard);
      newCard.style.position = "absolute";

      document.body.append(newCard);
      const afterImagedCard = card.cloneNode(true);
      afterImagedCard.classList.add("afterImage");
      card.remove();
      function moveAt(pageX, pageY) {
        newCard.style.left = pageX - newCard.offsetWidth / 2 + "px";
        newCard.style.top = pageY - newCard.offsetHeight / 2 + "px";
      }

      moveAt(event.pageX, event.pageY);

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
        const temp = document.querySelector(".afterImage");
        if (temp) temp.remove();
        newCard.style.pointerEvents = "none";
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        newCard.style.pointerEvents = "auto";
        if (!elemBelow) return;

        const column = elemBelow.closest(".column-wrapper");
        const cards = column.querySelectorAll(".card-wrapper");

        if (cards.length === 0) {
          column.appendChild(afterImagedCard);
        } else {
          const BASETOP = 131;
          const CARDHEIGHT = 108;
          if (event.clientY < BASETOP) {
            column.insertBefore(afterImagedCard, cards[0]);
          } else if (event.clientY > BASETOP + CARDHEIGHT * cards.length) {
            column.appendChild(afterImagedCard);
          } else {
            for (let i = 0; i < cards.length; i = i + 1) {
              const currentCardHeight =
                BASETOP + CARDHEIGHT * i + CARDHEIGHT / 2;
              if (
                BASETOP + CARDHEIGHT * i < event.clientY &&
                event.clientY < BASETOP + CARDHEIGHT * (i + 1)
              ) {
                if (currentCardHeight < event.clientY) {
                  cards[i].after(afterImagedCard);
                } else {
                  column.insertBefore(afterImagedCard, cards[i]);
                }
              }
            }
          }
        }
      }

      document.addEventListener("mousemove", onMouseMove);
      newCard.onmouseup = (event) => {
        const temp = document.querySelectorAll(".afterImage");
        if (temp) temp.forEach((ele) => ele.remove());
        const axis = newCard.getBoundingClientRect();
        document.removeEventListener("mousemove", onMouseMove);
        newCard.onmouseup = null;

        const originColName = getElem(
          ".column-header-title",
          originColumn
        ).textContent;
        const x = event.pageX - newCard.offsetWidth / 2;
        const columnWidths = columns.getWidths();
        const cardTitle = getElem(".card-title", newCard).innerHTML;
        //card.remove();
        for (const col of columnWidths) {
          if (x >= col.startX && x <= col.endX) {
            newCard.style = "";
            const targetColumn = document.getElementById(col.id);
            const cardsAvailable =
              targetColumn.querySelectorAll(".card-wrapper");
            const targetColName = getElem(
              ".column-header-title",
              targetColumn
            ).innerHTML;
            if (cardsAvailable.length === 0) {
              targetColumn.appendChild(newCard);
            } else {
              const BASETOP = 131;
              const CARDHEIGHT = 108;
              if (axis.top < BASETOP) {
                targetColumn.insertBefore(newCard, cardsAvailable[0]);
              } else if (
                axis.top >
                BASETOP + CARDHEIGHT * cardsAvailable.length
              ) {
                targetColumn.appendChild(newCard);
              } else {
                for (let i = 0; i < cardsAvailable.length; i = i + 1) {
                  const currentCardHeight =
                    BASETOP + CARDHEIGHT * i + CARDHEIGHT / 2;
                  if (
                    BASETOP + CARDHEIGHT * i < axis.top &&
                    axis.top < BASETOP + CARDHEIGHT * (i + 1)
                  ) {
                    if (currentCardHeight < axis.top) {
                      cardsAvailable[i].after(newCard);
                    } else {
                      targetColumn.insertBefore(newCard, cardsAvailable[i]);
                    }
                  }
                }
              }
            }
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
