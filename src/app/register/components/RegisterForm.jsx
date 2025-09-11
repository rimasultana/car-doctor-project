"use client";
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import SocialLogin from "@/app/login/components/SocialLogin";
import { registerUser } from "@/app/actions/auth/registerUser";

export default function RegisterForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    registerUser(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg space-y-8"
    >
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text  font-bold">Name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          {...register("name")}
        />
      </label>
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text  font-bold">Email</span>
        </div>
        <input
          {...register("email")}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text font-bold">Password</span>
        </div>
        <input
          {...register("password")}
          type="password"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </label>
      <button className="w-full h-12 bg-orange-500 text-white font-bold">
        Sign Up
      </button>
      <p className="text-center">Or Sign In with</p>
      <SocialLogin />
      <p className="text-center">
        Don't Have an account?{" "}
        <Link href="/login" className="text-orange-500 font-bold">
          Login
        </Link>
      </p>
    </form>
  );
}
