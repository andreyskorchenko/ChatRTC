import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Signin } from '@/pages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
      </Routes>
    </Router>
  );
};

export default App;
