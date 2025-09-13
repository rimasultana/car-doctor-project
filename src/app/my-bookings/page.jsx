"use client";

import MyAllBookings from "@/components/tables/MyAllBookings";
import { useEffect, useState } from "react";

export default function MyBookingsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await fetch("/api/service", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const d = await res.json();
        setData(d);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchMyBookings();
    console.log(fetchMyBookings);
  }, []);

  return (
    <div>
      <MyAllBookings data={data} />
    </div>
  );
}
