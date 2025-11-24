import React, { useState, useEffect, useMemo } from "react";
import { usePuaModulo } from "../context/PuaDocumentoContext";
import { API_BASE_URL } from "../utils/api";

const CompetenciasPerfilEgresoTabs = ({ carreraId = "", facultadId = "" }) => {
  const [tab, setTab] = useState(0);
  const [selectedGenericas, setSelectedGenericas] = useState([]);
  const [selectedEspecificas, setSelectedEspecificas] = useState([]);
  const [competenciasGenericas, setCompetenciasGenericas] = useState([]);
  const [competenciasEspecificas, setCompetenciasEspecificas] = useState([]);
  const [formacionTexto, setFormacionTexto] = useState("");
  const [unidadTexto, setUnidadTexto] = useState("");

  const [moduloData, setModuloData, meta] = usePuaModulo("competencias_perfil", {
    genericas: [],
    especificas: [],
    formacion: "",
    unidad: "",
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/competenciasgenericas`)
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

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/competenciaespecifica`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCompetenciasEspecificas(data);
        else setCompetenciasEspecificas([]);
      })
      .catch(() => setCompetenciasEspecificas([]));
  }, []);

  useEffect(() => {
    if (!moduloData) return;
    setSelectedGenericas(Array.isArray(moduloData.genericas) ? moduloData.genericas.map(item => item.index) : []);
    setSelectedEspecificas(Array.isArray(moduloData.especificas) ? moduloData.especificas.map(item => item.id) : []);
    setFormacionTexto(moduloData.formacion || "");
    setUnidadTexto(moduloData.unidad || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Genéricas handlers
  const handleCheck = idx => {
    const next = selectedGenericas.includes(idx)
      ? selectedGenericas.filter(i => i !== idx)
      : [...selectedGenericas, idx];
    setSelectedGenericas(next);
    setModuloData(prev => ({
      ...(prev || {}),
      genericas: next.map(i => ({ index: i, competencia: competenciasGenericas[i] || null })),
    }));
  };
  const handleRemove = idx => {
    const next = selectedGenericas.filter(i => i !== idx);
    setSelectedGenericas(next);
    setModuloData(prev => ({
      ...(prev || {}),
      genericas: next.map(i => ({ index: i, competencia: competenciasGenericas[i] || null })),
    }));
  };

  // Específicas handlers
  const handleCheckEsp = id => {
    const next = selectedEspecificas.includes(id)
      ? selectedEspecificas.filter(i => i !== id)
      : [...selectedEspecificas, id];
    setSelectedEspecificas(next);
    setModuloData(prev => ({
      ...(prev || {}),
      especificas: next.map(i => {
        const data = competenciasEspecificas.find(c => String(c.competencia_esp_id) === String(i));
        return data ? { id: data.competencia_esp_id, nombre: data.nombre } : { id: i };
      }),
    }));
  };
  const handleRemoveEsp = id => {
    const next = selectedEspecificas.filter(i => i !== id);
    setSelectedEspecificas(next);
    setModuloData(prev => ({
      ...(prev || {}),
      especificas: next.map(i => {
        const data = competenciasEspecificas.find(c => String(c.competencia_esp_id) === String(i));
        return data ? { id: data.competencia_esp_id, nombre: data.nombre } : { id: i };
      }),
    }));
  };

  const filteredEspecificas = useMemo(() => {
    return competenciasEspecificas.filter((competencia) => {
      if (carreraId) {
        return String(competencia.carrera_id) === String(carreraId);
      }
      if (facultadId) {
        return String(competencia.facultad_id) === String(facultadId);
      }
      return true;
    });
  }, [competenciasEspecificas, carreraId, facultadId]);

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
                {filteredEspecificas.map((e) => (
                  <label key={e.competencia_esp_id || e.id} className="flex items-center gap-2 px-2 py-1 border-b last:border-b-0 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedEspecificas.includes(e.competencia_esp_id)}
                      onChange={() => handleCheckEsp(e.competencia_esp_id)}
                    />
                    <span className="text-gray-800">{e.nombre}</span>
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
                {selectedEspecificas.map(id => {
                  const competencia = competenciasEspecificas.find(c => String(c.competencia_esp_id) === String(id));
                  if (!competencia) return null;
                  return (
                    <div key={competencia.competencia_esp_id} className="flex items-center justify-between px-2 py-1 border-b last:border-b-0">
                      <span className="text-gray-800">{competencia.nombre}</span>
                      <button type="button" className="text-gray-400 hover:text-red-600 ml-2" onClick={() => handleRemoveEsp(competencia.competencia_esp_id)}>
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
        {/* Competencias de Formación y Unidad */}
        {tab === 2 && (
          <div className="w-full flex flex-col gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Competencias del área de formación</label>
              <textarea
                className="w-full border rounded px-2 py-2 min-h-[60px]"
                value={formacionTexto}
                onChange={e => {
                  const value = e.target.value;
                  setFormacionTexto(value);
                  setModuloData(prev => ({
                    ...(prev || {}),
                    formacion: value,
                  }));
                }}
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Competencia de Unidad de Aprendizaje</label>
              <textarea
                className="w-full border rounded px-2 py-2 min-h-[60px]"
                value={unidadTexto}
                onChange={e => {
                  const value = e.target.value;
                  setUnidadTexto(value);
                  setModuloData(prev => ({
                    ...(prev || {}),
                    unidad: value,
                  }));
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetenciasPerfilEgresoTabs;
