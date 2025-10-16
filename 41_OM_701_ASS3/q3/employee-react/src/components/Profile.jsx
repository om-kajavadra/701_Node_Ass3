import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile(){
  const [profile,setProfile] = useState(null)
  const nav = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem('EMP_TOKEN')
    if (!token) { nav('/login'); return }
    fetch('http://localhost:4000/api/employee/profile', { headers: { 'Authorization': 'Bearer '+token } })
      .then(r=>{ if (!r.ok) throw new Error('Unauthorized'); return r.json() })
      .then(setProfile)
      .catch(()=>{ localStorage.removeItem('EMP_TOKEN'); nav('/login') })
  }, [nav])

  if (!profile) return <div className="container py-5">Loading...</div>

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Profile</h3>
        <div>
          <button className="btn btn-secondary me-2" onClick={()=>{ localStorage.removeItem('EMP_TOKEN'); nav('/login') }}>Logout</button>
          <button className="btn btn-primary" onClick={()=>nav('/leave')}>Leave Application</button>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5>{profile.name} ({profile.empId})</h5>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Net Salary:</strong> {profile.netSalary}</p>
          <h6>Applied Leaves</h6>
          <ul>
            {profile.leaves && profile.leaves.length > 0 ? profile.leaves.map((l,idx)=>(
              <li key={idx}>{new Date(l.date).toLocaleDateString()} - {l.reason} - Granted: {l.granted ? 'Yes' : 'No'}</li>
            )) : <li>No leaves applied yet</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}
