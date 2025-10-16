const express = require('express')
const router = express.Router()
const Employee = require('../models/Employee')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'jwt-secret'

router.post('/login', async (req,res)=>{
  const { empId, password } = req.body
  const emp = await Employee.findOne({ empId })
  if (!emp) return res.status(401).json({ message: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, emp.passwordHash)
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
  const token = jwt.sign({ id: emp._id, empId: emp.empId }, JWT_SECRET, { expiresIn: '4h' })
  res.json({ token })
})

function auth(req,res,next){
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ message: 'Missing auth' })
  const token = header.split(' ')[1]
  try{
    const payload = jwt.verify(token, JWT_SECRET)
    req.employee = payload
    next()
  }catch(err){
    return res.status(401).json({ message: 'Invalid token' })
  }
}

router.get('/profile', auth, async (req,res)=>{
  const emp = await Employee.findById(req.employee.id).select('-passwordHash')
  res.json(emp)
})

router.post('/leaves', auth, async (req,res)=>{
  const { date, reason } = req.body
  const emp = await Employee.findById(req.employee.id)
  emp.leaves.push({ date, reason })
  await emp.save()
  res.status(201).json(emp.leaves)
})

router.get('/leaves', auth, async (req,res)=>{
  const emp = await Employee.findById(req.employee.id)
  res.json(emp.leaves)
})

module.exports = router
