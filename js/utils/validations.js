const inputFieldsValidator = (newCardInfor) => {
  if (
    newCardInfor.title === null ||
    newCardInfor.title === "" ||
    newCardInfor.text === null ||
    newCardInfor.text === ""
  ) {
    return false;
  }
  return true;
};

export { inputFieldsValidator };
