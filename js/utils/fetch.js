import { getElem, cardCountChecker } from "./utils.js";
import { cardWrapper } from "../components/card.js";
import { SERVER_URL } from "./URL.js";

const CARD_URL = SERVER_URL + "/cards";
const LOGS_URL = SERVER_URL + "/logs";

const addCardDataToServer = async (cardData) => {
  const response = await fetch(CARD_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  });
  return response.ok;
};

const addLogsDataToServer = async (logData) => {
  const response = await fetch(LOGS_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logData),
  });
  return response.ok;
};

const modifyCardDataInServer = async (cardId, cardData) => {
  const url = CARD_URL + `/${cardId}`;
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
  const cardDataResponse = await fetch(CARD_URL, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const cardData = await cardDataResponse.json();
  return cardData;
};

const removeCardDataFromServer = async (cardId) => {
  const url = CARD_URL + `/${cardId}`;
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
  const cardIds = cardData.map((el) => el.id);
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
  cardCountChecker();
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
