import React, { useState, useEffect } from "react";
import { genericas, especificas } from "../constants/puaConstants";

const CompetenciasPerfilEgresoTabs = () => {
  const [tab, setTab] = useState(0);
  const [selectedGenericas, setSelectedGenericas] = useState([]);
  const [selectedEspecificas, setSelectedEspecificas] = useState([0, 1, 2]);
  const [competenciasGenericas, setCompetenciasGenericas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/competenciasgenericas")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCompetenciasGenericas(data);
        } else if (Array.isArray(data.competencias)) {
          setCompetenciasGenericas(data.competencias);
        } else {
          setCompetenciasGenericas([]);
        }
      })
      .catch(() => setCompetenciasGenericas([]));
  }, []);

  // Genéricas handlers
  const handleCheck = idx => {
    setSelectedGenericas(selectedGenericas.includes(idx)
      ? selectedGenericas.filter(i => i !== idx)
      : [...selectedGenericas, idx]);
  };
  const handleRemove = idx => {
    setSelectedGenericas(selectedGenericas.filter(i => i !== idx));
  };

  // Específicas handlers
  const handleCheckEsp = idx => {
    setSelectedEspecificas(selectedEspecificas.includes(idx)
      ? selectedEspecificas.filter(i => i !== idx)
      : [...selectedEspecificas, idx]);
  };
  const handleRemoveEsp = idx => {
    setSelectedEspecificas(selectedEspecificas.filter(i => i !== idx));
  };

  return (
    <div>
      <div className="flex border-b mb-4">
        <button type="button" onClick={() => setTab(0)} className={`px-4 py-2 -mb-px border-b-2 ${tab === 0 ? 'border-blue-500 text-blue-700 font-bold bg-white' : 'border-transparent text-gray-500'} focus:outline-none`}>Genéricas</button>
        <button type="button" onClick={() => setTab(1)} className={`px-4 py-2 -mb-px border-b-2 ${tab === 1 ? 'border-blue-500 text-blue-700 font-bold bg-white' : 'border-transparent text-gray-500'} focus:outline-none`}>Específicas</button>
        <button type="button" onClick={() => setTab(2)} className={`px-4 py-2 -mb-px border-b-2 ${tab === 2 ? 'border-blue-500 text-blue-700 font-bold bg-white' : 'border-transparent text-gray-500'} focus:outline-none`}>Competencias de Formación y Unidad</button>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Genéricas */}
        {tab === 0 && (
          <>
            <div className="flex-1">
              <div className="bg-white border rounded p-2">
                {competenciasGenericas.map((g, idx) => (
                  <label key={g.competencia_id || g.id || idx} className="flex items-center gap-2 px-2 py-1 border-b last:border-b-0 cursor-pointer">
                    <input type="checkbox" checked={selectedGenericas.includes(idx)} onChange={() => handleCheck(idx)} />
                    <span className="text-gray-800">{g.nombre || g.descripcion || g.competencia || g}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <button type="button" className="border border-blue-700 text-blue-700 bg-white rounded px-3 py-2 mt-6 md:mt-0 flex items-center justify-center h-10 w-10 shadow hover:bg-blue-50 hover:border-blue-800">
                <span className="fa fa-arrow-right" />
              </button>
            </div>
            <div className="flex-1">
              <div className="bg-white border rounded p-2 min-h-[120px]">
                {selectedGenericas.map(idx => (
                  <div key={competenciasGenericas[idx]?.competencia_id || idx} className="flex items-center justify-between px-2 py-1 border-b last:border-b-0">
                    <span className="text-gray-800">{competenciasGenericas[idx]?.nombre || competenciasGenericas[idx]?.descripcion || competenciasGenericas[idx]?.competencia || competenciasGenericas[idx]}</span>
                    <button type="button" className="text-gray-400 hover:text-red-600 ml-2" onClick={() => handleRemove(idx)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {/* Específicas */}
        {tab === 1 && (
          <>
            <div className="flex-1">
              <div className="bg-white border rounded p-2">
                {especificas.map((e, idx) => (
                  <label key={e} className="flex items-center gap-2 px-2 py-1 border-b last:border-b-0 cursor-pointer">
                    <input type="checkbox" checked={selectedEspecificas.includes(idx)} onChange={() => handleCheckEsp(idx)} />
                    <span className="text-gray-800">{e}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <button type="button" className="border border-blue-700 text-blue-700 bg-white rounded px-3 py-2 mt-6 md:mt-0 flex items-center justify-center h-10 w-10 shadow hover:bg-blue-50 hover:border-blue-800">
                <span className="fa-solid fa-arrow-right"/>
              </button>
            </div>
            <div className="flex-1">
              <div className="bg-white border rounded p-2 min-h-[120px]">
                {selectedEspecificas.map(idx => (
                  <div key={especificas[idx]} className="flex items-center justify-between px-2 py-1 border-b last:border-b-0">
                    <span className="text-gray-800">{especificas[idx]}</span>
                    <button type="button" className="text-gray-400 hover:text-red-600 ml-2" onClick={() => handleRemoveEsp(idx)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {/* Competencias de Formación y Unidad */}
        {tab === 2 && (
          <form className="w-full flex flex-col gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Competencias del área de formación</label>
              <textarea className="w-full border rounded px-2 py-2 min-h-[60px]" placeholder="" />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Competencia de Unidad de Aprendizaje</label>
              <textarea className="w-full border rounded px-2 py-2 min-h-[60px]" placeholder="" />
            </div>
            <div>
              <button type="submit" className="border border-blue-700 text-blue-700 bg-white rounded px-4 py-2 mt-2 flex items-center gap-2 shadow hover:bg-blue-50 hover:border-blue-800">
                <span className="fa fa-check" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CompetenciasPerfilEgresoTabs;
