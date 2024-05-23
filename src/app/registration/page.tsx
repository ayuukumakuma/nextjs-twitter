"use client";
import { FormEvent, useState } from "react";

type Params = {
  name: string;
  email: string;
  password: string;
};

export default function Registration() {
  const [params, setParams] = useState<Params>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("submit");
    e.preventDefault();
    await fetch("/api/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then(() => console.log("登録完了"))
      .catch(() => console.log("登録失敗"));
  };
  return (
    <>
      <h1>ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <label>
          名前
          <input
            type="text"
            name="name"
            required
            onChange={(e) => setParams({ ...params, name: e.target.value })}
          />
        </label>
        <label>
          メールアドレス
          <input
            type="email"
            name="email"
            required
            onChange={(e) => setParams({ ...params, email: e.target.value })}
          />
        </label>
        <label>
          パスワード
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setParams({ ...params, password: e.target.value })}
          />
        </label>
        <input type="submit" />
      </form>
    </>
  );
}
