import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LeaveApp(){
  const [date,setDate] = useState('')
  const [reason,setReason] = useState('')
  const [leaves,setLeaves] = useState([])
  const nav = useNavigate()

  useEffect(()=>{ load() }, [])

  async function load(){
    const token = localStorage.getItem('EMP_TOKEN')
    if (!token) { nav('/login'); return }
    const res = await fetch('http://localhost:4000/api/employee/leaves', { headers:{ 'Authorization': 'Bearer '+token } })
    if (!res.ok) { localStorage.removeItem('EMP_TOKEN'); nav('/login'); return }
    setLeaves(await res.json())
  }

  async function apply(e){
    e.preventDefault()
    const token = localStorage.getItem('EMP_TOKEN')
    await fetch('http://localhost:4000/api/employee/leaves', {
      method:'POST', headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer '+token },
      body: JSON.stringify({ date, reason })
    })
    setDate(''); setReason('')
    load()
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Leave Application</h3>
        <div>
          <button className="btn btn-secondary me-2" onClick={()=>{ localStorage.removeItem('EMP_TOKEN'); nav('/login') }}>Logout</button>
        </div>
      </div>

      <form onSubmit={apply} className="mb-4">
        <div className="mb-3"><input type="date" className="form-control" value={date} onChange={e=>setDate(e.target.value)} required/></div>
        <div className="mb-3"><textarea className="form-control" value={reason} onChange={e=>setReason(e.target.value)} placeholder="Reason" required/></div>
        <button className="btn btn-primary">Apply</button>
      </form>

      <h5>Applied Leaves</h5>
      {leaves.length === 0 ? <p>No leaves.</p> : (
        <ul className="list-group">
          {leaves.map((l,idx)=> (
            <li key={idx} className="list-group-item">{new Date(l.date).toLocaleDateString()} - {l.reason} - Granted: {l.granted ? 'Yes' : 'No'}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
