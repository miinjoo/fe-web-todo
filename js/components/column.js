const columnNameInputField = (title) => {
  return `<input type="text" class="colname-fix" required class="card-tittle-input" placeholder="이름을 입력하세요" value="${title}" / >`;
};

const columnNameTag = (title) => {
  return `<h2 class="column-header-title">${title}</h2></h2>`;
};

export { columnNameInputField, columnNameTag };
