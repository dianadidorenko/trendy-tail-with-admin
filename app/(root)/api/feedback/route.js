import FeedbackModel from "@/models/Feedback";
import db from "@/utils/db";

// Обработчик для метода POST
export async function POST(req) {
  await db.connect();
  try {
    const feedbackData = await req.json();
    console.log("Received itemData:", feedbackData);

    if (
      !feedbackData.name ||
      !feedbackData.message ||
      feedbackData.rating === undefined
    ) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const feedback = new FeedbackModel(feedbackData);

    await feedback.save();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error adding feedback:", error);
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
    const feedbacks = await FeedbackModel.find();
    return new Response(JSON.stringify({ success: true, feedbacks }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving feedbacks:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  } finally {
    await db.disconnect();
  }
}
