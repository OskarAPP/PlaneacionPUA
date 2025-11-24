import React, { useState } from "react";

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const togglePanel = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const isCompleted = item.status === "listo";
        const isDisabled = item.disabled;
        return (
          <div key={item.slug || item.title} className="border rounded">
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
              <div className="flex items-center gap-2 text-xs">
                {item.isDirty && <span className="font-semibold text-amber-600">Cambios sin guardar</span>}
                {isCompleted && !item.isDirty && <span className="font-semibold text-green-700">Listo</span>}
                <button
                  type="button"
                  className="border rounded px-3 py-1 font-semibold text-blue-700 border-blue-600 hover:bg-blue-50 disabled:opacity-50"
                  disabled={isDisabled || item.saving}
                  onClick={() => item.onToggleComplete && item.onToggleComplete(item.slug, !isCompleted)}
                >
                  {item.saving ? 'Guardando...' : (isCompleted && !item.isDirty ? 'Editar' : 'Listo')}
                </button>
              </div>
            </div>
            <div className={`${isOpen ? "block" : "hidden"} px-4 py-3 border-t bg-white dark:bg-gray-900`}>
              <div className={`relative ${isCompleted && !item.isDirty ? "pointer-events-none opacity-60" : ""}`}>
                {isCompleted && !item.isDirty && (
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
