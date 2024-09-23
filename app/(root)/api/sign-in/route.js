// app/api/userLogin/route.ts

import { NextResponse } from "next/server";
import Users from "@/models/Users";
import db from "@/utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export async function POST(request) {
  const { email, password } = await request.json();
  let success = false;

  try {
    await db.connect();

    const user = await Users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success, error: "Try logging in with correct email" },
        { status: 400 }
      );
    }

    const pwdCompare = await bcrypt.compare(password, user.password);

    if (!pwdCompare) {
      return NextResponse.json(
        { success, error: "Try logging in with correct password" },
        { status: 400 }
      );
    }

    const data = { user: { id: user._id } };
    const authToken = jwt.sign(data, jwtSecret);

    const isAdmin = user.isAdmin;
    success = true;

    return NextResponse.json({ success, authToken, isAdmin });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { success, error: "Server Error" },
      { status: 500 }
    );
  } finally {
    await db.disconnect();
  }
}
