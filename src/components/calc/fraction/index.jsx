"use client";

import React, { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const KasrComponent = ({
  numerator: initialNumerator = "",
  denominator: initialDenominator = "",
}) => {
  const [numerator, setNumerator] = useState(initialNumerator);
  const [denominator, setDenominator] = useState(initialDenominator);
  const [showInputs, setShowInputs] = useState(false);

  return (
    <MathJaxContext>
      <div className="p-4 max-w-md mx-auto">
        {/* Matematik ifoda */}
        <div className="border p-2 text-xl mb-4 min-h-[50px] bg-gray-100 text-center">
          <MathJax>{`\\(\\frac{${numerator || "a"}}{${
            denominator || "b"
          }}\\)`}</MathJax>
        </div>

        {/* Inputlar faqat kerak bo‘lsa ko‘rsatiladi */}
        {showInputs && (
          <div className="mb-4 flex items-center gap-2 justify-center">
            <input
              type="text"
              placeholder="Surat"
              value={numerator}
              onChange={(e) => setNumerator(e.target.value)}
              className="border p-2 w-16 text-center"
            />
            <span className="text-xl">/</span>
            <input
              type="text"
              placeholder="Maxraj"
              value={denominator}
              onChange={(e) => setDenominator(e.target.value)}
              className="border p-2 w-16 text-center"
            />
          </div>
        )}

        {/* Tugmalar */}
        <div className="grid grid-cols-4 gap-2">
          <button
            className="bg-gray-200 p-2 rounded text-xl col-span-2"
            onClick={() => setShowInputs(true)}
          >
            <MathJax>{"\\(\\frac{a}{b}\\)"}</MathJax>
          </button>

          <button
            className="bg-gray-200 p-2 rounded text-xl col-span-2"
            onClick={() => {
              setNumerator("");
              setDenominator("");
            }}
          >
            Tozalash
          </button>
        </div>
      </div>
    </MathJaxContext>
  );
};

export default KasrComponent;
