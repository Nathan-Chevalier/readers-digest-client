import { useEffect, useState } from "react";
import { getOneBook } from "../utils/fetch";
import { useParams } from "react-router-dom";

export const ViewBook = () => {
  const { bookId } = useParams();
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

  useEffect(() => {
    getOneBook(bookId).then((bookObject) => {
      setBook(bookObject);
    });
  }, []);
  return (
    <div className="__book-container__ flex flex-col items-center justify-center">
      <div className="__book-title__ text-3xl">{book.title}</div>
      <div className="__author__ text-2xl">by {book.author}</div>
      <img src={book.cover_image} alt={book.title} />
      {book.categories.map((category) => {
        return <div key={category.id}>{category.name}</div>;
      })}
      <div className="__review-header__">Reviews for this book:</div>
      {book?.reviews.map((review) => {
        return <div className="__review-card__" key={review.id}>
            <div className="__review-header__">{`${review.user.first_name} ${review.user.last_name}'s ${review.rating}/10 review:`}</div>
            <div className="__review-body__">{review.comment}</div>
            <div className="__review-date__">{review.date}</div>
        </div>;
      })}
    </div>
  );
};
