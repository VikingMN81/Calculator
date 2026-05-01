import { useState, useEffect } from 'react';
import { useCalculator } from './hooks/useCalculator';
import Display from './components/Display';
import Keypad from './components/Keypad';
import ScientificKeypad from './components/ScientificKeypad';
import MemoryBar from './components/MemoryBar';
import HistoryPanel from './components/HistoryPanel';

function App() {
  const [viewMode, setViewMode] = useState('standard'); // 'standard', 'scientific', 'history'
  
  const calc = useCalculator();

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') calc.appendNumber(e.key);
      if (e.key === '.') calc.appendNumber('.');
      if (e.key === '+') calc.chooseOperation('+');
      if (e.key === '-') calc.chooseOperation('-');
      if (e.key === '*') calc.chooseOperation('×');
      if (e.key === '/') {
        e.preventDefault();
        calc.chooseOperation('÷');
      }
      if (e.key === '(') calc.appendNumber('(');
      if (e.key === ')') calc.appendNumber(')');
      if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calc.compute();
      }
      if (e.key === 'Backspace') calc.deleteLast();
      if (e.key === 'Escape') calc.clearAll();
      if (e.key === 'c' || e.key === 'C') calc.clearEntry();
      if (e.key === 'p' || e.key === 'P') calc.performScientific('π');
      if (e.key === 's' || e.key === 'S') calc.performScientific('sin');
      if (e.key === 'c' || e.key === 'C') calc.performScientific('cos');
      if (e.key === 't' || e.key === 'T') calc.performScientific('tan');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [calc]);

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${viewMode === 'standard' ? 'active' : ''}`}
            onClick={() => setViewMode('standard')}
          >
            Standard
          </button>
          <button 
            className={`nav-tab ${viewMode === 'scientific' ? 'active' : ''}`}
            onClick={() => setViewMode('scientific')}
          >
            Scientific
          </button>
        </div>
        <button 
          className={`nav-tab ${viewMode === 'history' ? 'active' : ''}`}
          onClick={() => setViewMode(viewMode === 'history' ? 'standard' : 'history')}
        >
          History
        </button>
      </nav>

      <main className="calculator">
        <Display 
          currentOperand={calc.currentOperand} 
          previousOperand={calc.previousOperand} 
          operation={calc.operation} 
        />
        
        <MemoryBar handleMemory={calc.handleMemory} />

        {viewMode === 'standard' && (
          <Keypad 
            appendNumber={calc.appendNumber}
            chooseOperation={calc.chooseOperation}
            clearAll={calc.clearAll}
            clearEntry={calc.clearEntry}
            deleteLast={calc.deleteLast}
            compute={calc.compute}
            applyAction={calc.applyAction}
          />
        )}

        {viewMode === 'scientific' && (
          <ScientificKeypad 
            appendNumber={calc.appendNumber}
            chooseOperation={calc.chooseOperation}
            clearAll={calc.clearAll}
            clearEntry={calc.clearEntry}
            deleteLast={calc.deleteLast}
            compute={calc.compute}
            performScientific={calc.performScientific}
            applyAction={calc.applyAction}
          />
        )}

        {viewMode === 'history' && (
          <HistoryPanel history={calc.history} />
        )}
      </main>
    </>
  );
}

export default App;
