const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const AdminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String
})

AdminSchema.methods.verifyPassword = function(password){
  return bcrypt.compare(password, this.passwordHash)
}

module.exports = mongoose.model('Admin', AdminSchema)
