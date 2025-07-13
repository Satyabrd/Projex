import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProjectInventory from './pages/projectInventory';
import ProjectDetails from './pages/projectDetails';

function App() {
  return (
    <div className="bg-lightGrayBg">
      <Routes>
        <Route path="/" element={<ProjectInventory />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </div>
  );
}

export default App;
