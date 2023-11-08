import { useEffect, useState } from "react";
import { getAllCategories } from "../utils/fetch";
import { useNavigate } from "react-router-dom";

export const AddBook = () => {
const navigate = useNavigate()

    const [allCategories, setAllCategories] = useState([
        {id: 1, name: "Fetch No Work"},
        {id: 2, name: "Fix your fetch"}
    ])
    const [newBook, setNewBook] = useState({})

    useEffect(() => {
        getAllCategories().then((categoryArray) => {
            setAllCategories(categoryArray)
        })
    }, [])

    const addBook = async (evt) => {
        evt.preventDefault();

        await fetch("http://localhost:8000/books", {
            method: "POST",
            headers: {
                Authorization: `Token ${
                    JSON.parse(localStorage.getItem("rock_token")).token
                }`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook)
        })

        navigate("/")
    }


  return <>ADD A BOOK</>;
};
