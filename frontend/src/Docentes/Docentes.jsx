import React, { useState, useRef, useEffect } from "react";

import Sidebar from "../Components/Sidebar";

const Docentes = () => {


  // Estado para el sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const cuentaRef = useRef(null);
  const docentesRef = useRef(null);
  const carrerasRef = useRef(null);
  const materiasRef = useRef(null);
  const academiasRef = useRef(null);
  const facultadRef = useRef(null);
  const compeGenRef = useRef(null);
  const compeEspecRef = useRef(null);

  // Referencias agrupadas para el sidebar modular
  const refs = { cuentaRef, docentesRef, carrerasRef, materiasRef, academiasRef, facultadRef, compeGenRef, compeEspecRef };

  const [dropdownOpen, setDropdownOpen] = useState({});
  const [cuentaOpen, setCuentaOpen] = useState(false);

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
  const [deleteLoading, setDeleteLoading] = useState({});
  const [deleteError, setDeleteError] = useState("");
  // Estado para modal de carrera
  const [addCarreraModalOpen, setAddCarreraModalOpen] = useState(false);
  const [carrerasFacultad, setCarrerasFacultad] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState("");
  const [carreraModalError, setCarreraModalError] = useState("");
  const [carreraModalLoading, setCarreraModalLoading] = useState(false);
  const [facultadesDocenteCarrera, setFacultadesDocenteCarrera] = useState([]); // Facultades del docente para el modal carrera
  const [selectedFacultadCarrera, setSelectedFacultadCarrera] = useState("");

  // Estado para modal de ver carreras
  // Estado para modal de agregar materia
  const [addMateriaModalOpen, setAddMateriaModalOpen] = useState(false);
  const [carrerasDocenteMateria, setCarrerasDocenteMateria] = useState([]); // Carreras del docente para el modal materia
  const [selectedCarreraMateria, setSelectedCarreraMateria] = useState("");
  const [materiasCarrera, setMateriasCarrera] = useState([]); // Materias disponibles para la carrera seleccionada
  const [selectedMateria, setSelectedMateria] = useState("");
  const [materiaModalError, setMateriaModalError] = useState("");
  const [materiaModalLoading, setMateriaModalLoading] = useState(false);

  // Estado para modal de ver materias
  const [viewMateriasModalOpen, setViewMateriasModalOpen] = useState(false);
  const [materiasDocente, setMateriasDocente] = useState([]);
  const [materiasDocenteNombre, setMateriasDocenteNombre] = useState("");
  const [materiasDocenteError, setMateriasDocenteError] = useState("");

  // Abrir modal para agregar materia
  const handleOpenAddMateriaModal = async (docente) => {
    setSelectedDocente(docente);
    setSelectedCarreraMateria("");
    setSelectedMateria("");
    setMateriaModalError("");
    setMateriasCarrera([]);
    setCarrerasDocenteMateria([]);
    try {
      // Consultar carreras del docente desde el nuevo endpoint backend
      const res = await fetch(`http://localhost:8000/api/docentes/${docente.docente_id}/carreras`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setCarrerasDocenteMateria(data);
      } else if (data.carreras && Array.isArray(data.carreras)) {
        setCarrerasDocenteMateria(data.carreras);
      } else {
        setCarrerasDocenteMateria([]);
        setMateriaModalError("No se pudieron obtener las carreras del docente.");
      }
    } catch (e) {
      setCarrerasDocenteMateria([]);
      setMateriaModalError("Error de conexión al obtener carreras del docente.");
    }
    setAddMateriaModalOpen(true);
  };

  // Cuando se selecciona una carrera en el modal de materia, cargar materias
  useEffect(() => {
    if (!selectedCarreraMateria) {
      setMateriasCarrera([]);
      return;
    }
    setMateriaModalError("");
    setMateriasCarrera([]);
    fetch(`http://localhost:8000/api/materias/carrera/${selectedCarreraMateria}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMateriasCarrera(data);
        } else {
          setMateriasCarrera([]);
          setMateriaModalError("No se pudieron obtener las materias.");
        }
      })
      .catch(() => {
        setMateriasCarrera([]);
        setMateriaModalError("Error de conexión al obtener materias.");
      });
  }, [selectedCarreraMateria]);

  // Cerrar modal de materia
  const handleCloseAddMateriaModal = () => {
    setAddMateriaModalOpen(false);
    setSelectedCarreraMateria("");
    setSelectedMateria("");
    setMateriaModalError("");
    setMateriasCarrera([]);
    setCarrerasDocenteMateria([]);
  };

  // Registrar materia al docente
  const handleRegistrarMateria = async () => {
    if (!selectedCarreraMateria) {
      setMateriaModalError("Selecciona una carrera.");
      return;
    }
    if (!selectedMateria) {
      setMateriaModalError("Selecciona una materia.");
      return;
    }
    setMateriaModalLoading(true);
    setMateriaModalError("");
    try {
      const res = await fetch(`http://localhost:8000/api/docentes/${selectedDocente.docente_id}/materias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ materia_id: selectedMateria })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Actualizar docentes (para reflejar materias asignadas si el backend lo retorna)
        fetch('http://localhost:8000/api/docentes')
          .then(res => res.json())
          .then(data => {
            if (data.success) setDocentesData(data.docentes);
          });
        handleCloseAddMateriaModal();
      } else if (data.message) {
        setMateriaModalError(data.message);
      } else {
        setMateriaModalError("No se pudo registrar la materia.");
      }
    } catch (err) {
      setMateriaModalError("Error de conexión.");
    }
    setMateriaModalLoading(false);
  };
  const [viewCarrerasModalOpen, setViewCarrerasModalOpen] = useState(false);
  const [carrerasDocente, setCarrerasDocente] = useState([]);
  const [docenteNombreCarreraModal, setDocenteNombreCarreraModal] = useState("");
  const [carreraDeleteLoading, setCarreraDeleteLoading] = useState({});
  const [carreraDeleteError, setCarreraDeleteError] = useState("");

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
    setSelectedDocente(docente); // <--- CORRECCIÓN: establecer el docente seleccionado
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

  // Eliminar facultad del docente
  const handleEliminarFacultad = async (facultadNombre, idx) => {
    if (!selectedDocente) {
      return;
    }
    setDeleteLoading(prev => ({ ...prev, [idx]: true }));
    setDeleteError("");
    // Buscar el facultad_id por nombre (ya que en docentesData solo hay nombres)
    const facObj = facultades.find(f => f.nombre === facultadNombre);
    if (!facObj) {
      setDeleteError("No se encontró el ID de la facultad.");
      setDeleteLoading(prev => ({ ...prev, [idx]: false }));
      return;
    }
    try {
      const res = await fetch(`http://localhost:8000/api/docentes/${selectedDocente.docente_id}/facultades/${facObj.facultad_id}`, {
        method: 'DELETE',
      });
      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        setDeleteError('Respuesta inesperada del servidor.');
        setDeleteLoading(prev => ({ ...prev, [idx]: false }));
        return;
      }
      if (res.ok && data.success) {
        setFacultadesDocente(prev => prev.filter((_, i) => i !== idx));
        fetch('http://localhost:8000/api/docentes')
          .then(res => res.json())
          .then(data => {
            if (data.success) setDocentesData(data.docentes);
          });
      } else if (data.message) {
        setDeleteError(data.message);
      } else {
        setDeleteError("No se pudo eliminar la facultad.");
      }
    } catch (err) {
      setDeleteError("Error de conexión.");
    }
    setDeleteLoading(prev => ({ ...prev, [idx]: false }));
  };

  // Abrir modal para agregar carrera
  const handleOpenAddCarreraModal = (docente) => {
    setSelectedDocente(docente);
    setSelectedCarrera("");
    setCarreraModalError("");
    setCarrerasFacultad([]);
    setSelectedFacultadCarrera("");
    // Buscar todas las facultades del docente (por nombre) y obtener sus IDs
    let facs = [];
    if (Array.isArray(docente.facultades) && docente.facultades.length > 0) {
      facs = facultades.filter(f => docente.facultades.includes(f.nombre));
    }
    setFacultadesDocenteCarrera(facs);
    setAddCarreraModalOpen(true);
  };

  // Cuando se selecciona una facultad en el modal de carrera, cargar carreras
  useEffect(() => {
    if (!selectedFacultadCarrera) {
      setCarrerasFacultad([]);
      return;
    }
    setCarreraModalError("");
    setCarrerasFacultad([]);
    fetch(`http://localhost:8000/api/carreras/facultad/${selectedFacultadCarrera}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCarrerasFacultad(data);
        } else {
          setCarrerasFacultad([]);
          setCarreraModalError("No se pudieron obtener las carreras.");
        }
      })
      .catch(() => {
        setCarrerasFacultad([]);
        setCarreraModalError("Error de conexión al obtener carreras.");
      });
  }, [selectedFacultadCarrera]);

  // Cerrar modal de carrera
  const handleCloseAddCarreraModal = () => {
    setAddCarreraModalOpen(false);
    setSelectedCarrera("");
    setCarreraModalError("");
    setCarrerasFacultad([]);
    setFacultadesDocenteCarrera([]);
    setSelectedFacultadCarrera("");
  };

  // Registrar carrera al docente
  const handleRegistrarCarrera = async () => {
    if (!selectedFacultadCarrera) {
      setCarreraModalError("Selecciona una facultad.");
      return;
    }
    if (!selectedCarrera) {
      setCarreraModalError("Selecciona una carrera.");
      return;
    }
    setCarreraModalLoading(true);
    setCarreraModalError("");
    try {
      const res = await fetch(`http://localhost:8000/api/docentes/${selectedDocente.docente_id}/carreras`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carrera_id: selectedCarrera })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Actualizar docentes
        fetch('http://localhost:8000/api/docentes')
          .then(res => res.json())
          .then(data => {
            if (data.success) setDocentesData(data.docentes);
          });
        handleCloseAddCarreraModal();
      } else if (data.message) {
        setCarreraModalError(data.message);
      } else {
        setCarreraModalError("No se pudo registrar la carrera.");
      }
    } catch (err) {
      setCarreraModalError("Error de conexión.");
    }
    setCarreraModalLoading(false);
  };

  // Abrir modal para ver carreras del docente
  // Ahora intentamos obtener los IDs de carrera incluso si solo hay nombres
  const handleOpenViewCarreras = async (docente) => {
    setSelectedDocente(docente);
    if (Array.isArray(docente.carreras_full)) {
      setCarrerasDocente(docente.carreras_full);
    } else if (Array.isArray(docente.carreras)) {
      // Si solo hay nombres, obtener todas las carreras de la(s) facultad(es) del docente y mapear
      let carrerasAll = [];
      if (Array.isArray(docente.facultades)) {
        // Buscar los IDs de las facultades
        const facIds = facultades.filter(f => docente.facultades.includes(f.nombre)).map(f => f.facultad_id);
        // Obtener todas las carreras de esas facultades
        for (const facId of facIds) {
          try {
            const res = await fetch(`http://localhost:8000/api/carreras/facultad/${facId}`);
            const data = await res.json();
            if (Array.isArray(data)) {
              carrerasAll = carrerasAll.concat(data);
            }
          } catch (e) {}
        }
      }
      // Mapear nombres a objetos con ID
      const mapped = docente.carreras.map(nombre => {
        const found = carrerasAll.find(c => c.nombre === nombre);
        return found ? { ...found } : { nombre };
      });
      setCarrerasDocente(mapped);
    } else {
      setCarrerasDocente([]);
    }
    setDocenteNombreCarreraModal(`${docente.nombre} ${docente.apellido_paterno} ${docente.apellido_materno || ''}`);
    setCarreraDeleteError("");
    setViewCarrerasModalOpen(true);
  };
  // Cerrar modal de ver carreras
  const handleCloseViewCarreras = () => {
    setViewCarrerasModalOpen(false);
    setCarrerasDocente([]);
    setDocenteNombreCarreraModal("");
    setCarreraDeleteError("");
  };

  // Eliminar carrera del docente
  // Ahora recibe el objeto carrera (o al menos { carrera_id, nombre })
  const handleEliminarCarrera = async (carreraObj, idx) => {
    if (!selectedDocente) return;
    setCarreraDeleteLoading(prev => ({ ...prev, [idx]: true }));
    setCarreraDeleteError("");
    // Buscar el carrera_id de forma robusta
    let carreraId = null;
    if (carreraObj && carreraObj.carrera_id) {
      carreraId = carreraObj.carrera_id;
    } else if (typeof carreraObj === 'object' && carreraObj.nombre) {
      // Buscar en carrerasFacultad si está disponible
      const found = carrerasFacultad.find(c => c.nombre === carreraObj.nombre);
      if (found) carreraId = found.carrera_id;
    } else if (typeof carreraObj === 'string') {
      // Fallback: buscar por nombre en carrerasFacultad
      const found = carrerasFacultad.find(c => c.nombre === carreraObj);
      if (found) carreraId = found.carrera_id;
    }
    if (!carreraId) {
      setCarreraDeleteError("No se encontró el ID de la carrera.");
      setCarreraDeleteLoading(prev => ({ ...prev, [idx]: false }));
      return;
    }
    try {
      const res = await fetch(`http://localhost:8000/api/docentes/${selectedDocente.docente_id}/carreras/${carreraId}`, {
        method: 'DELETE',
      });
      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        setCarreraDeleteError('Respuesta inesperada del servidor.');
        setCarreraDeleteLoading(prev => ({ ...prev, [idx]: false }));
        return;
      }
      if (res.ok && data.success) {
        setCarrerasDocente(prev => prev.filter((_, i) => i !== idx));
        // Actualizar docentes global
        fetch('http://localhost:8000/api/docentes')
          .then(res => res.json())
          .then(data => {
            if (data.success) setDocentesData(data.docentes);
          });
      } else if (data.message) {
        setCarreraDeleteError(data.message);
      } else {
        setCarreraDeleteError("No se pudo eliminar la carrera.");
      }
    } catch (err) {
      setCarreraDeleteError("Error de conexión.");
    }
    setCarreraDeleteLoading(prev => ({ ...prev, [idx]: false }));
  };

  // Eliminar materia del docente
  const [materiaDeleteLoading, setMateriaDeleteLoading] = useState({});
  const [materiaDeleteError, setMateriaDeleteError] = useState("");
  const handleEliminarMateria = async (materiaObj, idx) => {
    if (!selectedDocente) return;
    setMateriaDeleteLoading(prev => ({ ...prev, [idx]: true }));
    setMateriaDeleteError("");
    try {
      const res = await fetch(`http://localhost:8000/api/docentes/${selectedDocente.docente_id}/materias/${materiaObj.materia_id}`, {
        method: 'DELETE',
      });
      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        setMateriaDeleteError('Respuesta inesperada del servidor.');
        setMateriaDeleteLoading(prev => ({ ...prev, [idx]: false }));
        return;
      }
      if (res.ok && data.success) {
        setMateriasDocente(prev => prev.filter((_, i) => i !== idx));
      } else if (data.message) {
        setMateriaDeleteError(data.message);
      } else {
        setMateriaDeleteError("No se pudo eliminar la materia.");
      }
    } catch (err) {
      setMateriaDeleteError("Error de conexión.");
    }
    setMateriaDeleteLoading(prev => ({ ...prev, [idx]: false }));
  };

  // Abrir modal para ver materias del docente
  const handleOpenViewMaterias = async (docente) => {
    setSelectedDocente(docente);
    setMateriasDocente([]);
    setMateriasDocenteError("");
    setMateriasDocenteNombre(`${docente.nombre} ${docente.apellido_paterno} ${docente.apellido_materno || ''}`);
    try {
      const res = await fetch(`http://localhost:8000/api/docentes/${docente.docente_id}/materias`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setMateriasDocente(data);
      } else if (data.materias && Array.isArray(data.materias)) {
        setMateriasDocente(data.materias);
      } else {
        setMateriasDocente([]);
        setMateriasDocenteError("No se pudieron obtener las materias del docente.");
      }
    } catch (e) {
      setMateriasDocente([]);
      setMateriasDocenteError("Error de conexión al obtener materias del docente.");
    }
    setViewMateriasModalOpen(true);
  };

  // Cerrar modal de ver materias
  const handleCloseViewMaterias = () => {
    setViewMateriasModalOpen(false);
    setMateriasDocente([]);
    setMateriasDocenteNombre("");
    setMateriasDocenteError("");
  };

  return (
    <div className="min-h-screen w-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar modular */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        cuentaOpen={cuentaOpen}
        setCuentaOpen={setCuentaOpen}
        refs={refs}
        activeSection="docentes"
      />

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
                    <th className="px-3 py-2 font-bold">Carrera</th>
                    <th className="px-3 py-2 font-bold">Materias</th>
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
                        <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                          <button
                            className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs w-full sm:w-auto"
                            onClick={() => handleOpenViewFacModal(docente)}
                          >
                            Ver Facultades
                          </button>
                          <button
                            className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs w-full sm:w-auto"
                            onClick={() => handleOpenModal(docente)}
                          >
                            Agregar facultad
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                          <button
                            className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs w-full sm:w-auto"
                            onClick={() => handleOpenViewCarreras(docente)}
                          >
                            Ver Carreras
                          </button>
                          <button
                            className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs w-full sm:w-auto"
                            onClick={() => handleOpenAddCarreraModal(docente)}
                          >
                            Agregar Carrera
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                          <button
                            className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs w-full sm:w-auto"
                            onClick={() => handleOpenViewMaterias(docente)}
                          >
                            Ver Materias
                          </button>

                          <button
                            className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs w-full sm:w-auto"
                            onClick={() => handleOpenAddMateriaModal(docente)}
                          >
                            Agregar Materia
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Modal para agregar materia */}
            {addMateriaModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm relative">
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600" onClick={handleCloseAddMateriaModal}>&times;</button>
                  <h2 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">Agregar materia</h2>
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Carrera:</label>
                    <select
                      className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 mb-2"
                      value={selectedCarreraMateria}
                      onChange={e => {
                        setSelectedCarreraMateria(e.target.value);
                        setSelectedMateria("");
                      }}
                    >
                      <option value="">Seleccione carrera...</option>
                      {carrerasDocenteMateria.map(carr => (
                        <option key={carr.carrera_id} value={carr.carrera_id}>{carr.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Materia:</label>
                    <select
                      className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                      value={selectedMateria}
                      onChange={e => setSelectedMateria(e.target.value)}
                      disabled={!selectedCarreraMateria || materiasCarrera.length === 0}
                    >
                      <option value="">Seleccione materia...</option>
                      {materiasCarrera.map(mat => (
                        <option key={mat.materia_id} value={mat.materia_id}>{mat.nombre}</option>
                      ))}
                    </select>
                  </div>
                  {materiaModalError && <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-2 text-center text-sm">{materiaModalError}</div>}
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-700 text-white font-semibold px-6 py-2 rounded hover:bg-blue-800 transition-colors disabled:opacity-60"
                      onClick={handleRegistrarMateria}
                      disabled={materiaModalLoading || !selectedCarreraMateria || materiasCarrera.length === 0}
                    >
                      {materiaModalLoading ? 'Registrando...' : 'Registrar'}
                    </button>
                  </div>
                </div>
              </div>
            )}
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
            {/* Modal para agregar carrera */}
            {addCarreraModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm relative">
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600" onClick={handleCloseAddCarreraModal}>&times;</button>
                  <h2 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">Agregar carrera</h2>
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Facultad:</label>
                    <select
                      className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 mb-2"
                      value={selectedFacultadCarrera}
                      onChange={e => {
                        setSelectedFacultadCarrera(e.target.value);
                        setSelectedCarrera("");
                      }}
                    >
                      <option value="">Seleccione facultad...</option>
                      {facultadesDocenteCarrera.map(fac => (
                        <option key={fac.facultad_id} value={fac.facultad_id}>{fac.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Carrera:</label>
                    <select
                      className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                      value={selectedCarrera}
                      onChange={e => setSelectedCarrera(e.target.value)}
                      disabled={!selectedFacultadCarrera || carrerasFacultad.length === 0}
                    >
                      <option value="">Seleccione carrera...</option>
                      {carrerasFacultad.map(carr => (
                        <option key={carr.carrera_id} value={carr.carrera_id}>{carr.nombre}</option>
                      ))}
                    </select>
                  </div>
                  {carreraModalError && <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-2 text-center text-sm">{carreraModalError}</div>}
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-700 text-white font-semibold px-6 py-2 rounded hover:bg-blue-800 transition-colors disabled:opacity-60"
                      onClick={handleRegistrarCarrera}
                      disabled={carreraModalLoading || !selectedFacultadCarrera || carrerasFacultad.length === 0}
                    >
                      {carreraModalLoading ? 'Registrando...' : 'Registrar'}
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
                        <li key={idx} className="flex items-center justify-between group">
                          <span>{fac}</span>
                          <button
                            className="ml-2 text-red-600 hover:text-red-800 font-bold text-lg px-2 disabled:opacity-50"
                            title="Eliminar facultad"
                            onClick={() => handleEliminarFacultad(fac, idx)}
                            disabled={deleteLoading[idx]}
                          >
                            ×
                          </button>
                        </li>
                      ))
                    ) : (
                      <li>(Sin facultad)</li>
                    )}
                  </ul>
                  {deleteError && <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-2 text-center text-sm">{deleteError}</div>}
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
            {/* Modal para ver carreras del docente */}
            {viewCarrerasModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm relative">
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600" onClick={handleCloseViewCarreras}>&times;</button>
                  <h2 className="text-lg font-semibold mb-4 text-green-700 dark:text-green-300">Carreras de {docenteNombreCarreraModal}</h2>
                  <ul className="list-disc pl-5 text-gray-800 dark:text-gray-100">
                    {carrerasDocente.length > 0 ? (
                      carrerasDocente.map((carr, idx) => (
                        <li key={idx} className="flex items-center justify-between group">
                          <span>{carr.nombre || carr}</span>
                          <button
                            className="ml-2 text-red-600 hover:text-red-800 font-bold text-lg px-2 disabled:opacity-50"
                            title="Eliminar carrera"
                            onClick={() => handleEliminarCarrera(carr, idx)}
                            disabled={carreraDeleteLoading[idx]}
                          >
                            ×
                          </button>
                        </li>
                      ))
                    ) : (
                      <li>(Sin carrera)</li>
                    )}
                  </ul>
                  {carreraDeleteError && <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-2 text-center text-sm">{carreraDeleteError}</div>}
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-gray-400 text-white font-semibold px-6 py-2 rounded hover:bg-gray-500 transition-colors"
                      onClick={handleCloseViewCarreras}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Modal para ver materias del docente */}
            {viewMateriasModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm relative">
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600" onClick={handleCloseViewMaterias}>&times;</button>
                  <h2 className="text-lg font-semibold mb-4 text-green-700 dark:text-green-300">Materias de {materiasDocenteNombre}</h2>
                  <ul className="list-disc pl-5 text-gray-800 dark:text-gray-100">
                    {materiasDocente.length > 0 ? (
                      materiasDocente.map((mat, idx) => (
                        <li key={idx} className="flex items-center justify-between group">
                          <span>{mat.nombre}</span>
                          <button
                            className="ml-2 text-red-600 hover:text-red-800 font-bold text-lg px-2 disabled:opacity-50"
                            title="Eliminar materia"
                            onClick={() => handleEliminarMateria(mat, idx)}
                            disabled={materiaDeleteLoading[idx]}
                          >
                            ×
                          </button>
                        </li>
                      ))
                    ) : (
                      <li>(Sin materias registradas)</li>
                    )}
                  </ul>
                  {materiasDocenteError && <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-2 text-center text-sm">{materiasDocenteError}</div>}
                  {materiaDeleteError && <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-2 text-center text-sm">{materiaDeleteError}</div>}
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-gray-400 text-white font-semibold px-6 py-2 rounded hover:bg-gray-500 transition-colors"
                      onClick={handleCloseViewMaterias}
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
