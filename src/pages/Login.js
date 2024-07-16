import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
  }, []);

  return (
    <Container className="relative">
      <BackgroundImage />
      <div className="content absolute top-0 left-0 h-screen w-screen grid ">
        <Header />
        <div className="form-container flex flex-col items-center justify-center gap-8 h-[85vh]">
          <div className="flex flex-col items-center justify-center p-4 md:p-8 w-full md:w-1/2 lg:w-[35vw] xl:w-[25vw] gap-8 bg-[#000000b0] ">
            <div>
              <h3 className="text-lg md:text-xl">Login</h3>
            </div>
            <div className="flex flex-col gap-4 md:gap-8">
              <input
                className="w-60 py-2 px-4 text-black text-sm md:text-base"
                type="mail"
                placeholder="Email Address"
                name="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <input
                className="w-60 py-2 px-4 text-black text-sm md:text-base"
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <button
                className="w-60 py-2 px-4 bg-[#e50914] font-bold text-sm md:text-base rounded"
                onClick={handleLogin}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
  }
`;
