
import { useState } from "react";

const initialBooks = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJjeK7zsJxuwPVEFXr-z2GwXcMAqVtdgdjkVZcVyESOA&s=10",
    description: "A philosophical novel about a young shepherd who travels in search of his personal legend and treasure.",
    publisher: "HarperOne",
    publicationYear: "1988",
    isbn: "9780061122415",
    pages: "208"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    image: "https://jamesclear.com/wp-content/uploads/2026/07/atomic-habits-dots.png",
    description: "A practical guide to building good habits, breaking bad ones and making small improvements every day.",
    publisher: "Avery",
    publicationYear: "2018",
    isbn: "9780735211292",
    pages: "320"
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert Martin",
    category: "Programming",
    image: "https://m.media-amazon.com/images/I/71I-zd7XWkL._UF1000,1000_QL80_.jpg",
    description: "A programming guide that explains how to write readable, maintainable and well-structured code.",
    publisher: "Prentice Hall",
    publicationYear: "2008",
    isbn: "9780132350884",
    pages: "464"
  },
  {
    id: 4,
    title: "Harry Potter",
    author: "J.K. Rowling",
    category: "Fantasy",
    image: "https://m.media-amazon.com/images/M/MV5BNTU1MzgyMDMtMzBlZS00YzczLThmYWEtMjU3YmFlOWEyMjE1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    description: "A fantasy story about a young wizard who discovers his magical identity and attends Hogwarts School.",
    publisher: "Bloomsbury",
    publicationYear: "1997",
    isbn: "9780747532699",
    pages: "223"
  },
  {
    id: 5,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Finance",
    image: "https://www.porchlightbooks.com/cdn/shop/files/9780446677455.jpg?v=1729588472",
    description: "A personal finance book that discusses financial education, investing and different approaches to money.",
    publisher: "Warner Books",
    publicationYear: "1997",
    isbn: "9780446677455",
    pages: "336"
  },
  {
    id: 6,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    image: "https://m.media-amazon.com/images/I/71oAJY1LbcL._AC_UF1000,1000_QL80_.jpg",
    description: "Explores how human behaviour, emotions and personal experiences influence financial decisions.",
    publisher: "Harriman House",
    publicationYear: "2020",
    isbn: "9780857197689",
    pages: "256"
  },
  {
    id: 7,
    title: "Ikigai",
    author: "Hector Garcia",
    category: "Self Help",
    image: "https://m.media-amazon.com/images/I/71lJBs5MNlL._AC_UF1000,1000_QL80_.jpg",
    description: "Explores the Japanese concept of finding purpose, meaning and enjoyment in everyday life.",
    publisher: "Penguin Books",
    publicationYear: "2016",
    isbn: "9781786330895",
    pages: "208"
  },
  {
    id: 8,
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    image: "https://m.media-amazon.com/images/I/61zt25yYrCL._AC_UF1000,1000_QL80_.jpg",
    description: "Explains how focused, distraction-free work can improve productivity and professional performance.",
    publisher: "Grand Central Publishing",
    publicationYear: "2016",
    isbn: "9781455586691",
    pages: "304"
  },
  {
    id: 9,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    category: "Self Help",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAYJpPTTm-kG3kCXegacJG7EwCUDnEI6VmDJEEf2ABxjbfhf51JK563tg&s=10",
    description: "A personal development book focused on goal setting, mindset and principles for achieving success.",
    publisher: "The Ralston Society",
    publicationYear: "1937",
    isbn: "9781585424337",
    pages: "238"
  }
];

const emptyBook = {
  title: "",
  author: "",
  category: "",
  image: "",
  description: "",
  publisher: "",
  publicationYear: "",
  isbn: "",
  pages: ""
};

function Books() {
  const [books, setBooks] = useState(initialBooks);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyBook);
  const [error, setError] = useState("");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(emptyBook);
  const [editError, setEditError] = useState("");

  const [selectedBook, setSelectedBook] = useState(null);

  const categories = [
    "All",
    "Fiction",
    "Self Help",
    "Programming",
    "Fantasy",
    "Finance",
    "Productivity"
  ];

  // Search and category filtering
  const filteredBooks = books
    .filter((book) =>
      `${book.title} ${book.author}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((book) =>
      selectedCategory === "All" ||
      book.category === selectedCategory
    );

  // Handle add form inputs
  function handleFormChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setError("");
  }

  // Handle edit form inputs
  function handleEditChange(e) {
    const { name, value } = e.target;

    setEditData((previous) => ({
      ...previous,
      [name]: value
    }));

    setEditError("");
  }

  // Validate book details
  function validateBook(data, currentId = null) {
    if (!data.title.trim()) {
      return "Book title is required";
    }

    if (!data.author.trim()) {
      return "Author name is required";
    }

    if (!data.category) {
      return "Please select a category";
    }

    if (!data.description.trim()) {
      return "Book description is required";
    }

    if (!data.publisher.trim()) {
      return "Publisher name is required";
    }

    if (
      !data.publicationYear ||
      !/^\d{4}$/.test(data.publicationYear) ||
      Number(data.publicationYear) < 1000 ||
      Number(data.publicationYear) > new Date().getFullYear()
    ) {
      return "Enter a valid publication year";
    }

    if (!data.isbn.trim()) {
      return "ISBN is required";
    }

    if (!/^[0-9Xx-]+$/.test(data.isbn.trim())) {
      return "Enter a valid ISBN format";
    }

    if (!data.pages || !/^\d+$/.test(data.pages) || Number(data.pages) < 1) {
      return "Enter a valid number of pages";
    }

    if (
      data.image.trim() &&
      !/^https?:\/\/\S+$/i.test(data.image.trim())
    ) {
      return "Enter a valid image URL starting with http:// or https://";
    }

    const duplicate = books.some(
      (book) =>
        book.id !== currentId &&
        (
          book.title.toLowerCase() === data.title.trim().toLowerCase() ||
          book.isbn.replace(/[-\s]/g, "").toLowerCase() ===
            data.isbn.replace(/[-\s]/g, "").toLowerCase()
        )
    );

    if (duplicate) {
      return "Book title or ISBN already exists";
    }

    return "";
  }

  // Add new book
  function addBook() {
    const validationError = validateBook(formData);

    if (validationError) {
      setError(validationError);
      return;
    }

    const newBook = {
      id: Date.now(),
      ...formData,
      title: formData.title.trim(),
      author: formData.author.trim(),
      description: formData.description.trim(),
      publisher: formData.publisher.trim(),
      isbn: formData.isbn.trim(),
      image: formData.image.trim()
    };

    setBooks((previous) => [...previous, newBook]);

    setFormData(emptyBook);
    setError("");
    setShowForm(false);
  }

  // Delete book
  function deleteBook(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    setBooks((previous) =>
      previous.filter((book) => book.id !== id)
    );

    if (selectedBook?.id === id) {
      setSelectedBook(null);
    }
  }

  // Start editing book
  function editBook(book) {
    setEditId(book.id);
    setEditData({ ...book });
    setEditError("");
  }

  // Save edited book
  function saveEdit(id) {
    const validationError = validateBook(editData, id);

    if (validationError) {
      setEditError(validationError);
      return;
    }

    setBooks((previous) =>
      previous.map((book) =>
        book.id === id
          ? {
              ...editData,
              id,
              title: editData.title.trim(),
              author: editData.author.trim(),
              description: editData.description.trim(),
              publisher: editData.publisher.trim(),
              isbn: editData.isbn.trim(),
              image: editData.image.trim()
            }
          : book
      )
    );

    setEditId(null);
    setEditData(emptyBook);
    setEditError("");
  }

  // Cancel editing
  function cancelEdit() {
    setEditId(null);
    setEditData(emptyBook);
    setEditError("");
  }

  // Reusable book form fields
  function renderBookFields(data, changeHandler) {
    return (
      <div className="book-form-fields">

        <div className="book-input-group">
          <label>Book Title *</label>
          <input
            name="title"
            value={data.title}
            onChange={changeHandler}
            placeholder="Enter book title"
          />
        </div>

        <div className="book-input-group">
          <label>Author Name *</label>
          <input
            name="author"
            value={data.author}
            onChange={changeHandler}
            placeholder="Enter author name"
          />
        </div>

        <div className="book-input-group">
          <label>Category *</label>
          <select
            name="category"
            value={data.category}
            onChange={changeHandler}
          >
            <option value="">Select category</option>
            {categories.filter((item) => item !== "All").map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="book-input-group">
          <label>Publisher *</label>
          <input
            name="publisher"
            value={data.publisher}
            onChange={changeHandler}
            placeholder="Enter publisher name"
          />
        </div>

        <div className="book-input-group">
          <label>Publication Year *</label>
          <input
            type="number"
            name="publicationYear"
            value={data.publicationYear}
            onChange={changeHandler}
            placeholder="e.g. 2020"
          />
        </div>

        <div className="book-input-group">
          <label>ISBN *</label>
          <input
            name="isbn"
            value={data.isbn}
            onChange={changeHandler}
            placeholder="Enter ISBN number"
          />
        </div>

        <div className="book-input-group">
          <label>Total Pages *</label>
          <input
            type="number"
            name="pages"
            value={data.pages}
            onChange={changeHandler}
            placeholder="Enter number of pages"
          />
        </div>

        <div className="book-input-group">
          <label>Book Cover Image URL</label>
          <input
            type="url"
            name="image"
            value={data.image}
            onChange={changeHandler}
            placeholder="Paste image URL (optional)"
          />
        </div>

        <div className="book-input-group book-description-field">
          <label>Book Description *</label>
          <textarea
            name="description"
            value={data.description}
            onChange={changeHandler}
            placeholder="Write a short description about the book"
            rows="4"
          />
        </div>

      </div>
    );
  }

  return (
    <div className="books-page">

      {/* PAGE HEADER */}
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

      {/* SEARCH AND ADD */}
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
            setFormData(emptyBook);
            setError("");
          }}
        >
          <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-lg"}`}></i>
          {showForm ? "Close Form" : "Add New Book"}
        </button>
      </div>

      {/* CATEGORY FILTER */}
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

      {/* ADD BOOK FORM */}
      {showForm && (
        <div className="book-form">

          <div className="book-form-heading">
            <div className="book-form-icon">
              <i className="bi bi-journal-plus"></i>
            </div>

            <div>
              <h2>Add New Book</h2>
              <p>Enter complete book information below.</p>
            </div>
          </div>

          {renderBookFields(formData, handleFormChange)}

          {error && (
            <p className="book-error">
              <i className="bi bi-exclamation-circle"></i> {error}
            </p>
          )}

          <div className="book-form-actions">
            <button
              className="form-cancel-btn"
              onClick={() => {
                setShowForm(false);
                setFormData(emptyBook);
                setError("");
              }}
            >
              Cancel
            </button>

            <button className="form-submit-btn" onClick={addBook}>
              <i className="bi bi-plus-lg"></i> Add Book
            </button>
          </div>
        </div>
      )}

      {/* BOOK CARDS */}
      <div className="books-grid">

        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (

            <div className="book-card" key={book.id}>

              {editId === book.id ? (

                /* EDIT FORM */
                <div className="book-edit-form">

                  <div className="book-edit-heading">
                    <i className="bi bi-pencil-square"></i>
                    <h3>Edit Book Details</h3>
                  </div>

                  {renderBookFields(editData, handleEditChange)}

                  {editError && (
                    <p className="book-error">{editError}</p>
                  )}

                  <div className="book-card-actions">
                    <button
                      className="save-book-btn"
                      onClick={() => saveEdit(book.id)}
                    >
                      <i className="bi bi-check-lg"></i> Save Changes
                    </button>

                    <button
                      className="cancel-edit-btn"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>

                </div>

              ) : (

                /* BOOK DISPLAY */
                <>
                  <div className="book-cover">

                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.title}
                        className="book-image"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="book-image-placeholder">
                        <i className="bi bi-book"></i>
                        <span>BOOKNEST</span>
                      </div>
                    )}

                    <span className="book-category-badge">
                      {book.category}
                    </span>

                  </div>

                  <div className="book-card-content">

                    <h3>{book.title}</h3>

                    <p className="book-author">
                      <i className="bi bi-person"></i>
                      {" "}{book.author}
                    </p>

                    <div className="book-card-divider"></div>

                    <div className="book-card-actions">

                      <button
                        className="edit-book-btn"
                        onClick={() => editBook(book)}
                      >
                        <i className="bi bi-pencil"></i> Edit
                      </button>

                      <button
                        className="delete-book-btn"
                        onClick={() => deleteBook(book.id)}
                      >
                        <i className="bi bi-trash3"></i> Delete
                      </button>

                    </div>

                    <button
                      className="view-book-details-btn"
                      onClick={() => setSelectedBook(book)}
                    >
                      <i className="bi bi-eye"></i>
                      View Details
                    </button>

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

      {/* BOOK DETAILS POPUP */}
      {selectedBook && (
        <div
          className="book-modal-overlay"
          onClick={() => setSelectedBook(null)}
        >

          <div
            className="book-details-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="book-modal-header">
              <div>
                <span>BOOKNEST COLLECTION</span>
                <h2>Book Details</h2>
              </div>

              <button
                onClick={() => setSelectedBook(null)}
                aria-label="Close details"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="book-modal-content">

              <div className="book-modal-cover">

                {selectedBook.image ? (
                  <img
                    src={selectedBook.image}
                    alt={selectedBook.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="book-image-placeholder">
                    <i className="bi bi-book"></i>
                    <span>BOOKNEST</span>
                  </div>
                )}

              </div>

              <div className="book-modal-information">

                <span className="book-modal-category">
                  {selectedBook.category}
                </span>

                <h3>{selectedBook.title}</h3>

                <p className="book-modal-author">
                  <i className="bi bi-person"></i>
                  {" "}By {selectedBook.author}
                </p>

                <div className="book-modal-description">
                  <h4>About This Book</h4>
                  <p>{selectedBook.description || "No description available."}</p>
                </div>

                <div className="book-modal-meta">

                  <div>
                    <span><i className="bi bi-building"></i> Publisher</span>
                    <strong>{selectedBook.publisher || "N/A"}</strong>
                  </div>

                  <div>
                    <span><i className="bi bi-calendar3"></i> Publication Year</span>
                    <strong>{selectedBook.publicationYear || "N/A"}</strong>
                  </div>

                  <div>
                    <span><i className="bi bi-upc"></i> ISBN</span>
                    <strong>{selectedBook.isbn || "N/A"}</strong>
                  </div>

                  <div>
                    <span><i className="bi bi-file-text"></i> Pages</span>
                    <strong>{selectedBook.pages || "N/A"}</strong>
                  </div>

                </div>

              </div>

            </div>

            <div className="book-modal-footer">
              <button onClick={() => setSelectedBook(null)}>
                Close
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Books;
