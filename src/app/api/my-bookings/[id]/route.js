import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  const bookingCollection = await dbConnect(
    collectionNameObj.bookingCollection
  );
  const singleCollection = await bookingCollection.findOne({
    _id: new ObjectId(id),
  });

  return NextResponse.json(singleCollection);
};

export const PATCH = async (req, { params }) => {
  const { id } = params;
  const bookingCollection = await dbConnect(
    collectionNameObj.bookingCollection
  );

  const body = await req.json();
  const filter = { $set: body };
  const query = { _id: new ObjectId(id) };

  const options = { upsert: false };
  const update = await bookingCollection.updateOne(query, filter, options);

  revalidatePath("/my-bookings");
  return NextResponse.json(update);
};
