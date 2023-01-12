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
  return `
  <div class="card-wrapper" id=${id}>
    <div class="card-left-wrapper">
      <div class="card-header-wrapper">
        <h3 class="card-title">${title}</h3>
      </div>
      <div class="card-text-wrapper">
        <p class="card-text">${text}</p>
      </div>
      <div class="card-footer-wrapper">
        <p class="card-footer-text">author by web</p>
      </div>
    </div>
    <div class="card-right-wrapper">
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
        <button class="card-edit-btn">
          <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
            >
              <path
                      d="M13.7619 2.8366L11.2012 0.262865C11.032 0.0945094 10.803 0 10.5643 0C10.3256 0 10.0967 0.0945094 9.92745 0.262865L0.849572 9.32765L0.0207413 12.9047C-0.00785061 13.0355 -0.00687046 13.171 0.02361 13.3013C0.0540905 13.4316 0.113301 13.5535 0.196917 13.658C0.280533 13.7626 0.386441 13.8471 0.506905 13.9054C0.62737 13.9638 0.759346 13.9945 0.893194 13.9953C0.955562 14.0016 1.0184 14.0016 1.08077 13.9953L4.69709 13.1664L13.7619 4.11038C13.9302 3.94117 14.0247 3.71219 14.0247 3.47349C14.0247 3.2348 13.9302 3.00581 13.7619 2.8366ZM4.26086 12.3812L0.871383 13.0923L1.6435 9.76824L8.43555 3.00237L11.0529 5.61973L4.26086 12.3812ZM11.6375 4.9872L9.02009 2.36984L10.5382 0.860495L13.1119 3.47785L11.6375 4.9872Z"
                      fill="#010101"
              />
          </svg>
        </button>
      </div>
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
  <div class="card-left-wrapper">
              <div class="card-header-wrapper">
                <h3 class="card-title">${title}</h3>
              </div>
              <div class="card-text-wrapper">
                <p class="card-text">${text}</p>
              </div>
              <div class="card-footer-wrapper">
                <p class="card-footer-text">author by web</p>
              </div>
            </div>
            <div class="card-right-wrapper">
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
                <button class="card-edit-btn">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7619 2.8366L11.2012 0.262865C11.032 0.0945094 10.803 0 10.5643 0C10.3256 0 10.0967 0.0945094 9.92745 0.262865L0.849572 9.32765L0.0207413 12.9047C-0.00785061 13.0355 -0.00687046 13.171 0.02361 13.3013C0.0540905 13.4316 0.113301 13.5535 0.196917 13.658C0.280533 13.7626 0.386441 13.8471 0.506905 13.9054C0.62737 13.9638 0.759346 13.9945 0.893194 13.9953C0.955562 14.0016 1.0184 14.0016 1.08077 13.9953L4.69709 13.1664L13.7619 4.11038C13.9302 3.94117 14.0247 3.71219 14.0247 3.47349C14.0247 3.2348 13.9302 3.00581 13.7619 2.8366ZM4.26086 12.3812L0.871383 13.0923L1.6435 9.76824L8.43555 3.00237L11.0529 5.61973L4.26086 12.3812ZM11.6375 4.9872L9.02009 2.36984L10.5382 0.860495L13.1119 3.47785L11.6375 4.9872Z"
                      fill="#010101"
                    />
                  </svg>
                </button>
              </div>
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
