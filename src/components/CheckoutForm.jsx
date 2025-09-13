"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CheckoutForm = ({ data }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const bookingPayload = {
      customerName: session?.user?.name || "",
      email: session?.user?.email || "",

      date: formData.date,
      phone: formData.phone,
      address: formData.address,

      service_id: data?._id,
      service_name: data?.title,
      service_img: data?.img,
      service_price: data?.price,
    };

    const res = await fetch("http://localhost:3000/api/service", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingPayload),
    });
    if (res?.status == 200) {
      toast.success("Successfully your order confirm!");
    } else {
      toast.error("Failed Your Order!");
    }
    router.push("/my-bookings");
  };

  return (
    <div className="my-10">
      <div className="w-11/12 mx-auto">
        <h2 className="text-center text-3xl mb-4">
          Book Service: {data?.title}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                readOnly
                defaultValue={session?.user?.name}
                {...register("name")}
                className="input input-bordered"
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                readOnly
                defaultValue={session?.user?.email || ""}
                {...register("email")}
                className="input input-bordered"
              />
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due amount</span>
              </label>
              <input
                type="text"
                readOnly
                defaultValue={data?.price || ""}
                {...register("price")}
                className="input input-bordered"
              />
            </div>

            {/* Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                {...register("date", { required: "Date is required" })}
                className="input input-bordered"
              />
              {errors.date && (
                <span className="text-red-500 text-sm">
                  {errors.date.message}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                placeholder="Your Phone"
                {...register("phone", { required: "Phone is required" })}
                className="input input-bordered"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Address */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Present Address</span>
              </label>
              <input
                type="text"
                placeholder="Your Address"
                {...register("address", { required: "Address is required" })}
                className="input input-bordered"
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="form-control mt-6">
            <input
              className="btn btn-primary btn-block"
              type="submit"
              value="Order Confirm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
