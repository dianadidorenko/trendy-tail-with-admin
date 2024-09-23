import NewItemModel from "@/models/NewItem";
import db from "@/utils/db";

// Обработчик для метода GET
export async function GET(req, { params }) {
  const { itemId } = params;

  await db.connect();
  try {
    if (itemId) {
      const item = await NewItemModel.findById(itemId);

      if (!item) {
        return new Response(JSON.stringify({ error: "Товар не найден" }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify(item), { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } finally {
    await db.disconnect();
  }
}

// Обработчик для метода DELETE
export async function DELETE(req, { params }) {
  const { itemId } = params;

  await db.connect();
  try {
    const deletedItem = await NewItemModel.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return new Response(JSON.stringify({ error: "Товар не найден" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Товар успешно удален" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Ошибка при удалении товара:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } finally {
    await db.disconnect();
  }
}
