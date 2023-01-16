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
    logWrapper.classList.toggle("hidden");
    logWrapper.classList.toggle("disappear");
    headerRightBtn.classList.toggle("hidden");
    logSgvChange();
  });
};

export { logBtnClickEvent };
