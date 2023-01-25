const addCardDataToServer = async (cardData) => {
  const url = "http://localhost:3000/cards";
  const response = await fetch(url, {
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
  const url = "http://localhost:3000/cards";
  const cardDataResponse = await fetch(url, {
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

export {
  addCardDataToServer,
  modifyCardDataInServer,
  getCardDataFromServer,
  removeCardDataFromServer,
  refeshJSONdata,
};
