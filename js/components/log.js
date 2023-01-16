const log = (where, text = "", action) => {
  const attrs = {
    add: `<strong>${text}</strong>를 새로 <strong>입력</strong>했습니다`,
    remove: `<strong>${text}</strong>를 새로 <strong>삭제</strong>했습니다.`,
    fix: `<strong>${text}</strong>를 새로 <strong>수정</strong>했습니다.`,
  };
  return ` <div class="log-card-wrapper">
        <div class="log-image-wrapper">
          <img src="./assets/user img.png" alt="img" />
        </div>
        <div class="log-text-wrapper">
          <span class="user-name">@sam</span>
          <p class="log-text"><strong>${where}</strong>에 ${attrs[action]}</p>
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
