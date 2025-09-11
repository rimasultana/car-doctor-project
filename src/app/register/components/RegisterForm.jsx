"use client";
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import SocialLogin from "@/app/login/components/SocialLogin";
import { registerUser } from "@/app/actions/auth/registerUser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await registerUser(data);
      console.log(res);
      if (res?.acknowledged == true) {
        toast.success("Register Successfully!");
        router.push("/");
      } else {
        toast.error("Registration failed");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    }
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
          placeholder="Enter your Name"
          className="input input-bordered w-full"
          {...register("name")}
          required
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
          required
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
          required
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
