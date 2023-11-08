import { useEffect, useState } from "react";
import { getAllCategories } from "../utils/fetch";

export const AddBook = () => {
    const [allCategories, setAllCategories] = useState([
        {id: 1, name: "Fetch No Work"},
        {id: 2, name: "Fix your fetch"}
    ])

    useEffect(() => {
        getAllCategories().then((categoryArray) => {
            setAllCategories(categoryArray)
        })
    }, [])



  return <>ADD A BOOK</>;
};
