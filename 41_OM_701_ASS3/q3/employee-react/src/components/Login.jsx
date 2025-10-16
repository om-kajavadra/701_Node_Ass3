import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [empId,setEmpId]=useState('')
  const [password,setPassword]=useState('')
  const [err,setErr]=useState(null)
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      const res = await fetch('http://localhost:4000/api/employee/login', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ empId, password })
      })
      const data = await res.json()
      if (!res.ok) { setErr(data.message || 'Login failed'); return }
      localStorage.setItem('EMP_TOKEN', data.token)
      nav('/profile')
    }catch(err){
      setErr('Network error')
    }
  }

  return (
    <div className="container py-5">
      <h3>Employee Login</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={submit}>
        <div className="mb-3"><input className="form-control" value={empId} onChange={e=>setEmpId(e.target.value)} placeholder="Employee ID" /></div>
        <div className="mb-3"><input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" /></div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}
