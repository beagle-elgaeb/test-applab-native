import { TaskItem } from "../redux/types";

const names = [
  "янв",
  "фев",
  "мар",
  "апр",
  "май",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек",
];

export function getMonth(date: Date) {
  return names[date.getMonth()];
}

// Ф-я handlerData возвращает дату-время:
// в формате "ЧЧ:ММ", если задача создана сегодня
// в формате "Д МММ ЧЧ:ММ", если задача создана в течение года
// в формате "Д МММ ГГГГ ЧЧ:ММ", если задача старше года
export function formatData(timestamp: number) {
  const now = new Date();

  const dayNow = now.getDate().toString();
  const monthNow = getMonth(now);
  const yearNow = now.getFullYear();
  const dateNow = `${dayNow} ${monthNow} ${yearNow}`;

  const date = new Date(timestamp);

  const day = date.getDate().toString();
  const month = getMonth(date);
  const hours = date.getHours().toString().padStart(2, "0");
  const minuts = date.getMinutes().toString().padStart(2, "0");
  const year = date.getFullYear();
  const yearStr = date.getFullYear().toString();
  const dateCard = `${day} ${month} ${year}`;

  let dateTask;

  if (dateNow === dateCard) {
    dateTask = `${hours}:${minuts}`;
  } else if (yearNow - year <= 1) {
    dateTask = `${day} ${month} ${hours}:${minuts}`;
  } else {
    dateTask = `${day} ${month} ${yearStr}г. ${hours}:${minuts}`;
  }

  return dateTask;
}

// Ф-я handleValidation возвращает состояние валидированности:
// для поля ввода названия задачи, если оно не пустое, не превышает 20 символов, уникальное
// для поля ввода описания задачи, если оно не пустое, не превышает 70 символов
// для обоих полей, если они оба валидны
export function validateForm(
  name: string,
  description: string,
  tasks: TaskItem[],
  tasksDone: TaskItem[],
  currentTask?: TaskItem
) {
  let isValid = true;
  let nameIsValid = true;
  let originalName = true;
  let descriptionIsValid = true;

  const sameNameTask =
    tasks.find((task) => task.name === name) ??
    tasksDone.find((task) => task.name === name);

  if (!!sameNameTask) {
    if (!!currentTask) {
      originalName = sameNameTask.id === currentTask.id;
    } else {
      originalName = false;
    }
  }

  if (name.length === 0 || name.length > 20 || originalName !== true) {
    nameIsValid = false;
  }

  if (description.length === 0 || description.length > 70) {
    descriptionIsValid = false;
  }

  if (nameIsValid !== true || descriptionIsValid !== true) {
    isValid = false;
  }

  return { isValid, nameIsValid, descriptionIsValid };
}
