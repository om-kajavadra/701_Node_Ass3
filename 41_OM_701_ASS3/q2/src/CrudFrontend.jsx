import { useState, useEffect } from 'react';

function CrudFrontend() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', department: '', designation: '' });

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const handleAdd = async () => {
    const res = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    setUsers([...users, data]);
    setNewUser({ name: '', department: '', designation: '' });
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">CRUD Frontend with Bootstrap</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Name"
              value={newUser.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="department"
              placeholder="Department"
              value={newUser.department}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="designation"
              placeholder="Designation"
              value={newUser.designation}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add Employee
        </button>
      </form>

      <ul className="list-group mt-4">
        {users.map((u) => (
          <li key={u.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{u.name}</strong> - {u.department} - {u.designation}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrudFrontend;
