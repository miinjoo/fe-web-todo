const inputFieldsValidator = (title, text) => {
  if (title === null || title === "" || text === null || text === "") {
    return false;
  }
  return true;
};

export { inputFieldsValidator };
