import { useState, useCallback } from 'react';

export function useCalculator() {
  const [currentOperand, setCurrentOperand] = useState('0');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operation, setOperation] = useState('');
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState([]);
  const [shouldResetScreen, setShouldResetScreen] = useState(false);

  const clearEntry = useCallback(() => {
    setCurrentOperand('0');
  }, []);

  const clearAll = useCallback(() => {
    setCurrentOperand('0');
    setPreviousOperand(null);
    setOperation(null);
    setHistory([]);
    setMemory(0);
  }, []);

  const deleteLast = useCallback(() => {
    if (shouldResetScreen) return;
    if (currentOperand === '0') return;
    if (currentOperand.length === 1) {
      setCurrentOperand('0');
    } else {
      setCurrentOperand(currentOperand.slice(0, -1));
    }
  }, [currentOperand, shouldResetScreen]);

  const appendNumber = useCallback((number) => {
    if (shouldResetScreen) {
      setCurrentOperand(number === '.' ? '0.' : number);
      setPreviousOperand('');
      setShouldResetScreen(false);
      return;
    }
    if (number === '.' && currentOperand.includes('.') && !currentOperand.match(/[+\-×÷(^]$/)) {
       // Only block if the current part being typed already has a dot
       const parts = currentOperand.split(/[+\-×÷(^]/);
       if (parts[parts.length - 1].includes('.')) return;
    }
    
    if (currentOperand === '0' && number !== '.') {
      setCurrentOperand(number);
    } else {
      setCurrentOperand(currentOperand + number);
    }
  }, [currentOperand, shouldResetScreen]);

  const chooseOperation = useCallback((op) => {
    setShouldResetScreen(false);
    if (currentOperand === '0' && op === '-') {
      setCurrentOperand('-');
      return;
    }
    // Don't allow multiple consecutive operators
    if (/[+\-×÷^]$/.test(currentOperand)) {
      setCurrentOperand(currentOperand.slice(0, -1) + op);
    } else {
      setCurrentOperand(currentOperand + op);
    }
  }, [currentOperand]);

  const compute = useCallback(() => {
    try {
      // Replace display symbols with math symbols
      let expression = currentOperand
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**');
      
      // Basic validation for balanced parentheses
      const openCount = (expression.match(/\(/g) || []).length;
      const closeCount = (expression.match(/\)/g) || []).length;
      if (openCount > closeCount) {
        expression += ')'.repeat(openCount - closeCount);
      }

      // Use Function constructor for evaluation
      const result = Function(`"use strict"; return (${expression})`)();
      
      const formattedResult = parseFloat(result.toFixed(10)).toString();
      
      setHistory(prevHistory => [
        { equation: `${currentOperand} =`, result: formattedResult },
        ...prevHistory
      ]);

      setCurrentOperand(formattedResult);
      setPreviousOperand(currentOperand + ' =');
      setOperation('');
      setShouldResetScreen(true);
    } catch (error) {
      alert('Invalid Expression');
    }
  }, [currentOperand]);

  const performScientific = useCallback((func) => {
    const current = parseFloat(currentOperand);
    
    let result;
    let equation = '';

    switch (func) {
      case 'sin':
        result = Math.sin(current);
        equation = `sin(${current})`;
        break;
      case 'cos':
        result = Math.cos(current);
        equation = `cos(${current})`;
        break;
      case 'tan':
        result = Math.tan(current);
        equation = `tan(${current})`;
        break;
      case 'log':
        if (current <= 0) return alert('Invalid input');
        result = Math.log10(current);
        equation = `log(${current})`;
        break;
      case 'ln':
        if (current <= 0) return alert('Invalid input');
        result = Math.log(current);
        equation = `ln(${current})`;
        break;
      case '√':
        if (current < 0) return alert('Invalid input');
        result = Math.sqrt(current);
        equation = `√(${current})`;
        break;
      case '!':
        if (current < 0 || !Number.isInteger(current)) return alert('Invalid input');
        result = 1;
        for (let i = 2; i <= current; i++) result *= i;
        equation = `${current}!`;
        break;
      case 'π':
        if (currentOperand === '0') {
           setCurrentOperand(Math.PI.toString());
        } else {
           setCurrentOperand(currentOperand + Math.PI.toString());
        }
        return;
      case 'e':
        if (currentOperand === '0') {
           setCurrentOperand(Math.E.toString());
        } else {
           setCurrentOperand(currentOperand + Math.E.toString());
        }
        return;
      default:
        return;
    }

    const formattedResult = parseFloat(result.toFixed(10)).toString();
    setHistory(prevHistory => [
      { equation: `${equation} =`, result: formattedResult },
      ...prevHistory
    ]);

    setCurrentOperand(formattedResult);
    setShouldResetScreen(true);
  }, [currentOperand]);

  const applyAction = useCallback((action) => {
    if (action === '+/-') {
      if (currentOperand.startsWith('-')) {
        setCurrentOperand(currentOperand.slice(1));
      } else {
        setCurrentOperand('-' + currentOperand);
      }
    } else if (action === '%') {
      try {
        const val = eval(currentOperand.replace(/×/g, '*').replace(/÷/g, '/'));
        setCurrentOperand((val / 100).toString());
      } catch (e) {
        alert('Invalid Expression');
      }
    }
  }, [currentOperand]);

  const handleMemory = useCallback((action) => {
    const current = parseFloat(currentOperand);
    switch (action) {
      case 'MS': if (!isNaN(current)) setMemory(current); break;
      case 'MC': setMemory(0); break;
      case 'MR': setCurrentOperand(currentOperand === '0' ? memory.toString() : currentOperand + memory.toString()); break;
      case 'M+': if (!isNaN(current)) setMemory(memory + current); break;
      case 'M-': if (!isNaN(current)) setMemory(memory - current); break;
    }
    setShouldResetScreen(true);
  }, [currentOperand, memory]);

  return {
    currentOperand,
    previousOperand,
    operation,
    history,
    clearEntry,
    clearAll,
    deleteLast,
    appendNumber,
    chooseOperation,
    compute,
    performScientific,
    applyAction,
    handleMemory
  };
}
