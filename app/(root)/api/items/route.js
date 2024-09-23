import NewItemModel from "@/models/NewItem";
import db from "@/utils/db";

// Обработчик для метода POST
export async function POST(req) {
  await db.connect();
  try {
    const itemData = await req.json();
    console.log("Received itemData:", itemData);

    if (!itemData.name) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const item = new NewItemModel(itemData);

    await item.save();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error adding item:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400 }
    );
  } finally {
    await db.disconnect();
  }
}

// Обработчик для метода GET
export async function GET(req) {
  await db.connect();
  try {
    // all items
    const items = await NewItemModel.find();
    return new Response(JSON.stringify(items), { status: 200 });
  } catch (error) {
    console.error("Error fetching items:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } finally {
    await db.disconnect();
  }
}

// Обработчик для метода PATCH
export async function PATCH(req) {
  await db.connect();
  try {
    const { id, ...updateData } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "Item ID is required" }),
        { status: 400 }
      );
    }

    const updatedItem = await NewItemModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return new Response(
        JSON.stringify({ success: false, error: "Item not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, data: updatedItem }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  } finally {
    await db.disconnect();
  }
}
