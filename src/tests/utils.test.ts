import { getMonth, formatData, validateForm } from "../utils/utils";

it("Ф-я возвращает месяц в формате ммм", () => {
  expect(getMonth(new Date("Jan 01 2021 00:00:01"))).toBe("янв");
  expect(getMonth(new Date("Mar 01 2021 00:36:00"))).toBe("мар");
  expect(getMonth(new Date("Dec 31 2021 23:59:59"))).toBe("дек");
});

it("Ф-я возвращает дату-время в заданном формате", () => {
  expect(formatData(Date.now())).toBe(
    `${new Date().getHours().toString().padStart(2, "0")}:${new Date()
      .getMinutes()
      .toString()
      .padStart(2, "0")}`
  );
  expect(formatData(Date.parse("Nov 1, 2021 15:20:11"))).toBe("1 ноя 15:20");
  expect(formatData(Date.parse("Nov 1, 2011 15:20:11"))).toBe(
    "1 ноя 2011г. 15:20"
  );
});

it("Ф-я возвращает состояние валидированности форм", () => {
  expect(
    validateForm(
      "",
      "",
      [
        {
          id: 807912000000,
          name: "Навзвание",
          description: "Описание",
          date: 807912000000,
        },
      ],
      [
        {
          id: 807998400000,
          name: "Навзвание выполненой задачи",
          description: "Описание выполненой задачи",
          date: 807998400000,
        },
      ]
    )
  ).toStrictEqual({
    isValid: false,
    nameIsValid: false,
    descriptionIsValid: false,
  });
  expect(
    validateForm(
      "Заметка",
      "",
      [
        {
          id: 807912000000,
          name: "Навзвание",
          description: "Описание",
          date: 807912000000,
        },
      ],
      [
        {
          id: 807998400000,
          name: "Навзвание выполненой задачи",
          description: "Описание выполненой задачи",
          date: 807998400000,
        },
      ]
    )
  ).toStrictEqual({
    isValid: false,
    nameIsValid: true,
    descriptionIsValid: false,
  });
  expect(
    validateForm(
      "",
      "Не хочу ничего описывать",
      [
        {
          id: 807912000000,
          name: "Навзвание",
          description: "Описание",
          date: 807912000000,
        },
      ],
      [
        {
          id: 807998400000,
          name: "Навзвание выполненой задачи",
          description: "Описание выполненой задачи",
          date: 807998400000,
        },
      ]
    )
  ).toStrictEqual({
    isValid: false,
    nameIsValid: false,
    descriptionIsValid: true,
  });
  expect(
    validateForm(
      "Навзвание",
      "Не хочу ничего описывать",
      [
        {
          id: 807912000000,
          name: "Навзвание",
          description: "Описание",
          date: 807912000000,
        },
      ],
      [
        {
          id: 807998400000,
          name: "Навзвание выполненой задачи",
          description: "Описание выполненой задачи",
          date: 807998400000,
        },
      ]
    )
  ).toStrictEqual({
    isValid: false,
    nameIsValid: false,
    descriptionIsValid: true,
  });
  expect(
    validateForm(
      "Навзвание выполненой задачи",
      "Не хочу ничего описывать",
      [
        {
          id: 807912000000,
          name: "Навзвание",
          description: "Описание",
          date: 807912000000,
        },
      ],
      [
        {
          id: 807998400000,
          name: "Навзвание выполненой задачи",
          description: "Описание выполненой задачи",
          date: 807998400000,
        },
      ]
    )
  ).toStrictEqual({
    isValid: false,
    nameIsValid: false,
    descriptionIsValid: true,
  });
  expect(
    validateForm(
      "Новое навзвание",
      "Не хочу ничего описывать",
      [
        {
          id: 807912000000,
          name: "Навзвание",
          description: "Описание",
          date: 807912000000,
        },
      ],
      [
        {
          id: 807998400000,
          name: "Навзвание выполненой задачи",
          description: "Описание выполненой задачи",
          date: 807998400000,
        },
      ]
    )
  ).toStrictEqual({
    isValid: true,
    nameIsValid: true,
    descriptionIsValid: true,
  });
});
