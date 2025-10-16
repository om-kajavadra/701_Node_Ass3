import { useState } from 'react';

function Filter() {
  const [query, setQuery] = useState('');
  const data = ['Apple', 'Banana', 'Mango', 'Orange'];
  const filtered = data.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <input className="form-control mb-3" type="text" placeholder="Search fruit" value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>{filtered.map((f, i) => <li key={i}>{f}</li>)}</ul>
    </div>
  );
}
export default Filter;
