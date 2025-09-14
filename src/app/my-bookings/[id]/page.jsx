import { BookingUpdateForm } from "@/components/BookingUpdateForm";
import { headers } from "next/headers";
import React from "react";

export default async function UpdateBookingsPage({ params }) {
  const { id } = params;

  const res = await fetch(`process.env.NEXT_AUTH_URL/api/my-bookings/${id}`, {
    headers: Object.fromEntries(headers()),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Fetch error:", res.status, res.statusText);
    return (
      <div>
        Error: {res.status} {res.statusText}
      </div>
    );
  }

  let data;
  try {
    data = await res.json();
  } catch (err) {
    console.error("JSON parse error:", err);
    return <div>Invalid JSON response</div>;
  }

  return (
    <div>
      <BookingUpdateForm data={data} />
    </div>
  );
}
