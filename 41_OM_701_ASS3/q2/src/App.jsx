import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Conditionals from './Conditionals';
import FormExamples from './FormExamples';
import Clock from './Clock';
import Validation from './Validation';
import Filter from './Filter';
import CrudFrontend from './CrudFrontend';

function App() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">Home</Link> | {' '}
        <Link to="/conditionals">Conditionals</Link> | {' '}
        <Link to="/forms">Forms</Link> | {' '}
        <Link to="/clock">Clock</Link> | {' '}
        <Link to="/validation">Validation</Link> | {' '}
        <Link to="/filter">Filter</Link> | {' '}
        <Link to="/crud">CRUD</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conditionals" element={<Conditionals />} />
        <Route path="/forms" element={<FormExamples />} />
        <Route path="/clock" element={<Clock />} />
        <Route path="/validation" element={<Validation />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/crud" element={<CrudFrontend />} />
      </Routes>
    </div>
  );
}

export default App;
