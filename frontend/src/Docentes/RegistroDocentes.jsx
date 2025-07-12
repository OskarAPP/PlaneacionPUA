import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Components/Sidebar";

const RegistroDocentes = () => {
  // Estado para el sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [cuentaOpen, setCuentaOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Referencias para el sidebar modular
  const cuentaRef = useRef(null);
  const docentesRef = useRef(null);
  const carrerasRef = useRef(null);
  const materiasRef = useRef(null);
  const academiasRef = useRef(null);
  const facultadRef = useRef(null);
  const compeGenRef = useRef(null);
  const compeEspecRef = useRef(null);
  const refs = { cuentaRef, docentesRef, carrerasRef, materiasRef, academiasRef, facultadRef, compeGenRef, compeEspecRef };

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

  // Nuevos estados para selects
  const [facultades, setFacultades] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/facultades')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setFacultades(data);
      });
    // Conexión directa a la tabla Cargo
    fetch('http://localhost:8000/api/cargos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCargos(data);
      });
    fetch('http://localhost:8000/api/roles')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRoles(data);
      });
  }, []);

  // Form state
  const [form, setForm] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    facultad_id: '',
    titulo: '',
    cargo_id: '',
    correo: '',
    contrasena: '',
    rol_id: ''
  });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    setLoading(true);
    // Validación mínima
    if (!form.nombre || !form.apellido_paterno || !form.correo || !form.contrasena || !form.facultad_id || !form.cargo_id || !form.rol_id) {
      setError("Por favor, completa los campos obligatorios.");
      setLoading(false);
      return;
    }
    // Validar dominio de correo
    if (!/^[^@\s]+@uacam\.mx$/.test(form.correo)) {
      setError("El correo debe ser institucional y terminar en @uacam.mx");
      setLoading(false);
      return;
    }
    // Enviar todo en un solo request a /api/personal
    try {
      const res = await fetch('http://localhost:8000/api/personal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          apellido_paterno: form.apellido_paterno,
          apellido_materno: form.apellido_materno,
          facultad_id: form.facultad_id,
          titulo: form.titulo,
          cargo_id: form.cargo_id,
          correo: form.correo,
          contrasena: form.contrasena,
          rol_id: form.rol_id
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMensaje('Docente registrado exitosamente.');
        setForm({
          nombre: '',
          apellido_paterno: '',
          apellido_materno: '',
          facultad_id: '',
          titulo: '',
          cargo_id: '',
          correo: '',
          contrasena: '',
          rol_id: ''
        });
      } else if (data.errors) {
        // Mensajes explícitos para cada campo
        if (data.errors.nombre) setError('Nombre: ' + data.errors.nombre[0]);
        else if (data.errors.apellido_paterno) setError('Apellido paterno: ' + data.errors.apellido_paterno[0]);
        else if (data.errors.apellido_materno) setError('Apellido materno: ' + data.errors.apellido_materno[0]);
        else if (data.errors.facultad_id) setError('Facultad: ' + data.errors.facultad_id[0]);
        else if (data.errors.titulo) setError('Título: ' + data.errors.titulo[0]);
        else if (data.errors.cargo_id) setError('Cargo: ' + data.errors.cargo_id[0]);
        else if (data.errors.correo && data.errors.correo[0].includes('unique')) setError('El correo ya está registrado.');
        else if (data.errors.correo) setError('Correo: ' + data.errors.correo[0]);
        else if (data.errors.contrasena) setError('Contraseña: ' + data.errors.contrasena[0]);
        else if (data.errors.rol_id) setError('Rol: ' + data.errors.rol_id[0]);
        else setError('Error en los datos.');
      } else if (data.message && data.message.toLowerCase().includes('correo')) {
        setError(data.message);
      } else if (data.message) {
        setError(data.message);
      } else {
        setError('Ocurrió un error desconocido al registrar docente.');
      }
    } catch (err) {
      setError('Error de conexión al registrar docente.');
    }
    setLoading(false);
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
            <div className="bg-blue-700 dark:bg-blue-900 text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2">Docentes</div>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-b-md p-6 flex flex-col gap-6" autoComplete="off">
              {mensaje && <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded mb-2 text-center">{mensaje}</div>}
              {error && <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-4 py-2 rounded mb-2 text-center">{error}</div>}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Nombre(s): <span className="text-red-500">*</span></label>
                  <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" required />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Apellido Paterno: <span className="text-red-500">*</span></label>
                  <input type="text" name="apellido_paterno" value={form.apellido_paterno} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" required />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Apellido Materno:</label>
                  <input type="text" name="apellido_materno" value={form.apellido_materno} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Facultad: <span className="text-red-500">*</span></label>
                  <select name="facultad_id" value={form.facultad_id} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" required>
                    <option value="">Seleccione facultad...</option>
                    {facultades.map(fac => (
                      <option key={fac.facultad_id} value={fac.facultad_id}>{fac.nombre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Correo: <span className="text-red-500">*</span></label>
                  <input type="email" name="correo" value={form.correo} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-blue-50 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" required autoComplete="email" />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Contraseña: <span className="text-red-500">*</span></label>
                  <input type="password" name="contrasena" value={form.contrasena} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-blue-50 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" required autoComplete="new-password" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Titulo:</label>
                  <input type="text" name="titulo" value={form.titulo} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Cargo: <span className="text-red-500">*</span></label>
                  <select name="cargo_id" value={form.cargo_id} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" required>
                    <option value="">Seleccione cargo...</option>
                    {cargos.map(cargo => (
                      <option key={cargo.cargo_id} value={cargo.cargo_id}>{cargo.nombre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Rol: <span className="text-red-500">*</span></label>
                  <select name="rol_id" value={form.rol_id} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" required>
                    <option value="">Seleccione rol...</option>
                    {roles.map(rol => (
                      <option key={rol.rol_id} value={rol.rol_id}>{rol.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button type="submit" className="bg-blue-700 dark:bg-blue-800 text-white font-semibold px-12 py-2 rounded hover:bg-blue-800 dark:hover:bg-blue-900 transition-colors disabled:opacity-60" disabled={loading}>{loading ? 'Registrando...' : 'Registrar'}</button>
              </div>
            </form>
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

export default RegistroDocentes;
