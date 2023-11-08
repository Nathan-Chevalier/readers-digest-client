import { useEffect, useState } from "react";
import { getAllCategories } from "../utils/fetch";
import { useNavigate } from "react-router-dom";

export const AddBook = () => {
  const navigate = useNavigate();

  const [allCategories, setAllCategories] = useState([
    { id: 1, name: "Fetch No Work" },
    { id: 2, name: "Fix your fetch" },
  ]);
  const [newBook, setNewBook] = useState({});
  const [chosenCategories, setChosenCategories] = useState(new Set());

  useEffect(() => {
    getAllCategories().then((categoryArray) => {
      setAllCategories(categoryArray);
    });
  }, []);

  const addBook = async (evt) => {
    evt.preventDefault();

    await fetch("http://localhost:8000/books", {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("book_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newBook,
        categories: Array.from(chosenCategories),
      }),
    });

    navigate("/");
  };

  const handleCategoryChosen = (category) => {
    const copy = new Set(chosenCategories);
    copy.has(category.id) ? copy.delete(category.id) : copy.add(category.id);
    setChosenCategories(copy);
  };

  return (
    <div className="__book-form-container__ flex flex-col items-center justify-center">
      <div className="__book-form-header__ text-4xl">
        ADD A BOOK TO THE COLLECTION
      </div>
      <form className="__book-form__ flex flex-col">
        <div className="__title-author-container__ flex justify-between">
          <fieldset className="__title__">
            <label className="">Title:</label>
            <input
              type="text"
              className="__title-input__"
              placeholder="Input book title..."
              onChange={(event) => {
                const copy = { ...newBook };
                copy.title = event.target.value;
                setNewBook(copy);
              }}
            />
          </fieldset>
          <fieldset className="__author__">
            <label className="">Author:</label>
            <input
              type="text"
              className="__author-input__"
              placeholder="Input author..."
              onChange={(event) => {
                const copy = { ...newBook };
                copy.author = event.target.value;
                setNewBook(copy);
              }}
            />
          </fieldset>
        </div>
        <div className="__isbn-cover-container__ flex justify-between">
          <fieldset className="__isbn__">
            <label className="">ISBN Number:</label>
            <input
              type="text"
              className="__ISBN-input__"
              placeholder="Input ISBN Number..."
              onChange={(event) => {
                const copy = { ...newBook };
                copy.isbn_number = event.target.value;
                setNewBook(copy);
              }}
            />
          </fieldset>
          <fieldset className="__cover__">
            <label className="">Cover Image URL:</label>
            <input
              type="text"
              className="__cover-input__"
              placeholder="Input cover URL..."
              onChange={(event) => {
                const copy = { ...newBook };
                copy.cover_image = event.target.value;
                setNewBook(copy);
              }}
            />
          </fieldset>
        </div>
        <label className=" text-center">
          Select Categories (All that apply)
        </label>
        <fieldset>
          {allCategories.map((c) => {
            return (
              <label key={c.id}>
                <input
                  type="checkbox"
                  checked={chosenCategories.has(c.id)}
                  onChange={() => {
                    handleCategoryChosen(c);
                  }}
                />
                {c.name}
              </label>
            );
          })}
        </fieldset>
        <button
          onClick={(event) => {
            addBook(event);
          }}
        >
          Save Book
        </button>
      </form>
    </div>
  );
};
