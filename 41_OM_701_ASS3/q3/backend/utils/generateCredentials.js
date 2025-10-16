const crypto = require('crypto')

function genEmpId(){
  return 'EMP' + Date.now().toString().slice(-6) + Math.random().toString(36).slice(2,5).toUpperCase()
}

function genPassword(){
  return crypto.randomBytes(4).toString('hex')
}

module.exports = { genEmpId, genPassword }
