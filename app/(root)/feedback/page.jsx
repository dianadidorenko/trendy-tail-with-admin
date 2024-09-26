"use client";

import "@/styles/feedback.css";

import { MessageSquareQuote, Pencil, Star } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Loader from "@/components/elements/Loader";

const FeedbackPage = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState("");
  const [userComment, setUserComment] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const calculateAverageRating = (feedbacks) => {
    if (feedbacks.length === 0) return 0;
    const totalRating = feedbacks.reduce(
      (sum, feedback) => sum + feedback.rating,
      0
    );
    return (totalRating / feedbacks.length).toFixed(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const feedbackData = {
      name: userInfo,
      message: userComment,
      rating,
    };

    fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Ваш відгук був відправлений");
          setUserInfo("");
          setUserComment("");
          setRating(0);
          fetchFeedbacks(); // Обновляем список отзывов
        } else {
          toast.error("Ваш відгук не був відправлений");
          console.error("Error submitting feedback:", data.error);
        }
      });
  };

  const fetchFeedbacks = () => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFeedbacks(data.feedbacks);
          setLoading(false);
          setAverageRating(calculateAverageRating(data.feedbacks));
          router.refresh();
        } else {
          console.error("Error fetching feedbacks:", data.error);
        }
      });
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <section className="page__feedback feedback">
      <div className="feedback__container px-10">
        <div className="comment-block flex flex-col items-center justify-center gap-6">
          <div className="flex gap-4 items-baseline justify-center">
            <h2 className="font-bold text-xl text-center underline flex gap-4 items-center justify-center">
              Відгуки <MessageSquareQuote size={30} />
            </h2>
            <span className="text-lg">
              Загальна оцінка: {loading ? <Loader /> : averageRating}
            </span>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback) => (
                  <div
                    key={feedback._id}
                    className="feedback-item border border-slate-300 rounded-lg p-4 flex flex-col justify-between"
                  >
                    <p className="text-lg">
                      <strong>Ім&apos;я:</strong> {feedback.name}
                    </p>
                    <p className="text-lg">
                      <strong>Коментар:</strong> {feedback.message}
                    </p>
                    <div className="star-block mt-2">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          style={{
                            fill: index < feedback.rating ? "gold" : "gray",
                          }}
                          color={index < feedback.rating ? "gold" : "gray"}
                        />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>Поки що відгуків нема.</p>
              )}
            </div>
          )}
        </div>

        <h2 className="text-2xl underline mb-16 flex gap-4 items-center">
          Залишити відгук <Pencil size={26} />
        </h2>

        <div className="leave-comment-block">
          <p className="leave-comment-title text-center">Ваш відгук</p>

          <form className="form-block" onSubmit={handleSubmit}>
            <div className="name-block">
              <label>Ім&apos;я:</label>
              <input
                type="text"
                value={userInfo}
                onChange={(e) => setUserInfo(e.target.value)}
                required
                className="dark:bg-white dark:text-gray-600"
              />
            </div>

            <div className="comm-block">
              <label>Коментар:</label>
              <textarea
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                required
                className="dark:bg-white dark:text-gray-600"
              />

              <div className="stars">
                <label>Ваша оцінка:</label>
                <div className="star-block flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      onClick={() => handleStarClick(index)}
                      style={{ cursor: "pointer" }}
                    >
                      {index < rating ? (
                        <Star style={{ fill: "gold" }} color="gold" />
                      ) : (
                        <Star color="gray" fill="gray" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <img
              src="/pages/feedback/01.jpg"
              className="feedback-img1"
              alt="Feedback image 1"
            />
            <img
              src="/pages/feedback/02.jpg"
              className="feedback-img2"
              alt="Feedback image 2"
            />
            <img
              src="/pages/feedback/03.jpg"
              className="feedback-img3"
              alt="Feedback image 3"
            />

            <button className="button border p-2 rounded-md" type="submit">
              Додати коментар
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FeedbackPage;
