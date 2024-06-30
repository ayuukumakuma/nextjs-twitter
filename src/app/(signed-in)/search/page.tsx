"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import SearchForm from "@/components/SearchForm/SearchForm";
import { Follow, User } from "@prisma/client";
import { PostList, PostListItem } from "@/components/PostList";
import Styles from "./page.module.scss";
import { UserList } from "@/components/UserList/UserList";

export type Select = "users" | "posts";

export type UserType = User & {
  followers: Follow[];
  following: Follow[];
};

const Search = () => {
  const [selected, setSelected] = useState<Select>("users");
  const [query, setQuery] = useState("");
  const [userResult, setUserResult] = useState<UserType[]>([]);
  const [postResult, setPostResult] = useState<PostListItem[]>([]);

  const handleChangeSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value as Select);
  };

  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const fetchQuery = async () => {
    try {
      const res = await fetch(`/api/search/?q=${query}&target=${selected}`);
      const data = (await res.json()).data;

      if (selected === "users") {
        setUserResult(data);
      } else {
        setPostResult(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchQuery();
  };

  return (
    <div className={Styles.container}>
      <SearchForm
        handleSubmit={handleSubmit}
        handleChangeSelected={handleChangeSelected}
        handleChangeQuery={handleChangeQuery}
        selected={selected}
      />
      {selected === "users" ? (
        <UserList users={userResult} onAction={fetchQuery} />
      ) : (
        <PostList posts={postResult} />
      )}
    </div>
  );
};

export default Search;
