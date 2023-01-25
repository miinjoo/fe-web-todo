const getTargetParentByClassName = (node, className) => {
  if (node) {
    let current = node;
    while (current !== document.body) {
      if (current.className.includes(className)) return current;
      current = current.parentNode;
    }
    return false;
  }
};

const elementSeparator = (attr) => {
  const firstChar = attr.charAt(0);
  const sliced = attr.slice(1);
  if (firstChar === ".") return { toFind: "class", attr: sliced };
  if (firstChar === "#") return { toFind: "id", attr: sliced };
  return { toFind: "tagname", attr };
};

const getElems = (attributes, start = document.body) => {
  const { toFind, attr } = elementSeparator(attributes);
  const elementsArr = [];
  const queue = [start];
  const visited = {};
  visited[start] = true;
  while (queue.length) {
    for (let i = 0; i < queue.length; i = i + 1) {
      const parent = queue.shift();
      for (const child of parent.children) {
        if (String(child.getAttribute(toFind)).includes(attr))
          elementsArr.push(child);
        else {
          visited[child] = true;
          queue.push(child);
        }
      }
    }
  }
  return elementsArr.length === 0 ? null : elementsArr;
};

const getElem = (attributes, start = document.body) => {
  const { toFind, attr } = elementSeparator(attributes);
  const queue = [start];
  const visited = {};
  visited[start] = true;
  while (queue.length) {
    for (let i = 0; i < queue.length; i = i + 1) {
      const parent = queue.shift();
      for (const child of parent.children) {
        if (String(child.getAttribute(toFind)).includes(attr)) return child;
        else {
          visited[child] = true;
          queue.push(child);
        }
      }
    }
  }
  return null;
};

const deleteNode = (query) => {
  getElem(`${query}`).remove();
};

const addClsssName = (node, className) => {
  node.classList.add(className);
};

const cardCountChecker = () => {
  const columns = document.querySelectorAll(".column-wrapper");
  for (const column of columns) {
    const cardCounts = column.querySelector(".column-header-num");
    const counts = column.querySelectorAll(".card-wrapper").length;
    cardCounts.innerHTML = counts;
  }
};

const cardsBackgroundColorToggle = () => {
  const columnsEl = getElem(".columns-wrapper");
  const cards = getElems(".card-wrapper", columnsEl);
  const cardBtns = getElems(".card-remove-btn");
  cardBtns.concat(getElems(".card-fix-btn"));
  cards.forEach((card) => {
    if (!String(card.getAttribute("class")).includes("clicked")) {
      card.classList.toggle("fadeout-card");
    }
  });
  cardBtns.forEach((btn) => {
    if (
      String(
        getTargetParentByClassName(btn, "card-wrapper")
          .getAttribute("class")
          .includes("fadeout-card")
      )
    ) {
      btn.classList.toggle("fadeout-card");
    }
  });
};

export {
  getTargetParentByClassName,
  deleteNode,
  addClsssName,
  getElem,
  getElems,
  cardsBackgroundColorToggle,
  cardCountChecker,
};
