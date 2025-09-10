import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Image from "next/image";
import React from "react";

export default async function ServicesDetailsPage({ params }) {
  console.log(params);
  const servicesCollection = await dbConnect(
    collectionNameObj.servicesCollection
  );
  const data = await servicesCollection.findOne({
    _id: new ObjectId(params.id),
  });
  console.log(data);
  return (
    <div>
      <section className="flex justify-center w-full">
        <figure className="relative">
          <Image
            src={"/assets/images/checkout/checkout.png"}
            width={1600}
            height={300}
            alt={"banner"}
          />
          <div className="absolute w-full h-full top-0 transparent-layer">
            <div className="w-full h-full flex items-center">
              <div className="font-bold ps-10 text-3xl">
                <h1 className="text-white">Services Details</h1>
              </div>
            </div>
          </div>
        </figure>
      </section>
      <section>
        <Image src={data.img} width={400} height={240} alt={data.title} />
        <h1 className="text-bold text-3xl">{data.title}</h1>
      </section>
    </div>
  );
}
