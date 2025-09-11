"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Login successful!");
      router.push("/"); 
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="form-control w-full">
          <span className="label-text font-bold">Email</span>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </label>

        <label className="form-control w-full">
          <span className="label-text font-bold">Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </label>

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>

      <div className="divider">Or continue with</div>
      <SocialLogin />
    </div>
  );
}
