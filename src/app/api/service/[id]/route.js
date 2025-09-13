"use server";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;
    const bookingCollection = await dbConnect(
      collectionNameObj.bookingCollection
    );
    const query = { _id: new ObjectId(id) };

    const session = await getServerSession(authOptions);
    const currentBooking = await bookingCollection.findOne(query);

    if (!currentBooking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    const isOwnerOk =
      session?.user?.email?.toLowerCase() ===
      currentBooking?.email?.toLowerCase();

    if (!isOwnerOk) {
      return NextResponse.json(
        { success: false, message: "Forbidden access" },
        { status: 403 }
      );
    }

    const deleteRes = await bookingCollection.deleteOne(query);
    return NextResponse.json({
      success: true,
      deletedCount: deleteRes.deletedCount,
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
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
