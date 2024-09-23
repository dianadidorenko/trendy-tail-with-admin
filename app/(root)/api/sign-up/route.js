import { NextResponse } from "next/server";
import Users from "@/models/Users";
import db from "@/utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export async function POST(request) {
  const { name, email, password } = await request.json();
  let success = false;

  try {
    await db.connect();

    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(password, salt);

    const user = await Users.create({
      name,
      password: securePass,
      email,
    });

    const data = { user: { id: user._id } };
    const isAdmin = user.isAdmin;
    const authToken = jwt.sign(data, jwtSecret);

    success = true;
    return NextResponse.json({ success, authToken, isAdmin });
  } catch (err) {
    console.error("Error signing up:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  } finally {
    await db.disconnect();
  }
}
