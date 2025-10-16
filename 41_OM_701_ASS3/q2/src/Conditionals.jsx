import { useState } from 'react';

function ItemList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

function ConditionalExample() {
  const [showDetails, setShowDetails] = useState(true);
  const users = ['A', 'B', 'C'];

  return (
    <div>
      <button onClick={() => setShowDetails(!showDetails)} className="btn btn-primary mb-3">
        Toggle Details
      </button>
      {showDetails ? <p>Details are now visible!</p> : <p>Details hidden.</p>}
      <ItemList>
        {users.map((user, index) => (
          <li key={index} className="list-group-item">{user}</li>
        ))}
      </ItemList>
    </div>
  );
}

export default ConditionalExample;
