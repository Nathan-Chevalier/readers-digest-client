import { useState } from "react";

export const Home = () => {
  const [allBooks, setAllBooks] = useState([
    {
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
    },
  ]);

  return (
    <div className="__front-page-container__ self-center flex flex-col gap-4 items-center justify-center">
      <div className="__front-page-title__ text-3xl bg-cyan-600 text-white py-4 px-12 rounded-3xl font-bold">
        Welcome to Readers Digest, check out all of these books!
      </div>
      <div className="__book-list-container__">
        {allBooks.map((book) => {
          return (
            <div
              key={book.id}
              className="__book-list-card__ flex flex-col gap-2 justify-between items-center"
            >
              <span className="__book-title__ text-2xl bg-slate-400/20 px-12 py-2">
                &quot;{book.title}&quot;
              </span>
              <img
                className="__book-image__"
                src={book.cover_image}
                alt={book.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
