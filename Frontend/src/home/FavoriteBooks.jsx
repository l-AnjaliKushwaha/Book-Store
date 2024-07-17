import React, { useEffect, useState } from "react";
import BookCards from "../components/BookCards";

function FavoriteBooks() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/all-books")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setBooks(data))
      .catch((error) => {
        console.error("There was an error!", error);
        setError(error);
      });
  }, []); // Note the empty dependency array to run the effect only once

  return (
    <div>
      {error ? (
        <p>There was an error loading the books: {error.message}</p>
      ) : (
        <BookCards books={books} headline="Best Seller Books" />
      )}
    </div>
  );
}

export default FavoriteBooks;
