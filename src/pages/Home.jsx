import { useState } from "react";

export const Home = () => {
    const [allBooks, setAllBooks] = useState([
        {
            id: 1,
            title: "useState Not Working",
            author: "Nathan Chevalier",
            isbn_number: 12345678,
            cover_image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Nope_logo.jpg?20220811105328",
            user_id: 1,
            is_owner: true,
            categories: [
                {
                    "id": 1,
                    "name": "Not Real Data"
                }
            ]
        }
    ])

  return <>HOME PAGE, YOU GOT THERE!</>;
};
