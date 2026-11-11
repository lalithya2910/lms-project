
import { useState } from "react";

function Members() {
  const [members, setMembers] = useState([
    { id: 1, name: "Ambica", email: "ambica@gmail.com", phone: "9876543210" },
    { id: 2, name: "Narendra", email: "narendra@gmail.com", phone: "9876543211" },
    { id: 3, name: "Lalithya", email: "lalithya@gmail.com", phone: "9876543212" },
    { id: 4, name: "Panitha", email: "panitha@gmail.com", phone: "9876543213" },
    { id: 5, name: "Maheswari", email: "maheswari@gmail.com", phone: "9876543214" },
    { id: 6, name: "Sai", email: "sai@gmail.com", phone: "9876543215" },
    { id: 7, name: "Rahul", email: "rahul@gmail.com", phone: "9876543216" },
    { id: 8, name: "Priya", email: "priya@gmail.com", phone: "9876543217" },
    { id: 9, name: "Kiran", email: "kiran@gmail.com", phone: "9876543218" }
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editError, setEditError] = useState("");

  function validateMember(memberName, memberEmail, memberPhone, currentId = null) {
    if (!memberName.trim()) return "Name is required";
    if (!memberEmail.trim()) return "Email is required";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(memberEmail.trim())) return "Enter a valid email";

    if (!/^[0-9]{10}$/.test(memberPhone.trim())) {
      return "Phone number must contain 10 digits";
    }

    const emailExists = members.some(
      (member) =>
        member.id !== currentId &&
        member.email.toLowerCase() === memberEmail.trim().toLowerCase()
    );

    if (emailExists) return "Email already exists";

    return "";
  }

  function addMember() {
    const validationError = validateMember(name, email, phone);

    if (validationError) {
      setError(validationError);
      return;
    }

    const newMember = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim()
    };

    setMembers((previous) => [...previous, newMember]);

    setName("");
    setEmail("");
    setPhone("");
    setError("");
    setShowForm(false);
  }

  function deleteMember(id) {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    setMembers((previous) => previous.filter((member) => member.id !== id));
  }

  function editMember(member) {
    setEditId(member.id);
    setEditName(member.name);
    setEditEmail(member.email);
    setEditPhone(member.phone);
    setEditError("");
  }

  function saveEdit(id) {
    const validationError = validateMember(
      editName,
      editEmail,
      editPhone,
      id
    );

    if (validationError) {
      setEditError(validationError);
      return;
    }

    setMembers((previous) =>
      previous.map((member) =>
        member.id === id
          ? {
              ...member,
              name: editName.trim(),
              email: editEmail.trim(),
              phone: editPhone.trim()
            }
          : member
      )
    );

    cancelEdit();
  }

  function cancelEdit() {
    setEditId(null);
    setEditName("");
    setEditEmail("");
    setEditPhone("");
    setEditError("");
  }

  const filteredMembers = members.filter((member) => {
    const searchText = search.toLowerCase();

    return (
      member.name.toLowerCase().includes(searchText) ||
      member.email.toLowerCase().includes(searchText) ||
      member.phone.includes(searchText)
    );
  });

  return (
    <div className="members-page">

      <div className="members-page-header">
        <div>
          <span className="members-eyebrow">LIBRARY MANAGEMENT</span>
          <h1>Members</h1>
          <p>Manage and organize your library members.</p>
        </div>

        <div className="members-total">
          <div className="members-total-icon">
            <i className="bi bi-people-fill"></i>
          </div>
          <div>
            <span>Total Members</span>
            <h2>{members.length}</h2>
          </div>
        </div>
      </div>

      <div className="members-toolbar">
        <div className="members-search">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              className="members-clear-search"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <i className="bi bi-x-circle"></i>
            </button>
          )}
        </div>

        <button
          className="add-member-btn"
          onClick={() => {
            setShowForm(!showForm);
            setError("");
          }}
        >
          <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-lg"}`}></i>
          {showForm ? "Close Form" : "Add Member"}
        </button>
      </div>

      {showForm && (
        <div className="member-form">
          <div className="member-form-heading">
            <div className="member-form-icon">
              <i className="bi bi-person-plus-fill"></i>
            </div>
            <div>
              <h2>Add New Member</h2>
              <p>Enter the member's details below.</p>
            </div>
          </div>

          <div className="member-form-fields">
            <div className="member-input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter member name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="member-input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="member-input-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="10-digit phone number"
                maxLength="10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="member-error"><i className="bi bi-exclamation-circle"></i> {error}</p>}

          <div className="member-form-actions">
            <button
              className="member-cancel-btn"
              onClick={() => {
                setShowForm(false);
                setError("");
              }}
            >
              Cancel
            </button>
            <button className="member-submit-btn" onClick={addMember}>
              <i className="bi bi-check-lg"></i> Add Member
            </button>
          </div>
        </div>
      )}

      <div className="members-list-heading">
        <div>
          <h2>All Members</h2>
          <p>View and manage registered members</p>
        </div>
        <span>{filteredMembers.length} members found</span>
      </div>

      {filteredMembers.length > 0 ? (
        <div className="members-grid">
          {filteredMembers.map((member) => (
            <div className="member-card" key={member.id}>
              {editId === member.id ? (
                <div className="member-edit-form">
                  <div className="member-edit-heading">
                    <i className="bi bi-pencil-square"></i>
                    <h3>Edit Member</h3>
                  </div>

                  <div className="member-input-group">
                    <label>Full Name</label>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>

                  <div className="member-input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                  </div>

                  <div className="member-input-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      maxLength="10"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                    />
                  </div>

                  {editError && (
                    <p className="member-error">
                      <i className="bi bi-exclamation-circle"></i> {editError}
                    </p>
                  )}

                  <div className="member-card-actions">
                    <button
                      className="member-save-btn"
                      onClick={() => saveEdit(member.id)}
                    >
                      <i className="bi bi-check-lg"></i> Save
                    </button>
                    <button
                      className="member-cancel-btn"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="member-card-top">
                    <div className="member-avatar">
  <div className="member-avatar">
  <img
    src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(
      member.name.trim().toLowerCase()
    )}&backgroundColor=dbeafe,c7d2fe,e0e7ff`}
    alt={`${member.name} avatar`}
    loading="lazy"
  />
</div>
                    <span className="member-status">
                      <span></span> Active
                    </span>
                  </div>

                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <p className="member-id">Member ID: #{member.id}</p>
                  </div>

                  <div className="member-contact">
                    <div>
                      <span className="member-contact-icon">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <p>{member.email}</p>
                    </div>
                    <div>
                      <span className="member-contact-icon">
                        <i className="bi bi-telephone"></i>
                      </span>
                      <p>{member.phone}</p>
                    </div>
                  </div>

                  <div className="member-card-actions">
                    <button
                      className="member-edit-btn"
                      onClick={() => editMember(member)}
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                    <button
                      className="member-delete-btn"
                      onClick={() => deleteMember(member.id)}
                    >
                      <i className="bi bi-trash3"></i> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="members-empty">
          <div><i className="bi bi-people"></i></div>
          <h3>No members found</h3>
          <p>Try another search or add a new library member.</p>
          {search && (
            <button onClick={() => setSearch("")}>Clear Search</button>
          )}
        </div>
      )}
    </div>
  );
}

export default Members;
