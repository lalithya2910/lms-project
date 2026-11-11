
import { useState } from "react";

function Books() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      category: "Fiction",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJjeK7zsJxuwPVEFXr-z2GwXcMAqVtdgdjkVZcVyESOA&s=10"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self Help",
      image: "https://jamesclear.com/wp-content/uploads/2026/07/atomic-habits-dots.png"
    },
    {
      id: 3,
      title: "Clean Code",
      author: "Robert Martin",
      category: "Programming",
      image: "https://m.media-amazon.com/images/I/71I-zd7XWkL._UF1000,1000_QL80_.jpg"
    },
    {
      id: 4,
      title: "Harry Potter",
      author: "J.K. Rowling",
      category: "Fantasy",
      image: "https://m.media-amazon.com/images/M/MV5BNTU1MzgyMDMtMzBlZS00YzczLThmYWEtMjU3YmFlOWEyMjE1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
      id: 5,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      category: "Finance",
      image: "https://www.porchlightbooks.com/cdn/shop/files/9780446677455.jpg?v=1729588472"
    },
    {
      id: 6,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      category: "Finance",
      image: "https://m.media-amazon.com/images/I/71oAJY1LbcL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 7,
      title: "Ikigai",
      author: "Hector Garcia",
      category: "Self Help",
      image: "https://m.media-amazon.com/images/I/71lJBs5MNlL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 8,
      title: "Deep Work",
      author: "Cal Newport",
      category: "Productivity",
      image: "https://m.media-amazon.com/images/I/61zt25yYrCL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 9,
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      category: "Self Help",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAYJpPTTm-kG3kCXegacJG7EwCUDnEI6VmDJEEf2ABxjbfhf51JK563tg&s=10"
    }
  ]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editError, setEditError] = useState("");

  const categories = [
    "All",
    "Fiction",
    "Self Help",
    "Programming",
    "Fantasy",
    "Finance",
    "Productivity"
  ];

  const filteredBooks = books
    .filter((book) =>
      `${book.title} ${book.author}`.toLowerCase().includes(search.toLowerCase())
    )
    .filter((book) =>
      selectedCategory === "All" || book.category === selectedCategory
    );

  function addBook() {
    if (!title.trim()) {
      setError("Book title is required");
      return;
    }

    if (!author.trim()) {
      setError("Author is required");
      return;
    }

    if (!category.trim()) {
      setError("Category is required");
      return;
    }

    const bookExists = books.some(
      (book) => book.title.toLowerCase() === title.trim().toLowerCase()
    );

    if (bookExists) {
      setError("Book already exists");
      return;
    }

    const newBook = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim(),
      category: category.trim(),
      image: ""
    };

    setBooks([...books, newBook]);
    setTitle("");
    setAuthor("");
    setCategory("");
    setError("");
    setShowForm(false);
  }

  function deleteBook(id) {
    setBooks(books.filter((book) => book.id !== id));
  }

  function editBook(book) {
    setEditId(book.id);
    setEditTitle(book.title);
    setEditAuthor(book.author);
    setEditCategory(book.category);
    setEditError("");
  }

  function saveEdit(id) {
    if (!editTitle.trim()) {
      setEditError("Book title is required");
      return;
    }

    if (!editAuthor.trim()) {
      setEditError("Author is required");
      return;
    }

    if (!editCategory.trim()) {
      setEditError("Category is required");
      return;
    }

    const bookExists = books.some(
      (book) =>
        book.id !== id &&
        book.title.toLowerCase() === editTitle.trim().toLowerCase()
    );

    if (bookExists) {
      setEditError("Book already exists");
      return;
    }

    const updatedBooks = books.map((book) =>
      book.id === id
        ? {
            ...book,
            title: editTitle.trim(),
            author: editAuthor.trim(),
            category: editCategory.trim()
          }
        : book
    );

    setBooks(updatedBooks);
    setEditId(null);
    setEditTitle("");
    setEditAuthor("");
    setEditCategory("");
    setEditError("");
  }

  function cancelEdit() {
    setEditId(null);
    setEditTitle("");
    setEditAuthor("");
    setEditCategory("");
    setEditError("");
  }

  return (
    <div className="books-page">

      <div className="books-page-header">
        <div>
          <p className="books-eyebrow">LIBRARY COLLECTION</p>
          <h1>Book Management</h1>
          <p className="books-subtitle">
            Organize, manage and explore your library collection.
          </p>
        </div>

        <div className="books-total">
          <div className="books-total-icon">
            <i className="bi bi-book-half"></i>
          </div>
          <div>
            <span>Total Books</span>
            <h2>{books.length}</h2>
          </div>
        </div>
      </div>

      <div className="books-toolbar">
        <div className="books-search">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search by book title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <i className="bi bi-x-circle"></i>
            </button>
          )}
        </div>

        <button
          className="add-book-btn"
          onClick={() => {
            setShowForm(!showForm);
            setError("");
          }}
        >
          <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-lg"}`}></i>
          {showForm ? "Close Form" : "Add New Book"}
        </button>
      </div>

      <div className="books-category-section">
        <div className="category-heading">
          <h3>Browse Categories</h3>
          <span>{filteredBooks.length} books found</span>
        </div>

        <div className="category-filter">
          {categories.map((categoryName) => (
            <button
              key={categoryName}
              className={
                selectedCategory === categoryName
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() => setSelectedCategory(categoryName)}
            >
              {categoryName}
            </button>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="book-form">
          <div className="book-form-heading">
            <div className="book-form-icon">
              <i className="bi bi-journal-plus"></i>
            </div>
            <div>
              <h2>Add New Book</h2>
              <p>Enter the details to add a book to your collection.</p>
            </div>
          </div>

          <div className="book-form-fields">
            <div className="book-input-group">
              <label>Book Title</label>
              <input
                type="text"
                placeholder="Enter book title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="book-input-group">
              <label>Author Name</label>
              <input
                type="text"
                placeholder="Enter author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="book-input-group">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {categories.filter((item) => item !== "All").map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          {error && <p className="book-error"><i className="bi bi-exclamation-circle"></i> {error}</p>}

          <div className="book-form-actions">
            <button className="form-cancel-btn" onClick={() => {
              setShowForm(false);
              setError("");
            }}>
              Cancel
            </button>
            <button className="form-submit-btn" onClick={addBook}>
              <i className="bi bi-plus-lg"></i> Add Book
            </button>
          </div>
        </div>
      )}

      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="book-card" key={book.id}>
              {editId === book.id ? (
                <div className="book-edit-form">
                  <div className="book-edit-heading">
                    <i className="bi bi-pencil-square"></i>
                    <h3>Edit Book Details</h3>
                  </div>

                  <div className="book-input-group">
                    <label>Book Title</label>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </div>

                  <div className="book-input-group">
                    <label>Author Name</label>
                    <input
                      value={editAuthor}
                      onChange={(e) => setEditAuthor(e.target.value)}
                    />
                  </div>

                  <div className="book-input-group">
                    <label>Category</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                    >
                      <option value="">Select category</option>
                      {categories.filter((item) => item !== "All").map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                  {editError && <p className="book-error">{editError}</p>}

                  <div className="book-card-actions">
                    <button className="save-book-btn" onClick={() => saveEdit(book.id)}>
                      <i className="bi bi-check-lg"></i> Save Changes
                    </button>
                    <button className="cancel-edit-btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="book-cover">
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.title}
                        className="book-image"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="book-image-placeholder">
                        <i className="bi bi-book"></i>
                        <span>BOOKNEST</span>
                      </div>
                    )}
                    <span className="book-category-badge">{book.category}</span>
                  </div>

                  <div className="book-card-content">
                    <h3>{book.title}</h3>
                    <p className="book-author">
                      <i className="bi bi-person"></i>
                      {book.author}
                    </p>

                    <div className="book-card-divider"></div>

                    <div className="book-card-actions">
                      <button className="edit-book-btn" onClick={() => editBook(book)}>
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                      <button className="delete-book-btn" onClick={() => deleteBook(book.id)}>
                        <i className="bi bi-trash3"></i> Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="books-empty">
            <i className="bi bi-journal-x"></i>
            <h3>No Books Found</h3>
            <p>Try changing your search or category filter.</p>
            <button onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

export default Books;
