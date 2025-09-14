import { BookingUpdateForm } from "@/components/BookingUpdateForm";
import React from "react";

export default async function UpdateBookingsPage({ params }) {
  const { id } = params;
  const res = await fetch(`http://localhost:3000/api/my-bookings/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div>
      <BookingUpdateForm data={data} />
    </div>
  );
}
