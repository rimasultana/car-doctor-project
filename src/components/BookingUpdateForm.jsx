"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const BookingUpdateForm = ({ data }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data) {
      reset({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        price: data?.service_price || "",
        date: data?.date || "",
        phone: data?.phone || "",
        address: data?.address || "",
      });
    }
  }, [data, reset, session]);

  const onSubmit = async (formData) => {
    const bookingPayload = {
      date: formData.date,
      phone: formData.phone,
      address: formData.address,
    };

    try {
      const res = await fetch(
        `process.env.NEXT_AUTH_URL/api/my-bookings/${data._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingPayload),
        }
      );

      const dataRes = await res.json();
      console.log(dataRes, "dataRes");

      if (dataRes?.modifiedCount > 0) {
        toast.success("Successfully updated!");
        router.push("/my-bookings");
      } else {
        toast.error("No changes detected.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update booking!");
    }
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
                {...register("phone")}
                className="input input-bordered"
              />
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
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
