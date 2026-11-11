
function Dashboard({
  transactions = [],
  books = [],
  members = []
}) {

  // Today's date (time removed)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Book images based on book title
  const bookImages = {
    "The Alchemist":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJjeK7zsJxuwPVEFXr-z2GwXcMAqVtdgdjkVZcVyESOA&s=10",

    "Atomic Habits":
      "https://jamesclear.com/wp-content/uploads/2026/07/atomic-habits-dots.png",

    "Clean Code":
      "https://m.media-amazon.com/images/I/71I-zd7XWkL._UF1000,1000_QL80_.jpg",

    "Harry Potter":
      "https://m.media-amazon.com/images/M/MV5BNTU1MzgyMDMtMzBlZS00YzczLThmYWEtMjU3YmFlOWEyMjE1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",

    "Rich Dad Poor Dad":
      "https://www.porchlightbooks.com/cdn/shop/files/9780446677455.jpg?v=1729588472",

    "The Psychology of Money":
      "https://m.media-amazon.com/images/I/71oAJY1LbcL._AC_UF1000,1000_QL80_.jpg",

    "Ikigai":
      "https://m.media-amazon.com/images/I/71lJBs5MNlL._AC_UF1000,1000_QL80_.jpg",

    "Deep Work":
      "https://m.media-amazon.com/images/I/61zt25yYrCL._AC_UF1000,1000_QL80_.jpg",

    "Think and Grow Rich":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAYJpPTTm-kG3kCXegacJG7EwCUDnEI6VmDJEEf2ABxjbfhf51JK563tg&s=10"
  };

  // Issued books count
  const issuedBooks = transactions.filter(
    (transaction) => transaction.status === "Issued"
  ).length;

  // Overdue books count
  const overdueBooks = transactions.filter((transaction) => {
    if (transaction.status !== "Issued" || !transaction.dueDate) {
      return false;
    }

    const dueDate = new Date(`${transaction.dueDate}T00:00:00`);

    return !isNaN(dueDate.getTime()) && dueDate < today;
  }).length;

  // Dashboard statistics
  const stats = [
    {
      title: "Total Books",
      value: books.length,
      icon: "bi bi-book-half",
      color: "blue",
      description: "Books available in library"
    },
    {
      title: "Total Members",
      value: members.length,
      icon: "bi bi-people-fill",
      color: "purple",
      description: "Registered library members"
    },
    {
      title: "Issued Books",
      value: issuedBooks,
      icon: "bi bi-journal-arrow-up",
      color: "orange",
      description: "Currently issued books"
    },
    {
      title: "Overdue Books",
      value: overdueBooks,
      icon: "bi bi-clock-history",
      color: "red",
      description: "Books past their due date"
    }
  ];

  // Latest 5 transactions
  const recentTransactions = [...transactions]
    .reverse()
    .slice(0, 5);

  // Date formatting
  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(`${date}T00:00:00`);

    if (isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  // Get book image
  const getBookImage = (transaction) => {
    return (
      transaction.image ||
      bookImages[transaction.book] ||
      "https://placehold.co/60x80/eef2f7/64748b?text=Book"
    );
  };

  // Image fallback
  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      "https://placehold.co/60x80/eef2f7/64748b?text=Book";
  };

  return (
    <div className="dashboard">

      {/* DASHBOARD HEADER */}

      <div className="dashboard-header">

        <div>
          <p className="dashboard-eyebrow">
            LIBRARY OVERVIEW
          </p>

          <h1>Dashboard</h1>

          <p className="dashboard-welcome">
            Welcome back! Here's what's happening in your library today.
          </p>
        </div>

        <div className="dashboard-date">
          <i className="bi bi-calendar3"></i>

          {today.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })}
        </div>

      </div>


      {/* STATISTICS */}

      <div className="stats-container">

        {stats.map((stat) => (

          <div className="stat-card" key={stat.title}>

            <div className="stat-top">

              <div className={`stat-icon ${stat.color}`}>
                <i className={stat.icon}></i>
              </div>

              <span className="stat-label">
                {stat.title}
              </span>

            </div>

            <h2>{stat.value}</h2>

            <p>{stat.description}</p>

          </div>

        ))}

      </div>


      {/* RECENT TRANSACTIONS */}

      <div className="recent-section">

        <div className="recent-header">

          <div>
            <h2>Recent Transactions</h2>

            <p>
              Latest book issue and return activities
            </p>
          </div>

          <span className="recent-count">
            {transactions.length} Transactions
          </span>

        </div>


        <div className="recent-list">

          {recentTransactions.length > 0 ? (

            recentTransactions.map((transaction, index) => (

              <div
                className="recent-item"
                key={transaction.id ?? `${transaction.book}-${index}`}
              >

                {/* BOOK IMAGE */}

                <div className="transaction-image">

                  <img
                    src={getBookImage(transaction)}
                    alt={transaction.book || "Book cover"}
                    onError={handleImageError}
                  />

                </div>


                {/* TRANSACTION DETAILS */}

                <div className="transaction-details">

                  <h3>{transaction.book || "Unknown Book"}</h3>

                  <p>
                    <i className="bi bi-person"></i>
                    {" "}{transaction.member || "Unknown Member"}
                  </p>

                </div>


                {/* ISSUE DATE */}

                <div className="transaction-date">

                  <span>Issue Date</span>

                  <p>
                    {formatDate(transaction.date || transaction.issueDate)}
                  </p>

                </div>


                {/* DUE DATE */}

                <div className="transaction-due">

                  <span>Due Date</span>

                  <p>
                    {formatDate(transaction.dueDate)}
                  </p>

                </div>


                {/* STATUS */}

                <span
                  className={
                    transaction.status === "Issued"
                      ? "status-issued"
                      : "status-returned"
                  }
                >

                  <i
                    className={
                      transaction.status === "Issued"
                        ? "bi bi-arrow-up-right-circle"
                        : "bi bi-check-circle"
                    }
                  ></i>

                  {" "}{transaction.status}

                </span>

              </div>

            ))

          ) : (

            <div className="empty-transactions">

              <i className="bi bi-inbox"></i>

              <h3>No Transactions Found</h3>

              <p>
                Recent book activities will appear here.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
