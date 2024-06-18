"use client";
import { FormEvent, useEffect } from "react";
import Styles from "./PostForm.module.scss";

export const PostForm = () => {
  const createPost = async (content: string) => {
    await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = e.currentTarget.content.value;
    await createPost(content);

    // textareaの値をクリア
    (document.getElementById("content") as HTMLTextAreaElement).value = "";
  };
  return (
    <form className={Styles.form} onSubmit={handleSubmit}>
      <textarea
        id="content"
        className={Styles.textarea}
        name="content"
        rows={7}
        autoFocus
        placeholder="How was your day today? (140 characters)"
      />
      <button className={Styles.submit} type="submit">
        Post
      </button>
    </form>
  );
};
