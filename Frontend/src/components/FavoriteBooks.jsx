import React, { useEffect, useState } from 'react'

function FavoriteBooks() {
            const [books, setBooks] = useState([]);

            useEffect(() => {
                        fetch("9f6ef1f5-df83-4561-989d-81a70802aa93 ")
                          .then((res) => res.json())
                          .then((data) => console.log(data));
            })
  return (
    <div>
      FavoriteBooks
    </div>
  )
}

export default FavoriteBooks
