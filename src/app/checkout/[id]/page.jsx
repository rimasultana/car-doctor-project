import CheckoutForm from "@/components/CheckoutForm";
import React from "react";

export default async function CheckoutPage({ params }) {
  const p = await params;
  const res = await fetch(`process.env.NEXT_AUTH_URL/api/service/${p.id}`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div>
      <CheckoutForm data={data} />
    </div>
  );
}
