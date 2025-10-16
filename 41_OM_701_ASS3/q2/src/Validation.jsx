import { useState } from 'react';

function Validation() {
  const [email, setEmail] = useState('');
  const isValid = email.includes('@');

  return (
    <div>
      <input className="form-control mb-2" type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <p style={{ color: isValid ? 'green' : 'red' }}>
        {isValid ? 'Valid email' : 'Invalid email'}
      </p>
    </div>
  );
}
export default Validation;
