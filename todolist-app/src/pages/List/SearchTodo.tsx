import styled from "styled-components";
import { ChangeEvent, useState } from "react";

interface SearchTodoProps {
  onSearch: (query: string) => void;
}

export const SearchTodo: React.FC<SearchTodoProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <SearchWrap>
      <SearchInput
        placeholder="SEARCH"
        value={searchQuery}
        onChange={handleSearch}
      />
      <SearchInputDate
        placeholder="SEARCH"
        type="date"
        onChange={handleSearch}
      />
    </SearchWrap>
  );
};

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  margin: 30px 0 0 30px;
  width: calc(100% - 20%);
  max-height: 50px;
  border-radius: 10px;
  border: none;
  outline: none;
  padding: 12px;
  font-size: 20px;
  text-align: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const SearchInputDate = styled.input`
  margin: 25px 10px 0 0;
  width: 25px;
  max-width: 25px;
  min-width: 2px;
  font-size: 20px;
  max-height: 50px;
  border-radius: 10px;
  outline: none;
  border: none;
`;
