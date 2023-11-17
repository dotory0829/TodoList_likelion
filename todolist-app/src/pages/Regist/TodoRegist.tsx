import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useRegistForm, useTodoSubmit } from "../../hooks/useRegist";
import { TodoRegistProps } from "../../types/TodoTypes";

export const TodoRegist: React.FC<TodoRegistProps> = ({
  isExpended,
  handleToggle,
}) => {
  const { titleInput, handleTitleChange, contentInput, handleContentChange } =
    useRegistForm();

  const handleSubmitForm = useTodoSubmit();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await handleSubmitForm(titleInput, contentInput);
    if (res.ok) {
      alert("등록되었습니다.");
      window.location.reload();
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isExpended]);

  return (
    <>
      {isExpended ? (
        <ExpendedContainer onSubmit={handleSubmit}>
          <CloseBtn onClick={handleToggle} />
          <ExpendedInput
            maxLength={20}
            type="text"
            ref={inputRef}
            placeholder="TITLE"
            onChange={handleTitleChange}
          />
          <ExpendedTextarea onChange={handleContentChange} />
          <BtnWrap>
            <SaveBtn>Save</SaveBtn>
            <CancelBtn onClick={handleToggle} type="button">
              Cancel
            </CancelBtn>
          </BtnWrap>
        </ExpendedContainer>
      ) : (
        isExpended === false && (
          <ToggleBtn onClick={handleToggle}>Add New Task</ToggleBtn>
        )
      )}
    </>
  );
};

// CONTAINER
const ExpendedContainer = styled.form`
  position: absolute;
  bottom: -25px;
  left: -10px;
  background-color: #041955;
  width: 420px;
  height: 570px;
  border-radius: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  transition: all 0.5s ease-out;
`;

// INPUT
const ExpendedInput = styled.input`
  margin-top: 20px;
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
  margin-top: 20px;
  width: calc(100% - 80px);
  height: 350px;
  margin-bottom: 40px;
  font-size: 18px;
  padding: 20px;
  border: none;
  outline: none;
  border-radius: 10px;
  resize: none;
  &::placeholder {
    color: #fff;
  }
`;

// BUTTON
const BtnWrap = styled.div`
  display: flex;
  position: absolute;
  right: 20px;
  bottom: 20px;
  gap: 20px;
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

const ToggleBtn = styled.div`
  position: absolute;
  text-align: center;
  line-height: 100px;
  margin: 0 auto;
  width: 400px;
  height: 100px;
  border-radius: 50px;
  border: none;
  background-color: #041955;
  bottom: -25px;
  right: 0;
  left: 0;
  color: #fff;
  font-size: 24px;
  box-shadow: inherit;

  &:hover {
    transform: scale(1.01);
    cursor: pointer;
  }
`;

const CloseBtn = styled.button`
  width: 80px;
  height: 10px;
  border-radius: 10px;
  border: none;
  &:hover {
    transform: scale(1.01);
    cursor: pointer;
  }
`;
