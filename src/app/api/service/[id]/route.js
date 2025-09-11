"use server";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; 

export const GET = async (req, { params }) => {
  const servicesCollection = await dbConnect(
    collectionNameObj.servicesCollection
  );
  const data = await servicesCollection.findOne({
    _id: new ObjectId(params.id),
  });
  return NextResponse.json(data);
};
