import React, { useState } from 'react';
import { Calculator, Sheet as CheatSheet, Brain } from 'lucide-react';
import * as math from 'mathjs';

function App() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [isRadians, setIsRadians] = useState(true);

  const handleNumber = (num: string) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
    setExpression(expression + num);
  };

  const handleOperator = (op: string) => {
    setExpression(expression + op);
    setDisplay('0');
  };

  // For trigonometric functions, the input will be interpreted based on isRadians
  const handleFunction = (func: string) => {
    // Trigonometric functions that need angle mode handling
    const trigFunctions = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'];
    
    if (trigFunctions.includes(func)) {
      // The scope in calculate() will handle the conversion automatically
      setExpression(expression + func + '(');
    } else {
      // Non-trigonometric functions don't need angle handling
      setExpression(expression + func + '(');
    }
    setDisplay('0');
  };

  const handleConstant = (constant: string) => {
    setExpression(expression + constant);
    setDisplay(constant);
  };

  const calculate = () => {
    try {
      // Create a scope with angle mode setting
      // When deg: true, mathjs will convert degrees to radians internally
      // When deg: false, mathjs will use radians directly
      const scope = {
        deg: !isRadians
      };
      
      const result = math.evaluate(expression, scope);
      
      // Format the result to avoid excessive decimal places
      const formattedResult = typeof result === 'number' 
        ? Number(result.toPrecision(10)).toString()
        : result.toString();
      
      setDisplay(formattedResult);
      setExpression(formattedResult);
    } catch (error) {
      setDisplay('Error');
      setExpression('');
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
  };

  const backspace = () => {
    if (expression.length > 0) {
      setExpression(expression.slice(0, -1));
      setDisplay(display === '0' ? '0' : display.slice(0, -1) || '0');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Calculator className="w-6 h-6" />
            <h1 className="text-xl font-bold">Scientific Calculator</h1>
            <button
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="text-blue-400 hover:text-blue-300"
            >
              <Brain className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={() => setIsRadians(!isRadians)}
                className={`text-sm px-2 py-1 rounded ${
                  isRadians 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {isRadians ? 'RAD' : 'DEG'}
              </button>
              <div className="text-sm text-gray-400">{expression || '0'}</div>
            </div>
            <div className="text-2xl font-mono">{display}</div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {/* Constants */}
            <button onClick={() => handleConstant('pi')} className="btn">π</button>
            <button onClick={() => handleConstant('e')} className="btn">e</button>
            <button onClick={backspace} className="btn">⌫</button>
            <button onClick={clear} className="btn bg-red-600 hover:bg-red-700">C</button>
            <button onClick={() => handleOperator('/')} className="btn">÷</button>

            {/* Advanced Functions */}
            <button onClick={() => handleFunction('log10')} className="btn">log</button>
            <button onClick={() => handleFunction('log')} className="btn">ln</button>
            <button onClick={() => handleFunction('sqrt')} className="btn">√</button>
            <button onClick={() => handleOperator('^')} className="btn">^</button>
            <button onClick={() => handleOperator('*')} className="btn">×</button>

            {/* Trigonometric Functions */}
            <button onClick={() => handleFunction('sin')} className="btn">sin</button>
            <button onClick={() => handleFunction('cos')} className="btn">cos</button>
            <button onClick={() => handleFunction('tan')} className="btn">tan</button>
            <button onClick={() => handleOperator('!')} className="btn">!</button>
            <button onClick={() => handleOperator('-')} className="btn">-</button>

            {/* Inverse Trigonometric */}
            <button onClick={() => handleFunction('asin')} className="btn">sin⁻¹</button>
            <button onClick={() => handleFunction('acos')} className="btn">cos⁻¹</button>
            <button onClick={() => handleFunction('atan')} className="btn">tan⁻¹</button>
            <button onClick={() => handleOperator(')')} className="btn">)</button>
            <button onClick={() => handleOperator('+')} className="btn">+</button>

            {/* Numbers */}
            <button onClick={() => handleNumber('7')} className="btn">7</button>
            <button onClick={() => handleNumber('8')} className="btn">8</button>
            <button onClick={() => handleNumber('9')} className="btn">9</button>
            <button onClick={() => handleFunction('abs')} className="btn">|x|</button>
            <button onClick={() => handleOperator('%')} className="btn">%</button>

            <button onClick={() => handleNumber('4')} className="btn">4</button>
            <button onClick={() => handleNumber('5')} className="btn">5</button>
            <button onClick={() => handleNumber('6')} className="btn">6</button>
            <button onClick={() => handleFunction('exp')} className="btn">EXP</button>
            <button onClick={() => handleOperator('(')} className="btn">(</button>

            <button onClick={() => handleNumber('1')} className="btn">1</button>
            <button onClick={() => handleNumber('2')} className="btn">2</button>
            <button onClick={() => handleNumber('3')} className="btn">3</button>
            <button onClick={() => handleNumber('0')} className="btn">0</button>
            <button onClick={() => handleNumber('.')} className="btn">.</button>

            <button onClick={calculate} className="btn bg-blue-600 hover:bg-blue-700 col-span-5">=</button>
          </div>
        </div>

        {/* Enhanced Cheat Sheet */}
        {showCheatSheet && (
          <div className="p-4 bg-gray-700 border-t border-gray-600">
            <h2 className="text-lg font-bold mb-2">Formula Cheat Sheet</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-bold mb-1">Trigonometry</h3>
                <ul className="space-y-1">
                  <li>sin²(θ) + cos²(θ) = 1</li>
                  <li>tan(θ) = sin(θ)/cos(θ)</li>
                  <li>sin⁻¹(sin(θ)) = θ</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-1">Logarithms</h3>
                <ul className="space-y-1">
                  <li>log(xy) = log(x) + log(y)</li>
                  <li>log(x^n) = n·log(x)</li>
                  <li>e^(ln(x)) = x</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-1">Constants</h3>
                <ul className="space-y-1">
                  <li>π ≈ 3.14159</li>
                  <li>e ≈ 2.71828</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-1">Algebra</h3>
                <ul className="space-y-1">
                  <li>(a+b)² = a² + 2ab + b²</li>
                  <li>(a-b)² = a² - 2ab + b²</li>
                  <li>a² - b² = (a+b)(a-b)</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;