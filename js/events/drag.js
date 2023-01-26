import {
  getElem,
  getTargetParent,
  cardCountChecker,
  getElems,
} from "../utils/utils.js";
import { columns } from "../stores/Columns.js";
import { store } from "../init.js";
import { Logs } from "../stores/Logs.js";
import { NUMBERS } from "../utils/constants.js";
import { addCardDataToServer, refeshJSONdata } from "../utils/fetch.js";

const logWrapper = getElem(".log-wrapper");

const dragNdrop = () => {
  const columnsWrapperEl = getElem(".columns-wrapper");
  columnsWrapperEl.addEventListener("mousedown", (event) => {
    if (!event.target.classList.contains("card-wrapper")) return;

    const card = event.target;
    const cardWrapper = card.parentNode;
    const originColumn = getTargetParent(card, "column-wrapper");
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

    moveAt(newCard, event.pageX, event.pageY);

    function onMouseMove(event) {
      moveAt(newCard, event.pageX, event.pageY);
      const temp = document.querySelector(".afterImage");
      if (temp) temp.remove();
      newCard.style.pointerEvents = "none";
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      newCard.style.pointerEvents = "auto";
      if (!elemBelow) return;

      const column = elemBelow.closest(".column-wrapper");
      if (!column) return;
      const cards = column.querySelectorAll(".card-wrapper");

      if (!cards) {
        column.appendChild(afterImagedCard);
        return;
      }
      calculateCardPosition(event.clientY, column, afterImagedCard, cards);
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
      for (const col of columnWidths) {
        if (x >= col.startX && x <= col.endX) {
          newCard.style = "";
          const targetColumn = document.getElementById(col.id);
          const cardsAvailable = targetColumn.querySelectorAll(".card-wrapper");
          //debugger;
          const targetColName = targetColumn.querySelector(
            ".column-header-title"
          ).innerHTML;

          if (cardsAvailable.length === 0) {
            targetColumn.appendChild(newCard);
            reorderAllCards();
            return;
          }
          calculateCardPosition(
            axis.top,
            targetColumn,
            newCard,
            cardsAvailable
          );

          reorderAllCards();
          if (targetColName === originColName) return;
          store.modifyDataFromDrag(newCard.id, targetColumn.id);
          new Logs(logWrapper, originColName, cardTitle, "MOVE", targetColName);
          cardCountChecker();

          return;
        }
      }
    };
    document.ondragstart = function () {
      return false;
    };
  });
};

const reorderAllCards = async () => {
  const columns = getElems(".column-wrapper");
  await refeshJSONdata();
  //debugger;
  for (const col of columns) {
    const columnStanding = col.getAttribute("id");
    const cards = col.querySelectorAll(".card-wrapper");

    if (cards.length === 0) continue;
    for (const card of cards) {
      const title = card.querySelector(".card-title").innerHTML;
      const text = card.querySelector(".card-text").innerHTML;
      const cardData = {
        standing: columnStanding,
        title,
        text,
      };
      await addCardDataToServer(cardData);
    }
  }
};

function calculateCardPosition(YCoordinate, targetColumn, newCard, cardArr) {
  if (YCoordinate < NUMBERS.BASETOP) {
    targetColumn.insertBefore(newCard, cardArr[0]);
    return;
  }

  if (YCoordinate > NUMBERS.BASETOP + NUMBERS.CARDHEIGHT * cardArr.length) {
    targetColumn.appendChild(newCard);
    return;
  }

  for (let i = 0; i < cardArr.length; i = i + 1) {
    const currentCardHeight =
      NUMBERS.BASETOP + NUMBERS.CARDHEIGHT * i + NUMBERS.CARDHEIGHT / 2;
    if (
      NUMBERS.BASETOP + NUMBERS.CARDHEIGHT * i < YCoordinate &&
      YCoordinate < NUMBERS.BASETOP + NUMBERS.CARDHEIGHT * (i + 1)
    ) {
      if (currentCardHeight < YCoordinate) {
        cardArr[i].after(newCard);
      } else {
        targetColumn.insertBefore(newCard, cardArr[i]);
      }
    }
  }
}

function moveAt(newCard, pageX, pageY) {
  newCard.style.left = pageX - newCard.offsetWidth / 2 + "px";
  newCard.style.top = pageY - newCard.offsetHeight / 2 + "px";
}

export { dragNdrop };
