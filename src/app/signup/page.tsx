"use client";
import React, { useState } from "react";
import Eye from "../../../components/Eye";
import EyeSlashed from "../../../components/EyeSlashed";
import axios from "axios";

const signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(false);

  const togglePassword = () => {
    setHidePassword(!hidePassword);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("", { name, email, password })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <main className="bg-black/80 h-[100vh]  flex justify-center">
      <div className="h-[90vh] w-[40vw] bg-white my-auto shadow-2xl rounded-lg ">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4  ">
            <p className="font-bold text-3xl flex justify-center items-center pt-10">
              Registration form
            </p>
            <div className="flex flex-col px-4 relative">
              <label htmlFor="">Name</label>
              <input
                type="text"
                name="name"
                className="mb-5 w-[500px] p-4 border-[1px] outline-none "
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="mb-5 w-[500px] p-4 border-[1px] outline-none"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <label htmlFor="">Password</label>
              <input
                type={hidePassword ? "password" : "text"}
                className="mb-5 w-[500px] p-4 border-[1px] outline-none"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />

              <div
                onClick={togglePassword}
                className="absolute bottom-9 right-[120px]"
              >
                {hidePassword ? <Eye /> : <EyeSlashed />}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button type="submit" className="bg-[#00ff99] py-4 px-2">
              {" "}
              Submit
            </button>
          </div>
        </form>
        <div className="flex justify-center items-center flex-col mt-10">
          <p>Already have an account ?</p>
          <button className="bg-blue-200 py-4 px-2">Login </button>
        </div>
      </div>
    </main>
  );
};

export default signup;
