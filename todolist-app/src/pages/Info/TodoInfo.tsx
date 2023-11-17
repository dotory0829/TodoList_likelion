import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteTodo, getTodoItem, patchTodoList } from "../../api/TodoApi";
import styled from "styled-components";
import { TodoItem, defaultTodoItem } from "../../types/TodoTypes";

export const TodoInfo = () => {
  const navigate = useNavigate();
  const { state: id } = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<TodoItem>(defaultTodoItem);
  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTodoItem(id);
      setData(res);
    };
    inputRef.current?.focus();
    fetchData();
  }, [id]);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const editTodo = async () => {
    const { title, content } = input;
    const res = await patchTodoList(id, title, content);
    if (res.ok) {
      navigate("/");
    }
  };

  const delTodo = async () => {
    const check = confirm("정말로 삭제하시겠습니까?");
    if (check) {
      const res = await deleteTodo(id);
      if (res.ok) {
        navigate("/");
      }
    }
  };

  const moveToHome = () => {
    navigate("/");
  };

  return (
    <PositionWrap>
      <TodoBox>
        <ExpendedInput
          name="title"
          type="text"
          ref={inputRef}
          placeholder="TITLE"
          onChange={handleInputChange}
          value={input.title || data.title}
        />

        <ExpendedTextarea
          name="content"
          value={input.content || data.content}
          onChange={handleInputChange}
        />
        <DeleteWrap>
          <DeleteBtn onClick={delTodo}>Delete</DeleteBtn>
        </DeleteWrap>
        <BtnWrap>
          <SaveBtn onClick={editTodo}>Save</SaveBtn>
          <CancelBtn onClick={moveToHome}>Cancel</CancelBtn>
        </BtnWrap>
      </TodoBox>
    </PositionWrap>
  );
};

const PositionWrap = styled.div`
  margin-top: calc(100% - 95%);
`;

const TodoBox = styled.div`
  background-color: #041955;
  width: 400px;
  max-width: calc(100% - 100px);
  height: 700px;
  border-radius: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
`;

// INPUT
const ExpendedInput = styled.input`
  margin: 20px auto 0;
  width: calc(100% - 80px);
  height: 50px;
  outline: none;
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 24px;
  text-align: center;

  &::placeholder {
    color: #fff;
  }
`;

const ExpendedTextarea = styled.textarea`
  background-color: #334f9f;
  margin: 20px auto 0;
  width: calc(100% - 80px);
  height: 350px;
  margin-bottom: 40px;
  font-size: 18px;
  padding: 20px;
  border: none;
  outline: none;
  border-radius: 10px;
  resize: none;
  color: #fff;
`;

const DeleteWrap = styled.div`
  position: absolute;
  display: flex;
  left: 20px;
  bottom: 20px;
  gap: 10px;
`;

const BtnWrap = styled.div`
  position: absolute;
  display: flex;
  right: 20px;
  bottom: 20px;
  gap: 10px;
`;

const SaveBtn = styled.button`
  font-size: 25px;
  background-color: #041955;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 10px;
  cursor: pointer;
`;

const CancelBtn = styled.button`
  font-size: 25px;
  width: 100%;
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  font-size: 25px;
  background-color: transparent;
  border: 1px solid #eb06ff;
  border-radius: 10px;
  color: #eb06ff;
  cursor: pointer;
`;
