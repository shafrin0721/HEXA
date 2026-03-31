import { Routes, Route } from 'react-router-dom';
import PaymentPage from './components/PaymentPage';
import ReviewPage from './components/ReviewPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaymentPage />} />
      <Route path="/review" element={<ReviewPage />} />
    </Routes>
  );
}

export default App;