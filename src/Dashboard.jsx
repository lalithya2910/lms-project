
function Dashboard({ transactions, books, members }) {

  // Today's date (time removed)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
                    src={
                      transaction.image ||
                      "https://placehold.co/60x80/eef2f7/64748b?text=Book"
                    }
                    alt={transaction.book || "Book cover"}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://placehold.co/60x80/eef2f7/64748b?text=Book";
                    }}
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
