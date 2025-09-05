import React, { useState } from "react";

const Accordion = ({ accordionData }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-2">
      {accordionData.map((item, idx) => (
        <div key={item.title} className="border rounded mb-2">
          <button
            type="button"
            className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 font-semibold flex justify-between items-center"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            <span>{item.title}</span>
            <span>{openIndex === idx ? "▲" : "▼"}</span>
          </button>
          {openIndex === idx && (
            <div className="px-4 py-2">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
