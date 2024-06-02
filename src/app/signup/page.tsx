"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import { Provider } from "@/components/Provider";

type FormValues = {
  email: string;
  name: string;
  password: string;
};

const Signup = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    name: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      if (response.ok) {
        // apiではユーザー作成のみ行われるので、サインイン処理を行う
        await fetch("/api/auth/signin/credentials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formValues.email,
            password: formValues.password,
          }),
        });
        router.push("/");
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Provider>
      <h1>Signup</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Email
          <input type="email" name="email" onChange={handleChange} />
        </label>
        <label className={styles.label}>
          Name
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <label className={styles.label}>
          Password
          <input type="password" name="password" onChange={handleChange} />
        </label>
        <input className={styles.submit} type="submit" />
      </form>
    </Provider>
  );
};

export default Signup;
