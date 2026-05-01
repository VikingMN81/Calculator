export default function Display({ currentOperand, previousOperand, operation }) {
  return (
    <div className="display">
      <div className="previous-operand">
        {previousOperand} {operation}
      </div>
      <div className="current-operand" style={{
        fontSize: currentOperand.length > 12 ? '2rem' : '3.5rem'
      }}>
        {currentOperand}
      </div>
    </div>
  );
}
