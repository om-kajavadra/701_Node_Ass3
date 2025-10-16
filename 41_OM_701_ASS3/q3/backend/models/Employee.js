const mongoose = require('mongoose')

const LeaveSchema = new mongoose.Schema({
  date: Date,
  reason: String,
  granted: { type: Boolean, default: false },
  appliedAt: { type: Date, default: Date.now }
})

const EmployeeSchema = new mongoose.Schema({
  empId: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  basicSalary: { type: Number, default: 0 },
  hra: { type: Number, default: 0 },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  leaves: [LeaveSchema]
})

EmployeeSchema.virtual('netSalary').get(function(){
  const b = Number(this.basicSalary || 0)
  const hra = Number(this.hra || 0)
  const allowances = Number(this.allowances || 0)
  const deductions = Number(this.deductions || 0)
  return b + hra + allowances - deductions
})

EmployeeSchema.set('toJSON', { virtuals: true })
module.exports = mongoose.model('Employee', EmployeeSchema)
