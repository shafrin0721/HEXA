import { Routes, Route, Navigate } from 'react-router-dom'; // Navigate අනිවාර්යයෙන්ම එකතු කරන්න
import PaymentPage from './components/PaymentPage';
import ReviewPage from './components/ReviewPage';
// @ts-ignore
import Auth from './pages/Auth'; 

function App() {
  return (
    <Routes>
      {/* Root path එක කෙලින්ම Auth එකට redirect කරන්න */}
      <Route path="/" element={<Navigate to="/auth" replace />} />
      
      {/* Auth Page එක */}
      <Route path="/auth" element={<Auth />} />
      
      {/* අනෙකුත් Routes */}
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/review" element={<ReviewPage />} />
      
      {/* වැරදි URL එකක් ගැහුවොත් නැවත Auth එකට යවන්න */}
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}

export default App;