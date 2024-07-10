
const PhilosopherButton = ({ philosopher, onClick }) => (
  <button onClick={() => onClick(philosopher)} className="philosopher-button">
    {philosopher}
  </button>
);

export default PhilosopherButton;
