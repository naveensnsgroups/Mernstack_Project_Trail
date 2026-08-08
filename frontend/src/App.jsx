import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

/**
 * App.jsx — Router configuration only.
 * All page content lives in src/pages/.
 * Add new routes here as the project grows.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
