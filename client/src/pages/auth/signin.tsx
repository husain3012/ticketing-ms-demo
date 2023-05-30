import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { useRequest } from "@/hooks";
import Link from "next/link";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const {doRequest, errors} = useRequest({
    url:"/api/users/signin",
    method:"post",
    body: { email, password },
    onSuccess: (resp)=>{
      router.replace(`/`, undefined, {
        shallow:false
      })    
    }
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await doRequest();
    if(errors.length>0) return;

    // router.push("/")
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" px-6 py-8 rounded shadow-m w-full"
        >
          <h1 className="mb-8 text-3xl text-center">Sign In</h1>

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4 text-black"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4 text-black"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded border-2 border-blue-400 hover:bg-blue-400 transition-all focus:outline-none my-1"
          >
            Sign in
          </button>
        </form>

        <div className="text-grey-dark mt-6">
          Don't have an account?
          <Link
            className="no-underline border-b border-blue text-blue"
            href="/auth/signup"
          >
            Sing Up
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default SignIn;
