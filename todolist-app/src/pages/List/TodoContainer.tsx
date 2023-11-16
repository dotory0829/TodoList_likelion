import styled from "styled-components";
import { TodoItems } from "./TodoItems";
import { TodoRegist } from "../Regist/TodoRegist";
import { useState } from "react";

export const TodoContainer = () => {
  const [isExpended, setIsExpended] = useState(false);

  const handleToggle = () => {
    setIsExpended(!isExpended);
  };

  return (
    <TodoBox>
      <TodoItems />
      <TodoRegist handleToggle={handleToggle} isExpended={isExpended} />
    </TodoBox>
  );
};

const TodoBox = styled.div`
  background-color: #334f9f;
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
