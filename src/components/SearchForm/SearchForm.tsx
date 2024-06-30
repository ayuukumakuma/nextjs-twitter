"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Styles from "./SearchForm.module.scss";
import { Select } from "@/app/(signed-in)/search/page";

type Props = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChangeSelected: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeQuery: (e: ChangeEvent<HTMLInputElement>) => void;
  selected: Select;
};

const SearchForm = ({
  handleSubmit,
  handleChangeSelected,
  handleChangeQuery,
  selected,
}: Props) => {
  return (
    <form className={Styles.container} onSubmit={handleSubmit}>
      <div className={Styles.tabBar}>
        <input
          className={Styles.radio}
          type="radio"
          name="target"
          value="users"
          id="users"
          required
          checked={selected === "users"}
          onChange={handleChangeSelected}
        />
        <label className={Styles.tab} htmlFor="users">
          users
        </label>
        <div className={Styles.verticalLine} />
        <input
          className={Styles.radio}
          type="radio"
          name="target"
          value="posts"
          id="posts"
          required
          checked={selected === "posts"}
          onChange={handleChangeSelected}
        />
        <label className={Styles.tab} htmlFor="posts">
          posts
        </label>
      </div>
      <input
        type="text"
        name="query"
        className={Styles.searchText}
        placeholder="search word"
        required
        onChange={handleChangeQuery}
      />
      <button className={Styles.submit} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
