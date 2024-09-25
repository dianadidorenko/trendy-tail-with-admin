import Users from "@/models/Users";
import db from "@/utils/db";

// Обработчик для метода GET
export async function GET(req) {
  const email = req.headers.get("userEmail");

  await db.connect();
  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  } finally {
    await db.disconnect();
  }
}

// Обработчик для метода PUT
export async function PUT(req) {
  const { email, name, surname, phone, city, country } = await req.json();

  await db.connect();
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { email },
      { name, surname, phone, city, country },
      { new: true }
    );

    if (!updatedUser) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    console.log("Обновленный пользователь:", updatedUser);

    return new Response(JSON.stringify({ success: true, user: updatedUser }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  } finally {
    await db.disconnect();
  }
}
