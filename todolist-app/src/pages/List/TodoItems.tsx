import styled from "styled-components";
import { useTodoData } from "../../hooks/useFetchList";
import { useNavigate } from "react-router-dom";
import { SearchTodo } from "./SearchTodo";
import { useEffect, useState } from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getTodoList } from "../../api/TodoApi";
import { TodoItem } from "../../types/TodoTypes";

export const TodoItems = () => {
  const navigate = useNavigate();
  const { todoListData } = useTodoData();
  const [filteredItems, setFilteredTodoList] = useState<TodoItem[]>([]);

  const { data, isLoading, isError, error }: UseQueryResult<TodoItem[]> =
    useQuery({
      queryKey: ["mainData"],
      queryFn: getTodoList,
    });

  const handleSearch = (target: string) => {
    const filteredItems = data?.filter(
      (item) =>
        item.title.toLowerCase().includes(target.toLowerCase()) ||
        item?.createdAt!.split(".").join("-").startsWith(target)
    );

    setFilteredTodoList(filteredItems || []);
  };

  useEffect(() => {
    setFilteredTodoList(todoListData);
  }, [todoListData]);

  const movoToInfo = (id: string): void => {
    navigate(`/info/${id}`, { state: id });
  };

  const formattedDate = (target: string): string => {
    return new Date(target).toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const getListData = () => {
    return filteredItems?.slice(0).map((item) => (
      <ItemContainer key={item._id} onClick={() => movoToInfo(item._id)}>
        <TitleBox onClick={() => movoToInfo(item._id)}>{item.title}</TitleBox>
        <DateBox>{formattedDate(item.createdAt!)}</DateBox>
      </ItemContainer>
    ));
  };

  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <TitleBox>Error: {error.toString()}</TitleBox>
      </>
    );
  }

  return (
    <>
      <SearchTodo onSearch={handleSearch} />
      <OverFlowWrap>{getListData()}</OverFlowWrap>
    </>
  );
};

const OverFlowWrap = styled.div`
  overflow-y: scroll;
  padding-top: 10px;
  padding-bottom: 100px;
`;

const ItemContainer = styled.div`
  margin: 20px auto 0;
  height: 90px;
  width: calc(100% - 60px);
  border-radius: 12px;
  background-color: #041955;
  box-shadow: inherit;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  &:hover {
    transform: scale(1.01);
    cursor: pointer;
  }
`;

const TitleBox = styled.div`
  font-size: 24px;
  margin: auto 30px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const DateBox = styled.div`
  font-size: 14px;
  margin: auto 30px;
`;
