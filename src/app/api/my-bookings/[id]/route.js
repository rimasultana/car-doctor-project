import { authOptions } from "@/lib/authOption";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  const bookingCollection = await dbConnect(
    collectionNameObj.bookingCollection
  );
  const query = { _id: new ObjectId(id) };

  const session = await getServerSession(authOptions);
  const email = await session?.user?.email;

  const singleBooking = await bookingCollection.findOne(query);

  const isOwnerOk = (await email) == singleBooking?.email;
  if (isOwnerOk) {
    return NextResponse.json(singleBooking);
  } else {
    return NextResponse.json({
      message: "Forbidden Update Access!",
      status: 403,
    });
  }
};

export const PATCH = async (req, { params }) => {
  const { id } = params;
  const bookingCollection = await dbConnect(
    collectionNameObj.bookingCollection
  );

  const body = await req.json();
  const filter = { $set: body };
  const query = { _id: new ObjectId(id) };

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const currentBookingData = await bookingCollection.findOne(query);
  const isOwnerOk = email == currentBookingData?.email;
  if (isOwnerOk) {
    const options = { upsert: false };
    const update = await bookingCollection.updateOne(query, filter, options);

    revalidatePath("/my-bookings");
    return NextResponse.json(update);
  } else {
    return NextResponse.json({
      message: "Forbidden Update Access!",
      status: 403,
    });
  }
};
