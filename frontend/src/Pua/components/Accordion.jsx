import React, { useState, useEffect } from "react";

const Accordion = ({ accordionData }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [completedPanels, setCompletedPanels] = useState(() => accordionData.map(() => false));

  useEffect(() => {
    setCompletedPanels(prev => {
      if (prev.length === accordionData.length) return prev;
      const next = accordionData.map((_, idx) => prev[idx] || false);
      return next;
    });
  }, [accordionData.length]);

  const togglePanel = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const toggleComplete = (idx) => {
    setCompletedPanels(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
    setOpenIndex(current => (current === idx ? null : current));
  };

  return (
    <div className="space-y-3">
      {accordionData.map((item, idx) => {
        const isOpen = openIndex === idx;
        const isCompleted = completedPanels[idx];
        return (
          <div key={item.title} className="border rounded">
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700">
              <button
                type="button"
                className="flex-1 text-left font-semibold flex items-center justify-between"
                onClick={() => togglePanel(idx)}
                aria-expanded={isOpen}
              >
                <span>{item.title}</span>
                <span>{isOpen ? "▲" : "▼"}</span>
              </button>
              <div className="flex items-center gap-2">
                {isCompleted && <span className="text-xs font-semibold text-green-700">Listo</span>}
                <button
                  type="button"
                  className="text-xs border rounded px-3 py-1 font-semibold text-blue-700 border-blue-600 hover:bg-blue-50"
                  onClick={() => toggleComplete(idx)}
                >
                  {isCompleted ? "Editar" : "Listo"}
                </button>
              </div>
            </div>
            <div className={`${isOpen ? "block" : "hidden"} px-4 py-3 border-t bg-white dark:bg-gray-900`}>
              <div className={`relative ${isCompleted ? "pointer-events-none opacity-60" : ""}`}>
                {isCompleted && (
                  <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/60 flex items-center justify-center text-sm font-semibold text-gray-600 dark:text-gray-200">
                    Módulo marcado como listo. Pulsa "Editar" para continuar.
                  </div>
                )}
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
