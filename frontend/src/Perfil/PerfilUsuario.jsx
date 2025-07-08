import React, { useRef, useState, useEffect } from "react";
import defaultAvatar from "../Imagenes/60aniversario.png";

const PerfilUsuario = () => {
  const fileInputRef = useRef(null);
  const [estadisticasOpen, setEstadisticasOpen] = useState(false);
  const [cuentaOpen, setCuentaOpen] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(defaultAvatar);
  const [subiendo, setSubiendo] = useState(false);
  const [docente, setDocente] = useState(null);

  // Cargar imagen de perfil al montar el componente
  useEffect(() => {
    const acceso_id = localStorage.getItem("id_acceso");
    if (acceso_id) {
      fetch(`http://localhost:8000/api/perfil-imagen/${acceso_id}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.url) setFotoPerfil(data.url);
        });
    }
  }, []);

  // Cargar datos del docente desde la API
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id_docente) {
      fetch(`http://localhost:8000/api/docente/${user.id_docente}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setDocente(data.docente);
        });
    }
  }, []);

  const handleSidebarMouseLeave = () => {
    setEstadisticasOpen(false);
    setCuentaOpen(false);
  };

  // Datos de demostración
  const usuario = {
    nombre: "Sami Rahman",
    cargo: "Director de Facultad",
    unidad: "Facultad de Ingeniería",
    titulo: "M. en C.",
    correo: "Samirahman007@gmail.com",
    telefono: "+1-856-559-965-1236",
    foto: fotoPerfil,
    lastLogin: "Last login: 17 Aug 2018 14:54 (Kendall in DC, New York, US)",
  };

  // Materias impartidas por el docente
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id_docente) {
      fetch(`http://localhost:8000/api/docentes/${user.id_docente}/materias`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setMaterias(data);
        });
    }
  }, []);

  const handleFotoClick = () => {
    if (!subiendo) fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSubiendo(true);

    const acceso_id = localStorage.getItem("id_acceso");

    if (!acceso_id) {
      alert("No se encontró el id_acceso en localStorage");
      setSubiendo(false);
      return;
    }

    const formData = new FormData();
    formData.append("imagen", file);
    formData.append("acceso_id", acceso_id);

    try {
      const response = await fetch("http://localhost:8000/api/imagenes", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      // Refrescar la imagen de perfil desde el backend
      fetch(`http://localhost:8000/api/perfil-imagen/${acceso_id}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.url) setFotoPerfil(data.url);
        });

      alert("Imagen subida correctamente");

    } catch (err) {
      console.error("Error al subir la imagen:", err);
      alert("Error al subir la imagen");
    } finally {
      setSubiendo(false);
    }
  };

  // Componente Row reutilizable
  const Row = ({ label, value }) => (
    <div className="flex items-center gap-4 mb-3">
      <span className="w-32 font-medium text-gray-600">{label}:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen min-w-screen w-full h-full bg-gray-50 dark:bg-gray-900 flex flex-row">
      {/* SIDEBAR */}
      <aside 
        className={`fixed left-0 top-[104px] z-20 w-16 hover:w-64 h-[calc(100vh-78px)] transition-all duration-300 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden`}
        aria-label="Sidebar"
        onMouseLeave={handleSidebarMouseLeave}
      >
        <div className="h-full px-2 py-4 flex flex-col">
          <ul className="space-y-1 font-medium">
            <li>
              <a 
                href="/procesarpua" 
                className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 transition-colors group"
              >
                <span className="min-w-[20px] flex justify-center items-center">
                  <svg className="w-5 h-5 text-blue-500 transition duration-75 group-hover:text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 3a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7.828a2 2 0 00-.586-1.414l-4.828-4.828A2 2 0 0013.172 1H7zm0 0v2a2 2 0 002 2h6a2 2 0 002-2V3m-8 8h8m-8 4h8" />
                  </svg>
                </span>
                <span className="ms-3 whitespace-nowrap overflow-hidden transition-all duration-300 opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 text-base">Crear PUA</span>
              </a>
            </li>
            <li>
              <a 
                href="/puaversion" 
                className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 transition-colors group"
              >
                <span className="min-w-[20px] flex justify-center items-center">
                  <svg className="w-5 h-5 text-blue-500 transition duration-75 group-hover:text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0C4.612 0 0 5.336 0 7v3c0 1.664 4.612 7 10 7s10-5.336 10-7V7c0-1.664-4.612-7-10-7zm0 16c-3.796 0-7-1.794-7-3v-2.394C4.394 12.12 7.2 13 10 13s5.606-.88 7-2.394V13c0 1.206-3.204 3-7 3z"/>
                    <path d="M10 10c2.796 0 5-1.196 5-2s-2.204-2-5-2-5 1.196-5 2 2.204 2 5 2z"/>
                  </svg>
                </span>
                <span className="ms-3 whitespace-nowrap overflow-hidden transition-all duration-300 opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 text-base">Consultar PUA</span>
              </a>
            </li>
            <li className="relative">
              <button
                onClick={() => setEstadisticasOpen(!estadisticasOpen)}
                className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-blue-100 transition-colors group focus:outline-none bg-transparent"
                style={{ backgroundColor: 'transparent' }}
              >
                <span className="min-w-[20px] flex justify-center items-center">
                  <svg className="w-5 h-5 text-blue-500 transition duration-75 group-hover:text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                  </svg>
                </span>
                <span className="ms-3 whitespace-nowrap overflow-hidden transition-all duration-300 opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 text-base">Estadísticas</span>
                <svg className="ms-auto w-4 h-4 text-blue-400 transition-transform duration-300 group-hover:text-blue-700" fill="currentColor" viewBox="0 0 20 20" 
                  style={{ transform: estadisticasOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {estadisticasOpen && (
                <ul className="mt-1 space-y-1 pl-6 border-l border-blue-200 ml-3">
                  <li>
                    <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md">Genéricas</a>
                  </li>
                  <li>
                    <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md">Específicas</a>
                  </li>
                </ul>
              )}
            </li>
            <li className="relative">
              <button
                onClick={() => setCuentaOpen(!cuentaOpen)}
                className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-blue-100 transition-colors group focus:outline-none bg-transparent"
                style={{ backgroundColor: 'transparent' }}
              >
                <span className="min-w-[20px] flex justify-center items-center">
                  <svg className="w-5 h-5 text-blue-500 transition duration-75 group-hover:text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </span>
                <span className="ms-3 whitespace-nowrap overflow-hidden transition-all duration-300 opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 text-base">Mi Cuenta</span>
                <svg className="ms-auto w-4 h-4 text-blue-400 transition-transform duration-300 group-hover:text-blue-700" fill="currentColor" viewBox="0 0 20 20" 
                  style={{ transform: cuentaOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {cuentaOpen && (
                <ul className="mt-1 space-y-1 pl-6 border-l border-blue-200 ml-3">
                  <li>
                    <a href="/PanelAcceso" className="block p-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md">Inicio</a>
                  </li>
                  <li>
                    <a href="/perfilusuario" className="block p-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md">Perfil</a>
                  </li>
                  <li>
                    <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md">Contraseña</a>
                  </li>
                  <li>
                    <a href="#" className="block p-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md">Configuración</a>
                  </li>
                  <li>
                    <a href="#" className="block p-2 text-sm text-red-600 hover:bg-red-50 rounded-md">Cerrar sesión</a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </aside>

      {/* MAIN DASHBOARD */}
      <div className="flex-1 min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 ml-16 md:ml-40">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-6 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-md">
          <div>
            <a href="../PanelAcceso" className="flex items-center ms-4">
              <img
                src="../src/imagenes/60aniversario.png"
                className="h-12 me-2"
                alt="FDI"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Programas de Unidad<br />de Aprendizaje
              </span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <img src={fotoPerfil} className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-800" alt="avatar" />
            <span className="text-gray-700 dark:text-gray-200 font-medium">{docente?.nombre || 'Usuario'}</span>
            <i className="fa fa-chevron-down text-gray-400 dark:text-gray-300" />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 flex flex-col items-start justify-start bg-gray-50 dark:bg-gray-900 px-0 pt-32 pb-16 w-full relative">
          <div className="w-full max-w-7xl ml-0 mr-0 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-80 px-10 md:px-25 mt-0">
            {/* Profile Card */}
            <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center col-span-1 md:col-span-1 border border-gray-100 dark:border-gray-700 dark:shadow-2xl dark:shadow-blue-900/30" style={{minWidth: 320}}>
              <div className="relative mb-4">
                <img
                  src={fotoPerfil}
                  alt="Foto de perfil"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-blue-900 shadow"
                  onClick={handleFotoClick}
                  style={{ cursor: 'pointer' }}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={subiendo}
                />
                <span className="absolute bottom-2 right-2 bg-orange-500 text-white rounded-full p-1 cursor-pointer text-xs border-2 border-white dark:border-gray-900" onClick={handleFotoClick} title="Editar foto">
                  <i className="fa fa-pencil" />
                </span>
              </div>
              <div className="w-full text-left">
                <div className="font-semibold text-lg text-gray-800 dark:text-white mb-1">{docente?.nombre || 'Usuario'}</div>
                <div className="text-xs text-gray-400 dark:text-gray-300 mb-2">{docente?.correo || 'Sin correo'}</div>
                <div className="border-b border-gray-200 dark:border-gray-700 mb-2" />
                <div className="text-base text-gray-700 dark:text-gray-200 font-medium mb-1">{docente?.titulo || 'Sin título'}</div>
                <div className="text-sm text-gray-500 dark:text-gray-300 mb-1">{docente?.apellido_paterno || ''} {docente?.apellido_materno || ''}</div>
                {/* Puedes agregar más datos aquí si lo deseas */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-orange-500">SMS alerts activation</span>
                  <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                </div>
                <button className="mt-4 w-full bg-orange-500 text-white rounded-lg py-2 font-semibold shadow hover:bg-orange-600 transition">Guardar</button>
              </div>
            </div>
            {/* Datos Academicos Tarjeta */}
            <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 flex flex-col col-span-1 border border-gray-100 dark:border-gray-700 dark:shadow-2xl dark:shadow-purple-900/30" style={{minWidth: 320}}>
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-lg text-gray-800 dark:text-white">DATOS ACADEMICOS</div>
                <button className="bg-gray-100 dark:bg-gray-800 rounded px-3 py-1 text-gray-500 dark:text-gray-300 text-sm flex items-center gap-1"><i className="fa fa-pencil" /> Edit</button>
              </div>
              <div className="flex flex-col gap-2">
                {/* Cargo */}
                <div className="flex flex-col mb-2">
                  <span className="text-xs text-gray-400 dark:text-gray-300 uppercase tracking-wide">Cargo</span>
                  <span className="text-base text-gray-800 dark:text-gray-100 font-semibold">{docente?.titulo || 'Sin cargo'}</span>
                </div>
                {/* Facultades */}
                <div className="flex flex-col mb-2">
                  <span className="text-xs text-gray-400 dark:text-gray-300 uppercase tracking-wide">Facultad(es)</span>
                  {docente?.facultades && docente.facultades.length > 0 ? (
                    <ul className="list-disc list-inside ml-2">
                      {docente.facultades.map((fac, idx) => (
                        <li key={idx} className="text-gray-800 dark:text-gray-100 text-sm">{fac}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Sin facultades</span>
                  )}
                </div>
                {/* Carreras */}
                <div className="flex flex-col mb-2">
                  <span className="text-xs text-gray-400 dark:text-gray-300 uppercase tracking-wide">Carrera(s)</span>
                  {docente?.carreras && docente.carreras.length > 0 ? (
                    <ul className="list-disc list-inside ml-2">
                      {docente.carreras.map((car, idx) => (
                        <li key={idx} className="text-gray-800 dark:text-gray-100 text-sm">{car}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Sin carreras</span>
                  )}
                </div>
              </div>
            </div>
            {/* Materias impartidas */}
            <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 flex flex-col col-span-1 border border-gray-100 dark:border-gray-700 dark:shadow-2xl dark:shadow-yellow-900/30" style={{minWidth: 320}}>
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-lg text-gray-800 dark:text-white">Materias impartidas</div>
              </div>
              <div className="flex flex-col gap-2">
                {materias.length > 0 ? (
                  <ul className="list-disc list-inside ml-2">
                    {materias.map((mat, idx) => (
                      <li key={mat.materia_id || idx} className="text-gray-800 dark:text-gray-100 text-sm">{mat.nombre}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400 text-sm">No tiene materias asignadas</span>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PerfilUsuario;