"use client";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function DeleteBookingButton({ id }) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleDelete = async (id) => {
    if (!session) {
      toast.success("You must be logged in to delete a booking");
      return;
    }

    const res = await fetch(`/api/service/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    if (data?.success == true) {
      toast.success("Item is Deleted Successfully!");
    } else {
      toast.error("Failed Item Deleted!");
    }

    router.refresh();
  };

  return (
    <MdDelete
      onClick={() => handleDelete(id)}
      className="h-8 w-8 font-bold cursor-pointer text-red-500"
    />
  );
}
