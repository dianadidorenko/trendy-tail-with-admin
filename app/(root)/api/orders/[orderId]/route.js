import db from "@/utils/db";
import Order from "@/models/Orders";

// Обработчик для метода GET
export async function GET(req, { params }) {
  const { orderId } = params;

  await db.connect();
  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return new Response(
        JSON.stringify({ success: false, message: "Order not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching order" }),
      { status: 500 }
    );
  } finally {
    await db.disconnect();
  }
}

// Обработчик для метода PATCH
export async function PATCH(req) {
  const { status } = await req.json();
  const { pathname } = new URL(req.url);
  const orderId = pathname.split("/").pop();

  await db.connect();
  try {
    console.log("Обновляем статус заказа:", orderId, status);
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    console.log("Обновленный заказ:", updatedOrder);

    if (!updatedOrder) {
      return new Response(
        JSON.stringify({ success: false, message: "Order not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, order: updatedOrder }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error updating order" }),
      { status: 500 }
    );
  } finally {
    await db.disconnect();
  }
}
