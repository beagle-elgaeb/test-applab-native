import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import checkMarck from "../images/checkMark.svg";
import { remove, toggleDone, update } from "../redux/toDoSlise";
import { ReduxState, TaskItem } from "../redux/types";
import { formatData, validateForm } from "../utils/utils";

function Card({ task, done }: { task: TaskItem; done: boolean }) {
  // Управление инпутами
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);

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

  // Состояние задачи (дерактируемая или нет)
  const [updated, setUpdated] = useState(false);

  function handleEdit() {
    setUpdated(true);
  }

  function cancelEditing() {
    setUpdated(false);
  }

  // Использование данных из стейта
  const { tasks, tasksDone } = useSelector((state: ReduxState) => state.toDo);

  // Передача данных в стейт
  const dispatch = useDispatch();

  function handleToggleDone() {
    dispatch(toggleDone({ id: task.id, done: done }));
  }

  function handleRemoveTask() {
    dispatch(remove({ id: task.id, done: done }));
  }

  function handleUpdate() {
    if (!name || !description) {
      return;
    }

    dispatch(update({ id: task.id, done: done, name, description }));
    setUpdated(false);
  }

  // Информация о валидности полей
  const checkValidation = validateForm(
    name,
    description,
    tasks,
    tasksDone,
    task
  );

  return (
    <Container done={done}>
      {!!updated ? (
        <View>
          <View>
            <Input
              value={name}
              placeholder="Название - от 1 до 20 символов и уникальное"
              onChangeText={handleChangeName}
              onBlur={lossFocus}
              maxLength={20}
              valid={!!focusIsLost ? checkValidation.nameIsValid : true}
              plhldrVsble={!name}
            />
          </View>

          <Input
            keyboardType="numeric"
            value={description}
            placeholder="Описание - от 1 до 70 символов"
            onChangeText={handleChangeDescription}
            onBlur={lossFocus}
            maxLength={70}
            valid={!!focusIsLost ? checkValidation.descriptionIsValid : true}
            plhldrVsble={!description}
          />
        </View>
      ) : (
        <View>
          <CheckBoxAndTitle>
            <CheckBox onPress={handleToggleDone} done={done} />

            <Title done={done}>{task.name}</Title>
          </CheckBoxAndTitle>

          <Description>{task.description}</Description>
        </View>
      )}

      <ButtonsAndDate>
        {!!updated ? (
          <Buttons>
            <Button
              onPress={handleUpdate}
              disabled={!!focusIsLost ? !checkValidation.isValid : false}
            >
              <ButtonText
                disabled={!!focusIsLost ? !checkValidation.isValid : false}
              >
                Сохранить
              </ButtonText>
            </Button>

            <Button onPress={cancelEditing} disabled={false}>
              <ButtonText disabled={false}>Отменить</ButtonText>
            </Button>
          </Buttons>
        ) : (
          <Buttons>
            <Button onPress={handleEdit} disabled={false}>
              <ButtonText disabled={false}>Изменить</ButtonText>
            </Button>
            <Button onPress={handleRemoveTask} disabled={false}>
              <ButtonText disabled={false}>Удалить</ButtonText>
            </Button>
          </Buttons>
        )}

        <Time done={done}>{formatData(task.date)}</Time>
      </ButtonsAndDate>
    </Container>
  );
}

export default Card;

const Container = styled.View<{ done: boolean }>`
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ done }) => (done ? "#f9f5f9" : "#fdfafb")};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ done }) => (done ? "#3b0d8250" : "#a7023c50")};
  border-radius: 5px;
  outline-width: 0;
  shadow-offset: 4px 4px;
  shadow-color: ${({ done }) => (done ? "#3b0d8250" : "#a7023c50")};
  shadow-radius: 5px;
  margin: 10px 0 0 0;
  padding: 10px;
`;

const CheckBoxAndTitle = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const CheckBox = styled.TouchableOpacity<{ done: boolean }>`
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  background-image: ${({ done }) => (done ? `url(${checkMarck}  )` : "none")};
  background-position: center;
  background-size: 80%;
  background-repeat: no-repeat;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ done }) => (done ? "#3b0d8250" : "#a7023c50")};
  border-radius: 5px;
`;

const Title = styled.Text<{ done: boolean }>`
  font-size: 22px;
  line-height: 24px;
  font-weight: 500;
  color: ${({ done }) => (done ? "#3b0d82" : "#a7023c")};
  text-decoration: ${({ done }) => (done ? "line-through" : "none")};
  cursor: pointer;
  margin: 0 10px 5px 10px;
`;

const Description = styled.Text`
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  hyphens: auto;
  word-break: break-all;
  color: #000000;
  margin: 0;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: "#a0ba0280",
})<{ valid: boolean; plhldrVsble: boolean }>`
  width: 100%;
  height: 24px;
  background: #ffffff;
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
  font-size: ${({ plhldrVsble }) => (plhldrVsble ? "12px" : "16px")};
  line-height: 18px;
  font-weight: 300;
  text-transform: ${({ plhldrVsble }) => (plhldrVsble ? "lowercase" : "none")};
  color: #a0ba02;
  margin: 0 0 5px 0;
  padding: 0 10px 0 10px;
`;

const ButtonsAndDate = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const Buttons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const Button = styled.TouchableOpacity`
  background: transparent;
  border-width: 0;
  outline-width: 0;
  text-align: center;
  justify-content: center;
  margin: 0 20px 0 0;
`;

const ButtonText = styled.Text<{ disabled: boolean }>`
  font-size: 12px;
  line-height: 14px;
  font-weight: 300;
  font-style: italic;
  color: ${({ disabled }) => (disabled ? "#a0ba0230" : "#a0ba02")};
`;

const Time = styled.Text<{ done: boolean }>`
  font-size: 12px;
  line-height: 14px;
  font-weight: 300;
  text-align: end;
  color: ${({ done }) => (done ? "#3b0d82" : "#a7023c")};
`;
