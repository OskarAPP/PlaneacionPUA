import React, { useState, useEffect } from "react";
import { usePuaModulo } from "../context/PuaDocumentoContext";
import PerfilAcademicoModal from "./modals/PerfilAcademicoModal";

const PerfilDocenteTabs = () => {
  const [tab, setTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(0); // 0: Académicos, 1: Profesionales, 2: Docentes
  const [perfilesAcademicos, setPerfilesAcademicos] = useState([]);
  const [perfilesProfesionales, setPerfilesProfesionales] = useState([]);
  const [perfilesDocentes, setPerfilesDocentes] = useState([]);

  const [moduloData, setModuloData] = usePuaModulo("perfil_docente", {
    academicos: [],
    profesionales: [],
    docentes: [],
  });

  useEffect(() => {
    if (!moduloData) return;
    setPerfilesAcademicos(Array.isArray(moduloData.academicos) ? moduloData.academicos : []);
    setPerfilesProfesionales(Array.isArray(moduloData.profesionales) ? moduloData.profesionales : []);
    setPerfilesDocentes(Array.isArray(moduloData.docentes) ? moduloData.docentes : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const syncModuloData = (nextAcademicos = perfilesAcademicos, nextProfesionales = perfilesProfesionales, nextDocentes = perfilesDocentes) => {
    setModuloData({
      academicos: nextAcademicos,
      profesionales: nextProfesionales,
      docentes: nextDocentes,
    });
  };

  const handleAddPerfil = (perfil) => {
    if (!perfil.trim()) return;
    if (modalType === 0) {
      const next = [...perfilesAcademicos, perfil];
      setPerfilesAcademicos(next);
      syncModuloData(next, perfilesProfesionales, perfilesDocentes);
    } else if (modalType === 1) {
      const next = [...perfilesProfesionales, perfil];
      setPerfilesProfesionales(next);
      syncModuloData(perfilesAcademicos, next, perfilesDocentes);
    } else if (modalType === 2) {
      const next = [...perfilesDocentes, perfil];
      setPerfilesDocentes(next);
      syncModuloData(perfilesAcademicos, perfilesProfesionales, next);
    }
  };

  return (
    <div>
      <PerfilAcademicoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddPerfil}
        titulo={modalType === 0 ? 'Perfil Académico...' : modalType === 1 ? 'Perfil Profesional...' : 'Perfil Docente...'}
      />
      <div className="flex border-b mb-4">
        <button type="button" onClick={() => setTab(0)} className={`px-8 py-2 -mb-px border-b-2 ${tab === 0 ? 'border-gray-400 text-black bg-white font-semibold' : 'border-transparent text-blue-700'} focus:outline-none`}>Académicos</button>
        <button type="button" onClick={() => setTab(1)} className={`px-8 py-2 -mb-px border-b-2 ${tab === 1 ? 'border-gray-400 text-black bg-white font-semibold' : 'border-transparent text-blue-700'} focus:outline-none`}>Profesionales</button>
        <button type="button" onClick={() => setTab(2)} className={`px-8 py-2 -mb-px border-b-2 ${tab === 2 ? 'border-gray-400 text-black bg-white font-semibold' : 'border-transparent text-blue-700'} focus:outline-none`}>Docentes</button>
      </div>
      <div className="mt-4">
        {tab === 0 && (
          <>
            <button type="button" className="border border-blue-700 text-blue-700 bg-white px-2 py-1 rounded text-xs mb-4 hover:bg-blue-50 hover:border-blue-800" onClick={() => { setModalType(0); setModalOpen(true); }}>Nuevo perfil...</button>
            <div className="space-y-2">
              {perfilesAcademicos.map((perfil, idx) => (
                <div key={idx} className="border rounded p-2 bg-white text-gray-800 text-sm flex items-center justify-between">
                  <span>{perfil}</span>
                  <button type="button"
                    className="text-gray-400 hover:text-red-600 ml-2 text-lg font-bold px-2 py-0.5"
                    onClick={() => {
                      const next = perfilesAcademicos.filter((_, i) => i !== idx);
                      setPerfilesAcademicos(next);
                      syncModuloData(next, perfilesProfesionales, perfilesDocentes);
                    }}
                    title="Eliminar"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === 1 && (
          <>
            <button type="button" className="border border-blue-700 text-blue-700 bg-white px-2 py-1 rounded text-xs mb-4 hover:bg-blue-50 hover:border-blue-800" onClick={() => { setModalType(1); setModalOpen(true); }}>Nuevo perfil...</button>
            <div className="space-y-2">
              {perfilesProfesionales.map((perfil, idx) => (
                <div key={idx} className="border rounded p-2 bg-white text-gray-800 text-sm flex items-center justify-between">
                  <span>{perfil}</span>
                  <button type="button"
                    className="text-gray-400 hover:text-red-600 ml-2 text-lg font-bold px-2 py-0.5"
                    onClick={() => {
                      const next = perfilesProfesionales.filter((_, i) => i !== idx);
                      setPerfilesProfesionales(next);
                      syncModuloData(perfilesAcademicos, next, perfilesDocentes);
                    }}
                    title="Eliminar"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === 2 && (
          <>
            <button type="button" className="border border-blue-700 text-blue-700 bg-white px-2 py-1 rounded text-xs mb-4 hover:bg-blue-50 hover:border-blue-800" onClick={() => { setModalType(2); setModalOpen(true); }}>Nuevo perfil...</button>
            <div className="space-y-2">
              {perfilesDocentes.map((perfil, idx) => (
                <div key={idx} className="border rounded p-2 bg-white text-gray-800 text-sm flex items-center justify-between">
                  <span>{perfil}</span>
                  <button type="button"
                    className="text-gray-400 hover:text-red-600 ml-2 text-lg font-bold px-2 py-0.5"
                    onClick={() => {
                      const next = perfilesDocentes.filter((_, i) => i !== idx);
                      setPerfilesDocentes(next);
                      syncModuloData(perfilesAcademicos, perfilesProfesionales, next);
                    }}
                    title="Eliminar"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PerfilDocenteTabs;
