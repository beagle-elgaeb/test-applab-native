import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { addTask } from "../redux/toDoSlise";
import { ReduxState } from "../redux/types";
import * as api from "../utils/api";
import { validateForm } from "../utils/utils";
import Card from "./Card";

function Main() {
  // Управление инпутами
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(text: string) {
    setName(text);
  }

  function handleChangeDescription(text: string) {
    setDescription(text);
  }

  // Состояние инпутов
  const [focusIsLost, setFocusIsLost] = useState(false);

  function lossFocus() {
    setFocusIsLost(true);
  }

  // Использование данных из стейта
  const { tasks, tasksDone } = useSelector((state: ReduxState) => state.toDo);

  // Передача данных в стейт
  const dispatch = useDispatch();

  function handleSubmit() {
    if (!name || !description) {
      return;
    }

    dispatch(addTask({ name, description }));
    setName("");
    setDescription("");
    setFocusIsLost(false);
  }

  const checkValidation = validateForm(name, description, tasks, tasksDone);

  // Получение реального времени
  const [currentTime, setCurrentTime] = useState("");

  async function getDateTime() {
    try {
      const dateTime = await api.getCurrentTime();

      setCurrentTime(
        `${dateTime.slice(11, 16)}  ${dateTime.slice(8, 10)}.${dateTime.slice(
          5,
          7
        )}.${dateTime.slice(0, 4)} г.`
      );
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    getDateTime();

    const timer = setInterval(() => {
      getDateTime();
    }, 60000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Container>
      <Form>
        <Input
          value={name}
          placeholder="Название - от 1 до 20 символов и уникальное"
          onChangeText={handleChangeName}
          onBlur={lossFocus}
          maxLength={20}
          valid={!!focusIsLost ? checkValidation.nameIsValid : true}
          plhldrVsble={!name}
        />
        <Input
          value={description}
          placeholder="Описание - от 1 до 70 символов"
          onChangeText={handleChangeDescription}
          onBlur={lossFocus}
          maxLength={70}
          valid={!!focusIsLost ? checkValidation.descriptionIsValid : true}
          plhldrVsble={!description}
        />

        <CurrentTimeAndButtonSubmit>
          <CurrentTime>{currentTime}</CurrentTime>

          <ButtonSubmit
            onPress={handleSubmit}
            disabled={!!focusIsLost ? !checkValidation.isValid : false}
          >
            <ButtonSubmitText
              disabled={!!focusIsLost ? !checkValidation.isValid : false}
            >
              Добавить
            </ButtonSubmitText>
          </ButtonSubmit>
        </CurrentTimeAndButtonSubmit>
      </Form>

      {tasks.map((task, i) => (
        <Card key={task.id} task={task} done={false} />
      ))}

      {tasksDone.map((task, i) => (
        <Card key={task.id} task={task} done={true} />
      ))}
    </Container>
  );
}

export default Main;

const Container = styled.View`
  width: 90%;
  margin: 0 auto;
`;

const Form = styled.View``;

const Input = styled.TextInput.attrs({
  placeholderTextColor: "#a0ba0280",
})<{ valid: boolean; plhldrVsble: boolean }>`
  width: 100%;
  height: 30px;
  background: transparent;
  box-sizing: border-box;
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ valid }) => (valid ? "#a0ba0250" : "#D3366E50")};
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: ${({ valid }) => (valid ? "#a0ba0250" : "#D3366E50")};
  border-radius: 5px;
  outline-width: 0;
  font-size: ${({ plhldrVsble }) => (plhldrVsble ? "13px" : "16px")};
  line-height: 18px;
  font-weight: 300;
  text-transform: ${({ plhldrVsble }) => (plhldrVsble ? "lowercase" : "none")};
  color: #a0ba02;
  margin: 10px 0 0 0;
  padding: 0 10px 0 10px;
`;

const CurrentTimeAndButtonSubmit = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CurrentTime = styled.Text`
  font-size: 16px;
  line-height: 30px;
  font-weight: 300;
  font-style: italic;
  color: #7d8b24;
  margin: 10px 0 0 0;
`;

const ButtonSubmit = styled.TouchableOpacity<{ disabled: boolean }>`
  width: 50%;
  height: 30px;
  background: #a0ba0210;
  box-sizing: border-box;
  border-width: ${({ disabled }) => (disabled ? "none" : "1px")};
  border-style: ${({ disabled }) => (disabled ? "none" : "solid")};
  border-color: ${({ disabled }) => (disabled ? "none" : "#a0ba0270")};
  border-radius: 5px;
  text-align: center;
  justify-content: center;
  margin: 10px 0 0 0;
`;

const ButtonSubmitText = styled.Text<{ disabled: boolean }>`
  font-size: 18px;
  line-height: 18px;
  font-weight: 300;
  color: ${({ disabled }) => (disabled ? "#7d8b2430" : "#7d8b24")};
`;
