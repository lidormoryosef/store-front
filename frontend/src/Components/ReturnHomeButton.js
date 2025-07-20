import { useNavigate } from 'react-router-dom';
export default function ReturnHomeButton({ label = '⬅️ Return Home' }) {
  const navigate = useNavigate();

  return (
      <button
        type="button"
        className="btn btn-outline-secondary position-fixed"
        style={{ top: 20, left: 20, zIndex: 1000 }}
        onClick={() => navigate('/')}
      >
        ⬅️ Return to Home
      </button>
  );
}
