import Products from "@/models/Products";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const GET = async (request: any) => {
  //const { search } = await request.json();

  await connect();

  const products = await Products.find();
  //console.log(products);

  /* 
  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    email,
    password: hashedPassword,
  }); 
  */

  try {
    //await newUser.save();
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, { status: 500 });
  }
};

export const POST = async (request: any) => {
  const { search } = await request.json();

  await connect();

  const products = await Products.find();
  console.log(products);

  /* 
  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    email,
    password: hashedPassword,
  }); 
  */

  try {
    //await newUser.save();
    return new NextResponse('Products response', { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, { status: 500,});
  }
};