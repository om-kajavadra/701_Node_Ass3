import { useState, useRef } from 'react';

function FormExamples() {
  const [name, setName] = useState('');
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${name}, Email: ${emailRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
     <br/> <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      /><br/>
      <input
        type="email"
        className="form-control mb-2"
        placeholder="Enter email"
        ref={emailRef}
        required
      /><br/>
      <button className="btn btn-success" type="submit">Submit</button>
    </form>
  );
}

export default FormExamples;
