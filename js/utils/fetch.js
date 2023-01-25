import { getElem } from "./utils.js";
import { cardWrapper } from "../components/card.js";

const cardUlr = "http://localhost:3000/cards";
const logsUlr = "http://localhost:3000/logs";

const addCardDataToServer = async (cardData) => {
  const response = await fetch(cardUlr, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  });
  return response.ok;
};

const modifyCardDataInServer = async (cardId, cardData) => {
  const url = `http://localhost:3000/cards/${cardId}`;
  const response = await fetch(url, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  });
  return response.ok;
};

const getCardDataFromServer = async () => {
  const cardDataResponse = await fetch(cardUlr, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const cardData = await cardDataResponse.json();
  return cardData;
};

const removeCardDataFromServer = async (cardId) => {
  const url = `http://localhost:3000/cards/${cardId}`;
  const response = await fetch(url, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = response.json();
  return data;
};

const refeshJSONdata = async () => {
  const cardData = await getCardDataFromServer();
  const cardIds = cardData.map((ele) => ele.id);
  cardIds.forEach((id) => removeCardDataFromServer(id));
};

const initJSONdata = async () => {
  const cardDataFromServer = await getCardDataFromServer();
  for (const card of cardDataFromServer) {
    const targetColumn = getElem(`#${+card.standing}`);
    targetColumn.innerHTML += cardWrapper({
      title: card.title,
      text: card.text,
      id: "card-" + card.id,
    });
  }
};

export {
  addCardDataToServer,
  addLogsDataToServer,
  modifyCardDataInServer,
  getCardDataFromServer,
  removeCardDataFromServer,
  refeshJSONdata,
  initJSONdata,
};
