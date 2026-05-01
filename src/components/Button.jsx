export default function Button({ onClick, label, className = '' }) {
  return (
    <button className={`calc-btn ${className}`} onClick={() => onClick(label)}>
      {label}
    </button>
  );
}
