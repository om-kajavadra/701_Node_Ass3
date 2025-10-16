const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Admin = require('../models/Admin')
const Employee = require('../models/Employee')
const { genEmpId, genPassword } = require('../utils/generateCredentials')
const nodemailer = require('nodemailer')

async function ensureAdmin(){
  const adminUser = process.env.ADMIN_DEFAULT_USERNAME || 'admin'
  const adminPass = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123'
  const found = await Admin.findOne({ username: adminUser })
  if (!found) {
    const hash = await bcrypt.hash(adminPass, 10)
    await Admin.create({ username: adminUser, passwordHash: hash })
    console.log('Default admin created')
  }
}
ensureAdmin().catch(console.error)

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

function requireAdmin(req,res,next){
  if (req.session && req.session.adminId) return next()
  res.redirect('/admin/login')
}

router.get('/login', (req,res)=>{
  res.render('admin-login', { error: null })
})

router.post('/login', async (req,res)=>{
  const { username, password } = req.body
  const admin = await Admin.findOne({ username })
  if (!admin) return res.render('admin-login', { error: 'Invalid creds' })
  const ok = await admin.verifyPassword(password)
  if (!ok) return res.render('admin-login', { error: 'Invalid creds' })
  req.session.adminId = admin._id
  res.redirect('/admin')
})

router.post('/logout', requireAdmin, (req,res)=>{
  req.session.destroy(()=> res.redirect('/admin/login'))
})

router.get('/', requireAdmin, async (req,res)=>{
  const employees = await Employee.find().sort({ createdAt: -1 })
  res.render('admin-dashboard', { employees })
})

router.get('/employee/new', requireAdmin, (req,res)=> res.render('employee-form', { employee: null, error:null }))

router.post('/employee/new', requireAdmin, async (req,res)=>{
  try{
    const { name, email, basicSalary=0, hra=0, allowances=0, deductions=0 } = req.body
    const empId = genEmpId()
    const password = genPassword()
    const passwordHash = await bcrypt.hash(password, 10)
    const emp = await Employee.create({ empId, name, email, passwordHash, basicSalary, hra, allowances, deductions })

    const mail = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Welcome to Company - Your credentials',
      text: `Hello ${name},\nYour employee id: ${empId}\nPassword: ${password}\nPlease login at the employee portal.`
    }
    transporter.sendMail(mail).catch(err => console.error('Mail error', err))

    res.redirect('/admin')
  }catch(err){
    console.error(err)
    res.render('employee-form', { employee: req.body, error: err.message })
  }
})

router.get('/employee/:id/edit', requireAdmin, async (req,res)=>{
  const emp = await Employee.findById(req.params.id)
  res.render('employee-form', { employee: emp, error: null })
})

router.post('/employee/:id/edit', requireAdmin, async (req,res)=>{
  const { name, email, basicSalary=0, hra=0, allowances=0, deductions=0 } = req.body
  await Employee.findByIdAndUpdate(req.params.id, { name, email, basicSalary, hra, allowances, deductions })
  res.redirect('/admin')
})

router.post('/employee/:id/delete', requireAdmin, async (req,res)=>{
  await Employee.findByIdAndDelete(req.params.id)
  res.redirect('/admin')
})

module.exports = router
