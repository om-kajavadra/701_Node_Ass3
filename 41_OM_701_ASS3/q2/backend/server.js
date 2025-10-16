const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let employees = [
  { id: 1, name: 'Abc', department: 'HR', designation: 'Devloper' },
];

app.get('/users', (req, res) => {
  res.json(employees);
});

app.post('/users', (req, res) => {
  const { name, department, designation } = req.body;
  const newEmp = {
    id: employees.length + 1,
    name,
    department,
    designation
  };
  employees.push(newEmp);
  res.status(201).json(newEmp);
});

app.put('/users/:id', (req, res) => {
  const empId = parseInt(req.params.id);
  const { name, department, designation } = req.body;
  const emp = employees.find(e => e.id === empId);
  if (emp) {
    emp.name = name;
    emp.department = department;
    emp.designation = designation;
    res.json(emp);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.delete('/users/:id', (req, res) => {
  const empId = parseInt(req.params.id);
  employees = employees.filter(e => e.id !== empId);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
