const newCardWrapper = ({ id = "", title = "", text = "" }) => {
  return `<div class="new-card-wrapper" id=${id}>
      <input type="text" required class="card-tittle-input" placeholder="제목을 입력하세요" value=${title} >
      <input type="text" required class="card-text-input" placeholder="내용을 입력하세요" value=${text} >
      <div class="card-btn-wrapper">
        <button class="card-cancel-btn">취소</button>
        <button class="card-add-btn">등록</button>
      </div>
    </div>`;
};

const cardWrapper = ({ title, text, id }) => {
  return `<div class="card-wrapper" id=${id}>
      <div class="card-header-wrapper">
        <h3 class="card-title">${title}</h3>
        <div class="card-remove-btn-wrapper">
          <button class="card-remove-btn">
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
                      fill="#BDBDBD"
                    />
                  </svg>
          </button>
        </div>
      </div>
      <div class="card-text-wrapper">
        <p class="card-text">${text}</p>
      </div>
      <div class="card-footer-wrapper">
        <p class="card-footer-text">author by web</p>
      </div>
    </div>`;
};

const fixCardWrapper = ({ title = "", text = "" }) => {
  return `<input type="text" class="card-tittle-input" placeholder="제목을 입력하세요" value=${title}>
      <input type="text" class="card-text-input" placeholder="내용을 입력하세요" value=${text}>
      <div class="card-btn-wrapper">
        <button class="card-fix-cancel-btn">취소</button>
        <button class="card-fix-add-btn">등록</button>
      </div>`;
};

const fixedWrapper = ({ title = "", text = "" }) => {
  return `
  <div class="card-header-wrapper">
    <h3 class="card-title">${title}</h3>
    <div class="card-remove-btn-wrapper">
      <button class="card-remove-btn"></button>
    </div>
  </div>
  <div class="card-text-wrapper">
    <p class="card-text">${text}</p>
  </div>
  <div class="card-footer-wrapper">
    <p class="card-footer-text">author by web</p>
  </div>
  `;
};

const newColumn = ({ id = "none", title = "냉무" }) => {
  return `
  <div class="column-wrapper" id="${id}">
    <div class="column-header-wrapper">
      <div class="column-header-left-wrapper">
        <h2 class="column-header-title">${title}</h2>
        <span class="column-header-num">0</span>
      </div>
      <div class="column-header-right-wrapper">
        <button class="column-add-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M0.105713 7.53033L0.105713 6.46967H6.46967V0.105713H7.53033V6.46967H13.8943V7.53033H7.53033V13.8943H6.46967V7.53033H0.105713Z"
                    fill="#BDBDBD"
                  />
                </svg>
              </button>
              <button class="column-remove-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
                    fill="#BDBDBD"
                  />
                </svg>
              </button>
      </div>
    </div>
  </div>
  `;
};

export { newCardWrapper, cardWrapper, newColumn, fixCardWrapper, fixedWrapper };
