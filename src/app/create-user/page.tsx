"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import { signIn } from "next-auth/react";

type FormValues = {
  email: string;
  name: string;
  password: string;
};

const CreateUser = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    name: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response?.ok) {
        const response = await signIn("credentials", {
          email: formValues.email,
          password: formValues.password,
          callbackUrl: "/",
        });
        if (!response?.ok) throw new Error("Failed to sign in");
      }

      if (!response?.ok) throw new Error("Failed to create");
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
    <>
      <h1>Create User</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Email
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Name
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
        </label>
        <button className={styles.submit} type="submit">
          Create
        </button>
      </form>
    </>
  );
};

export default CreateUser;
