import React, { useState, useRef, useEffect } from "react";

const Docentes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [cuentaOpen, setCuentaOpen] = useState(false);
  const cuentaRef = useRef(null);
  const docentesRef = useRef(null);
  const carrerasRef = useRef(null);
  const materiasRef = useRef(null);
  const academiasRef = useRef(null);
  const facultadRef = useRef(null);
  const compeGenRef = useRef(null);
  const compeEspecRef = useRef(null);

  // Estado para los docentes
  const [docentesData, setDocentesData] = useState([]);
  const [facultades, setFacultades] = useState([]);

  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para el orden
  const [sortOrder, setSortOrder] = useState("az");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState(null);
  const [selectedFacultad, setSelectedFacultad] = useState("");
  const [modalError, setModalError] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [viewFacModalOpen, setViewFacModalOpen] = useState(false);
  const [facultadesDocente, setFacultadesDocente] = useState([]);
  const [docenteNombreModal, setDocenteNombreModal] = useState("");

  // Obtener docentes desde la API
  useEffect(() => {
    fetch('http://localhost:8000/api/docentes')
      .then(res => res.json())
      .then(data => {
        if (data.success) setDocentesData(data.docentes);
      });
  }, []);

  // Obtener facultades para el modal
  useEffect(() => {
    fetch('http://localhost:8000/api/facultades')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setFacultades(data);
      });
  }, []);

  // Docentes filtrados y ordenados
  const filteredDocentes = docentesData
    .filter((docente) => {
      const term = searchTerm.toLowerCase();
      return (
        docente.nombre?.toLowerCase().includes(term) ||
        docente.apellido_paterno?.toLowerCase().includes(term) ||
        docente.apellido_materno?.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      // Ordenar por nombre, luego apellidos
      const fullA = `${a.nombre} ${a.apellido_paterno} ${a.apellido_materno}`.toLowerCase();
      const fullB = `${b.nombre} ${b.apellido_paterno} ${b.apellido_materno}`.toLowerCase();
      if (sortOrder === "az") {
        return fullA.localeCompare(fullB);
      } else {
        return fullB.localeCompare(fullA);
      }
    });

  // Cerrar menús si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      [cuentaRef, docentesRef, carrerasRef, materiasRef, academiasRef, facultadRef, compeGenRef, compeEspecRef].forEach(ref => {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdownOpen(prev => ({ ...prev, [ref.current.dataset.key]: false }));
        }
      });
      if (cuentaRef.current && !cuentaRef.current.contains(event.target)) {
        setCuentaOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cerrar sidebar si se hace clic fuera
  useEffect(() => {
    function handleSidebarClickOutside(event) {
      const sidebar = document.querySelector('aside');
      if (sidebarOpen && sidebar && !sidebar.contains(event.target)) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleSidebarClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleSidebarClickOutside);
    };
  }, [sidebarOpen]);

  // Alternar dropdowns
  const toggleDropdown = (key) => {
    setDropdownOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Abrir modal para agregar facultad
  const handleOpenModal = (docente) => {
    setSelectedDocente(docente);
    setSelectedFacultad("");
    setModalError("");
    setModalOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDocente(null);
    setSelectedFacultad("");
    setModalError("");
  };

  // Registrar facultad al docente
  const handleRegistrarFacultad = async () => {
    if (!selectedFacultad) {
      setModalError("Selecciona una facultad.");
      return;
    }
    setModalLoading(true);
    setModalError("");
    try {
      const res = await fetch(`http://localhost:8000/api/docentes/${selectedDocente.docente_id}/facultades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ facultad_id: selectedFacultad })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Actualizar facultades en la tabla (recargar docentes)
        fetch('http://localhost:8000/api/docentes')
          .then(res => res.json())
          .then(data => {
            if (data.success) setDocentesData(data.docentes);
          });
        handleCloseModal();
      } else if (data.message) {
        setModalError(data.message);
      } else {
        setModalError("No se pudo registrar la facultad.");
      }
    } catch (err) {
      setModalError("Error de conexión.");
    }
    setModalLoading(false);
  };

  // Abrir modal para ver facultades del docente
  const handleOpenViewFacModal = (docente) => {
    setFacultadesDocente(Array.isArray(docente.facultades) ? docente.facultades : []);
    setDocenteNombreModal(`${docente.nombre} ${docente.apellido_paterno} ${docente.apellido_materno || ''}`);
    setViewFacModalOpen(true);
  };
  // Cerrar modal de ver facultades
  const handleCloseViewFacModal = () => {
    setViewFacModalOpen(false);
    setFacultadesDocente([]);
    setDocenteNombreModal("");
  };

  return (
    <div className="min-h-screen w-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50 overflow-y-auto max-h-screen custom-scrollbar border-r border-gray-200 dark:border-gray-700`}
        style={{ scrollbarColor: '#2563eb #fff', scrollbarWidth: 'thin' }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300">Menú</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 border border-blue-700 dark:border-blue-400 rounded-md p-2 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-800 dark:hover:border-blue-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {/* Dropdowns */}
          <div ref={docentesRef} data-key="docentes">
            <button onClick={() => toggleDropdown('docentes')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-900 border border-blue-700 dark:border-blue-400 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-800 dark:hover:border-blue-500 font-medium transition-colors">
              <span>Docentes</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['docentes'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="/docentes" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md">Docentes registrados</a>
                <a href="/registrodocentes" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={carrerasRef} data-key="carreras">
            <button onClick={() => toggleDropdown('carreras')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-900 border border-blue-700 dark:border-blue-400 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-800 dark:hover:border-blue-500 font-medium transition-colors">
              <span>Carreras</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['carreras'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="/carreras" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md">Carreras registradas</a>
                <a href="#" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={materiasRef} data-key="materias">
            <button onClick={() => toggleDropdown('materias')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-900 border border-blue-700 dark:border-blue-400 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-800 dark:hover:border-blue-500 font-medium transition-colors">
              <span>Materias</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['materias'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="/materias" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md">Materias registradas</a>
                <a href="#" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={academiasRef} data-key="academias">
            <button onClick={() => toggleDropdown('academias')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-900 border border-blue-700 dark:border-blue-400 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-800 dark:hover:border-blue-500 font-medium transition-colors">
              <span>Academias</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['academias'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="#" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md">Academias registradas</a>
                <a href="#" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={facultadRef} data-key="facultad">
            <button onClick={() => toggleDropdown('facultad')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-900 border border-blue-700 dark:border-blue-400 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-800 dark:hover:border-blue-500 font-medium transition-colors">
              <span>Facultad</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['facultad'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="#" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={compeGenRef} data-key="compeGen">
            <button onClick={() => toggleDropdown('compeGen')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-900 border border-blue-700 dark:border-blue-400 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-800 dark:hover:border-blue-500 font-medium transition-colors">
              <span>Compe. Genéricas</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['compeGen'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="#" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md">Competencias registradas</a>
                <a href="#" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md">Formulario de registro</a>
              </div>
            )}
          </div>
          <div ref={compeEspecRef} data-key="compeEspec">
            <button onClick={() => toggleDropdown('compeEspec')} className="w-full flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-900 border border-blue-700 dark:border-blue-400 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-800 dark:hover:border-blue-500 font-medium transition-colors">
              <span>Compe. Específicas</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {dropdownOpen['compeEspec'] && (
              <div className="ml-4 mt-2 space-y-2">
                <a href="#" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md">Competencias registradas</a>
                <a href="#" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md">Formulario de registro</a>
              </div>
            )}
          </div>
          {/* Mi Cuenta */}
          <div ref={cuentaRef}>
            <button
              onClick={() => setCuentaOpen(!cuentaOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-900 border border-blue-700 dark:border-blue-400 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 font-medium transition-colors"
            >
              <span>Mi Cuenta</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {cuentaOpen && (
              <div className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded shadow-lg z-50 animate-fade-in">
                <a href="#" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md" onClick={() => window.location.href = '/panelacceso'}>Inicio</a>
                <a href="#" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md">Perfil</a>
                <a href="#" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md" onClick={() => window.location.href = '/docentes'}>Contraseña</a>
                <a href="#" className="block p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md" onClick={() => window.location.href = '/docentes'}>Configuración</a>
                <a href="#" className="block p-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-700 rounded-md" onClick={e => { e.preventDefault(); localStorage.removeItem('user'); window.location.href = '/login'; }}>Cerrar sesión</a>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-3 py-1 shadow-sm min-h-0 h-12">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 rounded bg-white dark:bg-gray-800 border border-blue-700 dark:border-blue-400 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-800 dark:hover:border-blue-500 focus:outline-none transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-800 dark:text-gray-100 font-semibold leading-tight text-right">
              Programas de Unidad<br />de Aprendizaje
            </span>
            <img src="../src/imagenes/imagen_salida1.png" alt="UAC Logo" className="w-8 h-8 object-contain" />
          </div>
        </header>
        {/* Main Body */}
        <main className="flex-1 flex flex-col items-center py-8 overflow-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div className="w-full max-w-5xl">
            {/* Barra de búsqueda */}
            <div className="bg-blue-700 dark:bg-blue-900 text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2">Buscar</div>
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-b-md p-4 flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Docente:</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><i className="fa fa-search" /></span>
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                    placeholder="Nombre del Docente o Apellidos"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Ordenar alfabéticamente por:</label>
                <select className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                  <option value="az">A a Z</option>
                  <option value="za">Z a A</option>
                </select>
              </div>
            </div>
            {/* Lista de docentes */}
            <div className="bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 text-center font-semibold rounded-t-md py-2 mb-0.5">Lista de docentes</div>
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-b-md shadow">
              <table className="min-w-full text-sm text-left text-blue-900 dark:text-blue-200">
                <thead>
                  <tr className="border-b bg-blue-50 dark:bg-gray-900">
                    <th className="px-3 py-2 font-bold">#</th>
                    <th className="px-3 py-2 font-bold">Titulo</th>
                    <th className="px-3 py-2 font-bold">Nombre(s)</th>
                    <th className="px-3 py-2 font-bold">Apellido Paterno</th>
                    <th className="px-3 py-2 font-bold">Apellido Materno</th>
                    <th className="px-3 py-2 font-bold">Correo</th>
                    <th className="px-3 py-2 font-bold">Facultad</th>
                  </tr>
                </thead>
                <tbody className="text-blue-900 dark:text-blue-200">
                  {/* Aquí irían los datos de los docentes */}
                  {filteredDocentes.map((docente, idx) => (
                    <tr key={docente.docente_id} className="border-b hover:bg-blue-50 dark:hover:bg-gray-700">
                      <td className="px-3 py-2">{idx + 1}</td>
                      <td className="px-3 py-2">{docente.titulo}</td>
                      <td className="px-3 py-2">{docente.nombre}</td>
                      <td className="px-3 py-2">{docente.apellido_paterno}</td>
                      <td className="px-3 py-2">{docente.apellido_materno}</td>
                      <td className="px-3 py-2">{docente.correo}</td>
                      <td className="px-3 py-2">
                        <button
                          className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                          onClick={() => handleOpenViewFacModal(docente)}
                        >
                          Ver Facultades
                        </button>
                        <button
                          className="ml-2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                          onClick={() => handleOpenModal(docente)}
                        >
                          Agregar facultad
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Modal para agregar facultad */}
            {modalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm relative">
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600" onClick={handleCloseModal}>&times;</button>
                  <h2 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">Agregar facultad</h2>
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Facultad:</label>
                    <select
                      className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                      value={selectedFacultad}
                      onChange={e => setSelectedFacultad(e.target.value)}
                    >
                      <option value="">Seleccione facultad...</option>
                      {facultades.map(fac => (
                        <option key={fac.facultad_id} value={fac.facultad_id}>{fac.nombre}</option>
                      ))}
                    </select>
                  </div>
                  {modalError && <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-2 text-center text-sm">{modalError}</div>}
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-700 text-white font-semibold px-6 py-2 rounded hover:bg-blue-800 transition-colors disabled:opacity-60"
                      onClick={handleRegistrarFacultad}
                      disabled={modalLoading}
                    >
                      {modalLoading ? 'Registrando...' : 'Registrar'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Modal para ver facultades del docente */}
            {viewFacModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm relative">
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600" onClick={handleCloseViewFacModal}>&times;</button>
                  <h2 className="text-lg font-semibold mb-4 text-green-700 dark:text-green-300">Facultades de {docenteNombreModal}</h2>
                  <ul className="list-disc pl-5 text-gray-800 dark:text-gray-100">
                    {facultadesDocente.length > 0 ? (
                      facultadesDocente.map((fac, idx) => (
                        <li key={idx}>{fac}</li>
                      ))
                    ) : (
                      <li>(Sin facultad)</li>
                    )}
                  </ul>
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-gray-400 text-white font-semibold px-6 py-2 rounded hover:bg-gray-500 transition-colors"
                      onClick={handleCloseViewFacModal}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        {/* Footer */}
        <footer className="bg-gray-600/90 dark:bg-gray-900 text-white py-4 flex flex-col items-center mt-auto shadow-glass">
          <img src="../src/imagenes/imagen_salida1.png" alt="Facultad de Ingeniería" className="w-16 h-16 mb-2" />
          <div className="text-center text-sm">
            Facultad de Ingeniería<br />
            Laboratorio de Diseño de Aplicaciones Móviles
          </div>
        </footer>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: #fff;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2563eb;
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default Docentes;
