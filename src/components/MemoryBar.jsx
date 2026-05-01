export default function MemoryBar({ handleMemory }) {
  return (
    <div className="memory-bar">
      <button className="memory-btn" onClick={() => handleMemory('MC')}>MC</button>
      <button className="memory-btn" onClick={() => handleMemory('MR')}>MR</button>
      <button className="memory-btn" onClick={() => handleMemory('M+')}>M+</button>
      <button className="memory-btn" onClick={() => handleMemory('M-')}>M-</button>
      <button className="memory-btn" onClick={() => handleMemory('MS')}>MS</button>
    </div>
  );
}
