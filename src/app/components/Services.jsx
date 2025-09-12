import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Services() {
  const serviceCollection = await dbConnect(
    collectionNameObj.servicesCollection
  );
  const data = await serviceCollection.find({}).toArray();
  console.log(data);
  return (
    <div className="w-11/12 mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="card bg-base-100 shadow-md hover:shadow-lg transition rounded-xl overflow-hidden"
          >
            <figure className="rounded-xl">
              <Image
                src={item.img}
                alt={item.title}
                width={400}
                height={250}
                className="w-full h-56 p-5 rounded-xl"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <div className="flex justify-between items-center">
                <p className="text-[#FF3811] font-semibold">
                  Price: ${item.price}
                </p>
                <Link
                  href={`/services/${item._id}`}
                  className="text-[#FF3811] hover:text-red-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 
                         1.06-1.06l4.5 4.5a.75.75 0 0 1 0 
                         1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 
                         0 0 1 2 8Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
