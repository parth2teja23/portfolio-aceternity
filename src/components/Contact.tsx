"use client";

import React, { useState } from "react";

interface FieldState {
  value: string;
  error: string;
}

interface FormState {
  name: FieldState;
  email: FieldState;
  message: FieldState;
}

const defaultFormState: FormState = {
  name: { value: "", error: "" },
  email: { value: "", error: "" },
  message: { value: "", error: "" },
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(defaultFormState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name.value,
        email: formData.email.value,
        message: formData.message.value,
      }),
    });

    if (res.ok) {
      alert("Message sent successfully!");
      setFormData(defaultFormState);
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <input
          type="text"
          placeholder="Your Name"
          className="bg-neutral-100 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-600 px-2 py-2 rounded-md text-sm text-neutral-700 dark:text-neutral-200 w-full border border-neutral-200 dark:border-neutral-700 transition-colors duration-200 placeholder-neutral-500 dark:placeholder-neutral-400"
          value={formData.name.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({
              ...formData,
              name: { value: e.target.value, error: "" },
            })
          }
        />
        <input
          type="email"
          placeholder="Your email address"
          className="bg-neutral-100 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-600 px-2 py-2 rounded-md text-sm text-neutral-700 dark:text-neutral-200 w-full border border-neutral-200 dark:border-neutral-700 transition-colors duration-200 placeholder-neutral-500 dark:placeholder-neutral-400"
          value={formData.email.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({
              ...formData,
              email: { value: e.target.value, error: "" },
            })
          }
        />
      </div>
      <div>
        <textarea
          placeholder="Your Message"
          rows={10}
          className="bg-neutral-100 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-600 px-2 mt-4 py-2 rounded-md text-sm text-neutral-700 dark:text-neutral-200 w-full border border-neutral-200 dark:border-neutral-700 transition-colors duration-200 placeholder-neutral-500 dark:placeholder-neutral-400"
          value={formData.message.value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFormData({
              ...formData,
              message: { value: e.target.value, error: "" },
            })
          }
        />
      </div>
      <button
        className="w-full px-2 py-2 mt-4 bg-neutral-100 dark:bg-neutral-800 rounded-md font-bold text-neutral-500 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
