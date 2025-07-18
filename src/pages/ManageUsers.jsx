import React, { useState, useMemo } from "react";
import "../styles/ManageUsers.css";

const initialUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "student", active: true },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "admin", active: true },
  { id: 3, name: "Carol Lee", email: "carol@example.com", role: "student", active: false },
  { id: 4, name: "David Kim", email: "david@example.com", role: "mentor", active: true },
  { id: 5, name: "Eva Green", email: "eva@example.com", role: "student", active: true },
];

const rolesHierarchy = ["student", "mentor", "admin"];

const ManageUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  // Filter users by search term
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // Toggle active status
  const toggleActive = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  // Promote user role
  const promoteUser = (id) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === id) {
          const currentIndex = rolesHierarchy.indexOf(user.role);
          if (currentIndex < rolesHierarchy.length - 1) {
            return { ...user, role: rolesHierarchy[currentIndex + 1] };
          }
        }
        return user;
      })
    );
  };

  // Demote user role
  const demoteUser = (id) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === id) {
          const currentIndex = rolesHierarchy.indexOf(user.role);
          if (currentIndex > 0) {
            return { ...user, role: rolesHierarchy[currentIndex - 1] };
          }
        }
        return user;
      })
    );
  };

  return (
    <div className="page manage-users-page">
      <h2>👥 Manage Users</h2>

      <input
        type="search"
        placeholder="Search users by name, email or role..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        aria-label="Search users"
        className="search-input"
      />

      <div className="table-container" role="region" aria-live="polite">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No users found.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className={`status-btn ${
                        user.active ? "active" : "inactive"
                      }`}
                      onClick={() => toggleActive(user.id)}
                      aria-pressed={user.active}
                      aria-label={
                        user.active ? "Deactivate user" : "Activate user"
                      }
                    >
                      {user.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td>
                    <button
                      className="action-btn promote"
                      onClick={() => promoteUser(user.id)}
                      aria-label="Promote user"
                      disabled={user.role === "admin"}
                    >
                      Promote
                    </button>
                    <button
                      className="action-btn demote"
                      onClick={() => demoteUser(user.id)}
                      aria-label="Demote user"
                      disabled={user.role === "student"}
                    >
                      Demote
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination" role="navigation" aria-label="Pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            &lt; Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;