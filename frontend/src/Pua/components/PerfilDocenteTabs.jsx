import React, { useState } from "react";
import PerfilAcademicoModal from "./modals/PerfilAcademicoModal";

const PerfilDocenteTabs = () => {
  const [tab, setTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(0); // 0: Académicos, 1: Profesionales, 2: Docentes
  const [perfilesAcademicos, setPerfilesAcademicos] = useState([]);
  const [perfilesProfesionales, setPerfilesProfesionales] = useState([]);
  const [perfilesDocentes, setPerfilesDocentes] = useState([]);

  const handleAddPerfil = (perfil) => {
    if (!perfil.trim()) return;
    if (modalType === 0) setPerfilesAcademicos([...perfilesAcademicos, perfil]);
    else if (modalType === 1) setPerfilesProfesionales([...perfilesProfesionales, perfil]);
    else if (modalType === 2) setPerfilesDocentes([...perfilesDocentes, perfil]);
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
                    onClick={() => setPerfilesAcademicos(perfilesAcademicos.filter((_, i) => i !== idx))}
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
                    onClick={() => setPerfilesProfesionales(perfilesProfesionales.filter((_, i) => i !== idx))}
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
                    onClick={() => setPerfilesDocentes(perfilesDocentes.filter((_, i) => i !== idx))}
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
