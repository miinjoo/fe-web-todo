const log = (where, text, action, to = "") => {
  const LOG_MSG = {
    ADD: `<strong>${where}</strong>에 <strong>${text}</strong>을(를) 새로 <strong>입력</strong>했습니다`,
    REMOVE: `<strong>${where}</strong>에 <strong>${text}</strong>을(를) 새로 <strong>삭제</strong>했습니다.`,
    FIX: `<strong>${where}</strong>에 <strong>${text}</strong>을(를) 새로 <strong>수정</strong>했습니다.`,
    MOVE: `<strong>${where}</strong>에서 <strong>${text}</strong>을(를) <strong>${to}</strong>로 <strong>이동</strong>했습니다.`,
  };
  return ` <div class="log-card-wrapper">
        <div class="log-image-wrapper">
          <img src="./assets/user img.png" alt="img" />
        </div>
        <div class="log-text-wrapper">
          <span class="user-name">@sam</span>
          <p class="log-text">${LOG_MSG[action]}</p>
          <span class="time">1분 전</span>
        </div>
      </div>
        `;
};

const timeCalc = (givenTime) => {
  const calced = currentTime() - givenTime;
  calced === 0 ? "방금전" : calced + "분 전";
};

const currentTime = () => {
  const time = new Date();
  return time.getTime() * 60 + time.getMinutes();
};

export { log };
