import React from 'react';
import style from './SearchBar.module.scss';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  filterOption: string;
  onFilter: (filter: string) => void;
  sortOption: string;
  onSort: (option: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearch,
  filterOption,
  onFilter,
  sortOption,
  onSort,
}) => {
  return (
    <div className={style.searchContainer}>
      <input
        type="text"
        className={style.searchInput}
        placeholder="Buscar tarefas..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      <select
        className={style.filterSelect}
        value={filterOption}
        onChange={(e) => onFilter(e.target.value)}
      >
        <option value="all">Todas</option>
        <option value="pending">Pendentes</option>
        <option value="expired">Vencidas</option>
        <option value="completed">Concluídas</option>
      </select>
      <select
        className={style.sortSelect}
        value={sortOption}
        onChange={(e) => onSort(e.target.value)}
      >
        <option value="recent">Mais recentes</option>
        <option value="oldest">Mais antigas</option>
      </select>
    </div>
  );
};

export default SearchBar;
