"use server";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; 

export const GET = async (req, { params }) => {
  if (!params?.id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  let objectId;
  try {
    objectId = new ObjectId(params.id);
  } catch (err) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const servicesCollection = await dbConnect(
    collectionNameObj.servicesCollection
  );

  const data = await servicesCollection.findOne({ _id: objectId });

  if (!data) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  return NextResponse.json(data);
};
