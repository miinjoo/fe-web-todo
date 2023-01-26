import { getElem } from "../utils/utils.js";
import { cancel, threeBars } from "../components/rightBtn.js";

const logWrapper = getElem(".log-wrapper");
const headerRightBtn = getElem(".chat-menu-btn");

const logSgvChange = () => {
  if (headerRightBtn.getAttribute("class").includes("hidden")) {
    headerRightBtn.innerHTML = cancel();
  } else {
    headerRightBtn.innerHTML = threeBars();
  }
};

const logBtnClickEvent = () => {
  headerRightBtn.addEventListener("click", () => {
    console.log(logWrapper.classList);
    logWrapper.classList.toggle("hidden");
    headerRightBtn.classList.toggle("hidden");
    logSgvChange();
  });
};

export { logBtnClickEvent };
