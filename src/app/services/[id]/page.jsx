import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ServicesDetailsPage({ params }) {
  const p = await params;
  const res = await fetch(`http://localhost:3000/api/service/${p.id}`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div className="w-full">
      <section className="relative w-full">
        <Image
          src="/assets/images/checkout/checkout.png"
          width={1600}
          height={300}
          alt="banner"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center ps-10">
          <div>
            <h1 className="text-white font-bold text-3xl md:text-4xl">
              Service Details
            </h1>
          </div>
        </div>
        <div className="mt-2 text-white  bg-[#FF3811] px-6 py-3 inline-block rounded relative bottom-10 left-1/2  ">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          Services Details
        </div>
      </section>

      <section className="flex flex-col md:flex-row gap-8 md:gap-16 my-10 px-4 md:px-20">
        <div className="flex-shrink-0 md:w-4/6">
          {" "}
          <Image
            src={data.img}
            width={300}
            height={100}
            alt={data.title}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
          <h1 className="text-2xl  md:text-3xl font-bold mb-4 mt-4">
            {data.title}
          </h1>
          <p className="text-gray-700 text- md:text-lg">{data.description}</p>
        </div>

        <div className="md:w-1/3 flex flex-col justify-start gap-4">
          {" "}
          <button className="bg-[#FF3811] text-white px-8 font-bold py-2 rounded-lg shadow-lg hover:bg-[#e63600] transition">
            <Link href={`/checkout/${data._id}`}>CheckOut</Link>
          </button>
          <p className="text-xl font-semibold mt-2 ">Price: ${data.price}</p>
        </div>
      </section>
    </div>
  );
}
