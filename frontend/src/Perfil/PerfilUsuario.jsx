import React, { useRef, useState } from "react";
import defaultAvatar from "../Imagenes/60aniversario.png";

const PerfilUsuario = () => {
  const fileInputRef = useRef(null);
  const [estadisticasOpen, setEstadisticasOpen] = useState(false);
  const [cuentaOpen, setCuentaOpen] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(defaultAvatar);
  const [subiendo, setSubiendo] = useState(false);

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
  const bills = [
    { nombre: "Phone bill", pagado: true },
    { nombre: "Intranet bill", pagado: false },
    { nombre: "House rent", pagado: true },
    { nombre: "Income tax", pagado: true },
  ];

  const handleFotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSubiendo(true);
    const formData = new FormData();
    formData.append("imagen", file);
    // Obtener id_acceso del localStorage
    const id_acceso = localStorage.getItem('id_acceso');
    formData.append("id_acceso", id_acceso);
    try {
      const response = await fetch("http://localhost:8000/api/imagenes", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Error al subir la imagen");
      const data = await response.json();
      const reader = new FileReader();
      reader.onload = (ev) => setFotoPerfil(ev.target.result);
      reader.readAsDataURL(file);
      alert("Imagen subida correctamente");
    } catch (err) {
      alert("Error al subir la imagen");
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen w-full h-full bg-white flex flex-row">
      {/* SIDEBAR */}
      <aside 
        className={`fixed left-0 top-[104px] z-20 w-16 hover:w-64 h-[calc(100vh-78px)] transition-all duration-300 bg-white border-r border-gray-200 shadow-xl overflow-hidden`}
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
      <div className="flex-1 min-h-screen flex flex-col bg-white ml-16 md:ml-40">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-12 py-6 bg-white border-b shadow-md">
        <div>
            <div className="text-2xl font-semibold text-gray-800">My finance dashboard</div>
            <div className="text-sm text-gray-400 mt-1">Welcome to xPay payment portal</div>
        </div>
        <div className="flex items-center gap-4">
            <img src={usuario.foto} className="w-10 h-10 rounded-full object-cover border-2 border-gray-200" alt="avatar" />
            <span className="text-gray-700 font-medium">Hello Sami</span>
            <i className="fa fa-chevron-down text-gray-400" />
        </div>
        </header>
        {/* Dashboard Content */}
        <main className="flex-1 flex flex-col items-start justify-start bg-white px-0 pt-32 pb-16 w-full relative">
        <div className="w-full max-w-7xl ml-0 mr-0 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-40 mt-0">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center col-span-1 md:col-span-1 border border-gray-100" style={{minWidth: 320}}>
              <div className="relative mb-4">
                <img
                  src={usuario.foto}
                  alt="Foto de perfil"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow"
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
                <span className="absolute bottom-2 right-2 bg-orange-500 text-white rounded-full p-1 cursor-pointer text-xs border-2 border-white" onClick={handleFotoClick} title="Editar foto">
                  <i className="fa fa-pencil" />
                </span>
              </div>
              <div className="w-full text-left">
                <div className="font-semibold text-lg text-gray-800 mb-1">My profile</div>
                <div className="text-xs text-gray-400 mb-2">{usuario.lastLogin}</div>
                <div className="border-b border-gray-200 mb-2" />
                <div className="text-base text-gray-700 font-medium mb-1">{usuario.nombre}</div>
                <div className="text-sm text-gray-500 mb-1">{usuario.telefono}</div>
                <div className="text-sm text-gray-500 mb-1">{usuario.correo}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-orange-500">SMS alerts activation</span>
                  <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                </div>
                <button className="mt-4 w-full bg-orange-500 text-white rounded-lg py-2 font-semibold shadow hover:bg-orange-600 transition">Save</button>
              </div>
            </div>
            {/* xPay accounts */}
            <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col col-span-1 border border-gray-100" style={{minWidth: 320}}>
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-lg text-gray-800">My xPay accounts</div>
                <button className="bg-gray-100 rounded px-3 py-1 text-gray-500 text-sm flex items-center gap-1"><i className="fa fa-pencil" /> Edit</button>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Active account</span>
                  <span className="text-gray-500 text-sm">8640 5698 8020 4256</span>
                  <button className="bg-red-500 text-white rounded px-3 py-1 text-xs font-semibold ml-2">Block Account</button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Blocked account</span>
                  <span className="text-gray-500 text-sm">8640 5698 8020 4256</span>
                  <button className="bg-green-500 text-white rounded px-3 py-1 text-xs font-semibold ml-2">Unlock account</button>
                </div>
              </div>
            </div>
            {/* My bills */}
            <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col col-span-1 border border-gray-100" style={{minWidth: 320}}>
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-lg text-gray-800">My bills</div>
                <button className="bg-gray-100 rounded px-3 py-1 text-gray-500 text-sm flex items-center gap-1"><i className="fa fa-filter" /> Filter by</button>
              </div>
              <div className="flex flex-col gap-3">
                {bills.map((bill, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${bill.pagado ? 'bg-green-500' : 'bg-pink-500'}`}></span>
                      <span className="text-gray-700">{bill.nombre}</span>
                    </div>
                    <span className={`rounded px-3 py-1 text-xs font-semibold ml-2 ${bill.pagado ? 'bg-green-100 text-green-700' : 'bg-pink-100 text-pink-700'}`}>{bill.pagado ? 'Bill paid' : 'Not paid'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Fondo decorativo inferior derecho */}
          <div className="absolute right-0 bottom-0 z-0 pointer-events-none select-none">
            <svg width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="320" y2="180" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
              <path d="M0 90L40 70C80 50 160 -10 240 10C320 30 400 90 440 130L480 170L0 180V90Z" fill="url(#paint0_linear)" />
            </svg>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PerfilUsuario;
