
import { NavLink } from "react-router-dom";

function Sidebar() {

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "bi bi-grid-1x2-fill"
    },
    {
      name: "Books",
      path: "/books",
      icon: "bi bi-book-half"
    },
    {
      name: "Members",
      path: "/members",
      icon: "bi bi-people-fill"
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: "bi bi-arrow-left-right"
    }
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-heading">
        <p>MAIN MENU</p>
      </div>

      <nav>
        <ul>

          {menuItems.map((item) => (

            <li key={item.path}>

              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >

                <i className={item.icon}></i>

                <span>{item.name}</span>

              </NavLink>

            </li>

          ))}

        </ul>
      </nav>

      <div className="sidebar-footer">

        <div className="sidebar-footer-icon">
          <i className="bi bi-book"></i>
        </div>

        <div>
          <h4>BOOKNEST</h4>
          <p>Manage. Organize. Grow.</p>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;
