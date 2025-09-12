import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = req.json();
  const bookingCollection = await dbConnect(
    collectionNameObj.bookingCollection
  );
  const result = await bookingCollection.insertOne(body);

  return NextResponse.json(result);
};
