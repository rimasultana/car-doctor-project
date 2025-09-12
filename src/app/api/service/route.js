import { authOptions } from "@/lib/authOption";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const bookingCollection = await dbConnect(
      collectionNameObj.bookingCollection
    );
    const result = await bookingCollection.find({}).toArray(); 
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/service Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const body = await req.json();
    const bookingCollection = await dbConnect(
      collectionNameObj.bookingCollection
    );
    const result = await bookingCollection.insertOne(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/service Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
