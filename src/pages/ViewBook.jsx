import { useEffect, useState } from "react";
import { getOneBook } from "../utils/fetch";
import { useNavigate, useParams } from "react-router-dom";

export const ViewBook = () => {
  const { bookId } = useParams();
  const defaultReviewState = {
    book_id: bookId,
    rating: 1,
    comment: "",
  };
  const [book, setBook] = useState({
    id: 1,
    title: "useState Not Working",
    author: "Nathan Chevalier",
    isbn_number: 12345678,
    cover_image:
      "https://upload.wikimedia.org/wikipedia/commons/6/67/Nope_logo.jpg?20220811105328",
    user_id: 1,
    is_owner: true,
    categories: [
      {
        id: 1,
        name: "Not Real Data",
      },
    ],
    reviews: [
      {
        id: 1,
        book: 1,
        user: {
          first_name: "Nathan",
          last_name: "Chevalier",
        },
        rating: 1,
        comment: "Yep, fetch not working",
        date: "2023-11-09",
        is_owner: true,
      },
    ],
  });
  const [review, setReview] = useState(defaultReviewState);

  const addReview = async (evt) => {
    evt.preventDefault();

    await fetch("http://localhost:8000/reviews", {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("book_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    const updatedBook = await getOneBook(bookId);
    setBook(updatedBook);
    setReview(defaultReviewState);
  };

  useEffect(() => {
    getOneBook(bookId).then((bookObject) => {
      setBook(bookObject);
    });
  }, [bookId]);

  return (
    <div className="__book-container__ flex flex-col items-center justify-center">
      <div className="__info-review-container__">
        <div className="__info-container__">
          <div className="__book-title__ text-3xl">{book.title}</div>
          <div className="__author__ text-2xl">by {book.author}</div>
          <img src={book.cover_image} alt={book.title} />
          {book.categories.map((category) => {
            return <div key={category.id}>{category.name}</div>;
          })}
        </div>
        <form className="__review-container__">
          <fieldset className="__rating__">
            <label>Your Rating:</label>
            <select
              value={review.rating}
              onChange={(event) => {
                const copy = { ...review };
                copy.rating = event.target.value;
                setReview(copy);
              }}
            >
              {/* .keys() is needed by React for the iterated values*/}
              {[...Array(10).keys()].map((value) => (
                <option key={value + 1} value={value + 1}>
                  {value + 1}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <input
              type="text"
              className="__review-input__"
              value={review.comment}
              placeholder="Add your review..."
              onChange={(event) => {
                const copy = { ...review };
                copy.comment = event.target.value;
                setReview(copy);
              }}
            />
          </fieldset>
          <button
            onClick={(event) => {
              addReview(event);
            }}
          >
            Save Review
          </button>
        </form>
      </div>

      <div className="__review-header__">Reviews for this book:</div>
      {book?.reviews.map((review) => {
        return (
          <div className="__review-card__" key={review.id}>
            <div className="__review-header__">{`${review.user.first_name} ${review.user.last_name}'s ${review.rating}/10 review:`}</div>
            <div className="__review-body__">{review.comment}</div>
            <div className="__review-date__">{review.date}</div>
          </div>
        );
      })}
    </div>
  );
};
