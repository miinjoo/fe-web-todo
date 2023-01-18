import { makeListCard } from "./template/listItem.js";
import { getListData } from "./dataUtil.js";

const toDoList = document.getElementById("todo"); // 할 일 리스트창
const doingList = document.getElementById("doing"); // 할 일 리스트창
const doneList = document.getElementById("done"); // 할 일 리스트창
const condition = ["todo", "doing", "done"];
const columnName = [toDoList, doingList, doneList];
const CONSTANT = [0, 1, 2];

const showItems = async () => {
  const listData = await getListData();
  listData.map((item) => {
    const card = makeListCard({
      title: item.title,
      detail: item.details,
      id: item.id,
    });
    CONSTANT.filter((ele) => item.status === condition[ele]).map((ele) => {
      columnName[ele].insertAdjacentHTML("beforeend", card);
    });
  });
};

export { showItems };
