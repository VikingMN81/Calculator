import Button from './Button';

const BackspaceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
    <line x1="18" y1="9" x2="12" y2="15"></line>
    <line x1="12" y1="9" x2="18" y2="15"></line>
  </svg>
);

export default function Keypad({ appendNumber, chooseOperation, clearAll, clearEntry, deleteLast, compute, applyAction }) {
  return (
    <div className="keypad">
      {/* Row 1 */}
      <Button label="AC" onClick={clearAll} className="action" />
      <Button label="C" onClick={clearEntry} className="action" />
      <Button label={<BackspaceIcon />} onClick={deleteLast} className="action" />
      <Button label="÷" onClick={chooseOperation} className="operator" />
      
      {/* Row 2 */}
      <Button label="%" onClick={applyAction} />
      <Button label="(" onClick={appendNumber} />
      <Button label=")" onClick={appendNumber} />
      <Button label="×" onClick={chooseOperation} className="operator" />
      
      {/* Row 3 */}
      <Button label="7" onClick={appendNumber} />
      <Button label="8" onClick={appendNumber} />
      <Button label="9" onClick={appendNumber} />
      <Button label="-" onClick={chooseOperation} className="operator" />
      
      {/* Row 4 */}
      <Button label="4" onClick={appendNumber} />
      <Button label="5" onClick={appendNumber} />
      <Button label="6" onClick={appendNumber} />
      <Button label="+" onClick={chooseOperation} className="operator" />
      
      {/* Row 5 */}
      <Button label="1" onClick={appendNumber} />
      <Button label="2" onClick={appendNumber} />
      <Button label="3" onClick={appendNumber} />
      <Button label="=" onClick={compute} className="equals equals-tall" />
      
      {/* Row 6 */}
      <Button label="+/-" onClick={applyAction} />
      <Button label="0" onClick={appendNumber} />
      <Button label="." onClick={appendNumber} />
    </div>
  );
}
