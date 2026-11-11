
import { useState } from "react";

function Transaction({ transactions, setTransactions }) {
  const [showForm, setShowForm] = useState(false);
  const [book, setBook] = useState("");
  const [member, setMember] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

 
const availableBooks = [
  {
    id: 1,
    title: "The Alchemist",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJjeK7zsJxuwPVEFXr-z2GwXcMAqVtdgdjkVZcVyESOA&s=10"
  },
  {
    id: 2,
    title: "Atomic Habits",
    image: "https://jamesclear.com/wp-content/uploads/2026/07/atomic-habits-dots.png"
  },
  {
    id: 3,
    title: "Clean Code",
    image: "https://m.media-amazon.com/images/I/71I-zd7XWkL._UF1000,1000_QL80_.jpg"
  },
  {
    id: 4,
    title: "Harry Potter",
    image: "https://m.media-amazon.com/images/M/MV5BNTU1MzgyMDMtMzBlZS00YzczLThmYWEtMjU3YmFlOWEyMjE1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  },
  {
    id: 5,
    title: "Rich Dad Poor Dad",
    image: "https://www.porchlightbooks.com/cdn/shop/files/9780446677455.jpg?v=1729588472"
  },
  {
    id: 6,
    title: "The Psychology of Money",
    image: "https://m.media-amazon.com/images/I/71oAJY1LbcL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 7,
    title: "Ikigai",
    image: "https://m.media-amazon.com/images/I/71lJBs5MNlL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 8,
    title: "Deep Work",
    image: "https://m.media-amazon.com/images/I/61zt25yYrCL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 9,
    title: "Think and Grow Rich",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAYJpPTTm-kG3kCXegacJG7EwCUDnEI6VmDJEEf2ABxjbfhf51JK563tg&s=10"
  }
];


  const availableMembers = [
    "Ambica",
    "Narendra",
    "Lalithya",
    "Panitha",
    "Maheswari",
    "Sai",
    "Rahul",
    "Priya",
    "Kiran",
    "Anjali"
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function isOverdue(transaction) {
    if (transaction.status !== "Issued") return false;

    const due = new Date(`${transaction.dueDate}T00:00:00`);
    return due < today;
  }

  const issuedCount = transactions.filter(
    (t) => t.status === "Issued"
  ).length;

  const returnedCount = transactions.filter(
    (t) => t.status === "Returned"
  ).length;

  const overdueCount = transactions.filter(isOverdue).length;

  function addTransaction() {
    if (!book) {
      setError("Please select a book");
      return;
    }

    if (!member) {
      setError("Please select a member");
      return;
    }

    const alreadyIssued = transactions.some(
      (transaction) =>
        transaction.book === book &&
        transaction.status === "Issued"
    );

    if (alreadyIssued) {
      setError("This book is already issued");
      return;
    }

    const issueDate = new Date();
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 7);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const selectedBook = availableBooks.find(
  (item) => item.title === book
);

const newTransaction = {
  id: Date.now(),
  book,
  member,
  image: selectedBook.image,
  date: formatDate(issueDate),
  dueDate: formatDate(dueDate),
  status: "Issued"
};

    setTransactions((previous) => [...previous, newTransaction]);

    setBook("");
    setMember("");
    setError("");
    setShowForm(false);
  }

  function returnBook(id) {
    setTransactions((previous) =>
      previous.map((transaction) =>
        transaction.id === id
          ? { ...transaction, status: "Returned" }
          : transaction
      )
    );
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const searchText = search.toLowerCase();

    return (
      transaction.book.toLowerCase().includes(searchText) ||
      transaction.member.toLowerCase().includes(searchText) ||
      transaction.status.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="transactions-page">

      {/* Header */}
      <div className="transactions-page-header">
        <div>
          <span className="transactions-eyebrow">
            LIBRARY MANAGEMENT
          </span>
          <h1>Transactions</h1>
          <p>Track book issues, returns and due dates.</p>
        </div>

        <button
          className="add-transaction-btn"
          onClick={() => {
            setShowForm(!showForm);
            setError("");
          }}
        >
          <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-lg"}`}></i>
          {showForm ? "Close Form" : "Issue Book"}
        </button>
      </div>

      {/* Statistics */}
      <div className="transaction-stats">

        <div className="transaction-stat-card">
          <div className="transaction-stat-icon total">
            <i className="bi bi-arrow-left-right"></i>
          </div>
          <div>
            <span>Total Transactions</span>
            <h2>{transactions.length}</h2>
          </div>
        </div>

        <div className="transaction-stat-card">
          <div className="transaction-stat-icon issued">
            <i className="bi bi-book-half"></i>
          </div>
          <div>
            <span>Currently Issued</span>
            <h2>{issuedCount}</h2>
          </div>
        </div>

        <div className="transaction-stat-card">
          <div className="transaction-stat-icon returned">
            <i className="bi bi-check-circle"></i>
          </div>
          <div>
            <span>Returned Books</span>
            <h2>{returnedCount}</h2>
          </div>
        </div>

        <div className="transaction-stat-card">
          <div className="transaction-stat-icon overdue">
            <i className="bi bi-clock-history"></i>
          </div>
          <div>
            <span>Overdue Books</span>
            <h2>{overdueCount}</h2>
          </div>
        </div>

      </div>

      {/* Issue Book Form */}
      {showForm && (
        <div className="transaction-form">

          <div className="transaction-form-heading">
            <div className="transaction-form-icon">
              <i className="bi bi-journal-plus"></i>
            </div>
            <div>
              <h2>Issue a Book</h2>
              <p>Select a book and member to create a transaction.</p>
            </div>
          </div>

          <div className="transaction-form-fields">

            <div className="transaction-input-group">
              <label>Select Book</label>
              <select
                value={book}
                onChange={(e) => setBook(e.target.value)}
              >
                <option value="">Choose a book</option>
                {availableBooks.map((bookItem) => (
  <option key={bookItem.id} value={bookItem.title}>
    {bookItem.title}
  </option>
))}
              </select>
            </div>

            <div className="transaction-input-group">
              <label>Select Member</label>
              <select
                value={member}
                onChange={(e) => setMember(e.target.value)}
              >
                <option value="">Choose a member</option>
                {availableMembers.map((memberName) => (
                  <option key={memberName} value={memberName}>
                    {memberName}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="transaction-note">
            <i className="bi bi-info-circle"></i>
            The return date will automatically be set to 7 days after issue.
          </div>

          {error && (
            <p className="transaction-error">
              <i className="bi bi-exclamation-circle"></i> {error}
            </p>
          )}

          <div className="transaction-form-actions">
            <button
              className="transaction-cancel-btn"
              onClick={() => {
                setShowForm(false);
                setError("");
              }}
            >
              Cancel
            </button>

            <button
              className="transaction-submit-btn"
              onClick={addTransaction}
            >
              <i className="bi bi-check-lg"></i> Confirm Issue
            </button>
          </div>

        </div>
      )}

      {/* List Header and Search */}
      <div className="transaction-list-header">
        <div>
          <h2>All Transactions</h2>
          <p>Manage your library issue and return records.</p>
        </div>

        <div className="transaction-search">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search book, member or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <i className="bi bi-x-circle"></i>
            </button>
          )}
        </div>
      </div>

      {/* Transactions Grid */}
      {filteredTransactions.length > 0 ? (
        <div className="transactions-grid">

          {filteredTransactions.map((transaction) => {
            const overdue = isOverdue(transaction);

            return (
              <div className="transaction-card" key={transaction.id}>

                <div className="transaction-card-top">
                  <div className="transaction-book-icon">
                    <i className="bi bi-book"></i>
                  </div>

                  <span
                    className={`transaction-status ${
                      transaction.status === "Returned"
                        ? "returned-status"
                        : overdue
                        ? "overdue-status"
                        : "issued-status"
                    }`}
                  >
                    <span></span>
                    {transaction.status === "Returned"
                      ? "Returned"
                      : overdue
                      ? "Overdue"
                      : "Issued"}
                  </span>
                </div>

                <div className="transaction-book-info">
                  <h3>{transaction.book}</h3>
                  <p>Transaction ID: #{transaction.id}</p>
                </div>

                <div className="transaction-details">

                  <div>
                    <span className="transaction-detail-icon">
                      <i className="bi bi-person"></i>
                    </span>
                    <div>
                      <small>Member</small>
                      <p>{transaction.member}</p>
                    </div>
                  </div>

                  <div>
                    <span className="transaction-detail-icon">
                      <i className="bi bi-calendar-check"></i>
                    </span>
                    <div>
                      <small>Issue Date</small>
                      <p>{transaction.date}</p>
                    </div>
                  </div>

                  <div>
                    <span className="transaction-detail-icon">
                      <i className="bi bi-calendar-event"></i>
                    </span>
                    <div>
                      <small>Due Date</small>
                      <p>{transaction.dueDate}</p>
                    </div>
                  </div>

                </div>

                {transaction.status === "Issued" && (
                  <button
                    className="return-book-btn"
                    onClick={() => returnBook(transaction.id)}
                  >
                    <i className="bi bi-arrow-return-left"></i>
                    Return Book
                  </button>
                )}

              </div>
            );
          })}

        </div>
      ) : (
        <div className="transactions-empty">
          <div>
            <i className="bi bi-arrow-left-right"></i>
          </div>
          <h3>No transactions found</h3>
          <p>
            {search
              ? "Try searching with a different keyword."
              : "Issue a book to create your first transaction."}
          </p>
          {search && (
            <button onClick={() => setSearch("")}>
              Clear Search
            </button>
          )}
        </div>
      )}

    </div>
  );
}

export default Transaction;
