
function Dashboard({ transactions, books, members }) {

  const issuedBooks = transactions.filter(
    (transaction) => transaction.status === "Issued"
  ).length;

  const overdueBooks = transactions.filter(
    (transaction) =>
      transaction.status === "Issued" &&
      new Date(transaction.dueDate) < new Date()
  ).length;

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

  const recentTransactions = transactions
    .slice()
    .reverse()
    .slice(0, 5);

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
          {new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })}
        </div>

      </div>


      {/* STATISTICS */}

      <div className="stats-container">

        {stats.map((stat, index) => (

          <div className="stat-card" key={index}>

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

            recentTransactions.map((transaction) => (

              <div
                className="recent-item"
                key={transaction.id}
              >

               <div className="transaction-image">
 <img
    src={
      transaction.image ||
      "https://placehold.co/60x80/eef2f7/64748b?text=Book"
    }
    alt={transaction.book}
  />
</div>

                <div className="transaction-details">

                  <h3>{transaction.book}</h3>

                  <p>
                    <i className="bi bi-person"></i>
                    {transaction.member}
                  </p>

                </div>

                <div className="transaction-date">

                  <span>Issue Date</span>
                  <p>{transaction.date}</p>

                </div>

                <div className="transaction-due">

                  <span>Due Date</span>
                  <p>{transaction.dueDate}</p>

                </div>

                <span
                  className={
                    transaction.status === "Issued"
                      ? "status-issued"
                      : "status-returned"
                  }
                >
                  <i className={
                    transaction.status === "Issued"
                      ? "bi bi-arrow-up-right-circle"
                      : "bi bi-check-circle"
                  }></i>

                  {transaction.status}
                </span>

              </div>

            ))

          ) : (

            <div className="empty-transactions">
              <i className="bi bi-inbox"></i>
              <h3>No Transactions Found</h3>
              <p>Recent book activities will appear here.</p>
            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
