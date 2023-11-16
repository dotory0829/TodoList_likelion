import styled from "styled-components";
import { TodoContainer } from "./TodoContainer";

export const TodoMain = () => {
  return (
    <TodoWraper>
      <TodoContainer />
    </TodoWraper>
  );
};

const TodoWraper = styled.div`
  margin-top: calc(100% - 95%);
`;
