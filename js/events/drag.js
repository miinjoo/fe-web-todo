import { getElem } from "../utils/utils.js";

const dragNdrop = () => {
  const columnsWrapperEl = getElem(".columns-wrapper");
  columnsWrapperEl.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("card-wrapper")) {
      const ball = event.target;
      const cardWrapper = ball.parentNode;
      const newBall = ball.cloneNode(true);
      ball.style.opacity = "0.5";
      newBall.style.zIndex = 10000;
      cardWrapper.append(newBall);
      newBall.style.position = "absolute";

      document.body.append(newBall);
      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        newBall.style.left = pageX - newBall.offsetWidth / 2 + "px";
        newBall.style.top = pageY - newBall.offsetHeight / 2 + "px";
      }

      moveAt(event.pageX, event.pageY);

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener("mousemove", onMouseMove);
      newBall.onmouseup = (event) => {
        document.removeEventListener("mousemove", onMouseMove);
        newBall.onmouseup = null;
        ball.remove();
        const x = event.pageX - newBall.offsetWidth / 2;
        if (x >= 0 && x <= 390) {
          const secondCol = document.getElementById("0");
          newBall.style = "";
          secondCol.appendChild(newBall);
        }
        if (event.pageX >= 391 && event.pageX <= 700) {
          const secondCol = document.getElementById("1");
          newBall.style = "";
          secondCol.appendChild(newBall);
        }
        if (event.pageX >= 701 && event.pageX <= 1010) {
          const secondCol = document.getElementById("2");
          newBall.style = "";
          secondCol.appendChild(newBall);
        }
      };

      document.ondragstart = function () {
        return false;
      };
    }
  });
};

export { dragNdrop };
