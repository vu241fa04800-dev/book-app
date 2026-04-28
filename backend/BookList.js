import React, { useEffect, useState } from "react";

function BookList() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  const addBook = () => {
    fetch("http://localhost:5000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, author })
    })
      .then(res => res.json())
      .then(newBook => {
        setBooks([...books, newBook]);
        setTitle("");
        setAuthor("");
      });
  };

  return (
    <div>
      <h2>Book List</h2>

      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} - {book.author}
          </li>
        ))}
      </ul>

      <h3>Add Book</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        placeholder="Author"
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />

      <button onClick={addBook}>Add</button>
    </div>
  );
}

export default BookList;