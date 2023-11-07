export const getAllBooks = () => {
  return fetch(`http://localhost:8000/books`).then((res) => res.json());
};
