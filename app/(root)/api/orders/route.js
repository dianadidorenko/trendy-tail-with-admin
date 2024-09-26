import Order from "@/models/Orders";
import db from "@/utils/db";

export async function POST(req) {
  await db.connect();
  try {
    const body = await req.json();
    const newOrder = new Order(body);
    await newOrder.save();
    return new Response(JSON.stringify(newOrder), { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } finally {
    await db.disconnect();
  }
}

export async function GET(req) {
  await db.connect();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  try {
    const orders = await Order.find({ "client.email": email });
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } finally {
    await db.disconnect();
  }
}
