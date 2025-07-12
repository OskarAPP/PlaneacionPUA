import React, { useState, useEffect } from "react";

const RegistroCarreras = () => {
  // ...

  // ...

  // ...

  // Form state
  const [form, setForm] = useState({
    nombre: '',
    facultad_id: '',
    plan: '',
    descripcion: ''
  });
  const [facultades, setFacultades] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFacultades = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/facultades");
        if (!res.ok) throw new Error();
        const data = await res.json();
        // Normaliza los datos para aceptar diferentes formatos de backend
        const normalizadas = Array.isArray(data)
          ? data.map(f => ({
              facultad_id: f.facultad_id || f.id,
              nombre: f.nombre || f.nombre_facultad || f.nombreFacultad || f.nombre_facultad,
            }))
          : [];
        setFacultades(normalizadas);
      } catch {
        setFacultades([]);
      }
    };
    fetchFacultades();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje("");
    setError("");
    if (!form.nombre.trim() || !form.facultad_id || !form.plan.trim() || !form.descripcion.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    try {
      // 1. Registrar el plan de estudio
      const resPlan = await fetch("http://localhost:8000/api/planestudio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: form.plan, descripcion: form.descripcion })
      });
      const dataPlan = await resPlan.json();
      if (!resPlan.ok || !dataPlan.success) throw new Error(dataPlan.message || "Error al registrar plan de estudio");
      const plan_estudio_id = dataPlan.plan_estudio.plan_estudio_id;
      // 2. Registrar la carrera
      const resCarrera = await fetch("http://localhost:8000/api/carreras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          facultad_id: form.facultad_id,
          plan_estudio_id
        })
      });
      const dataCarrera = await resCarrera.json();
      if (!resCarrera.ok || !dataCarrera.success) throw new Error(dataCarrera.message || "Error al registrar carrera");
      setMensaje("Carrera registrada exitosamente.");
      setForm({ nombre: '', facultad_id: '', plan: '', descripcion: '' });
    } catch (err) {
      setError(err.message || "Error de conexión con el servidor.");
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-3 py-1 shadow-sm min-h-0 h-12">
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
            <div className="bg-blue-700 dark:bg-blue-900 text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2">Registro de Carrera</div>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-b-md p-6 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Nombre de la Carrera:</label>
                  <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Facultad:</label>
                  <select name="facultad_id" value={form.facultad_id} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700">
                    <option value="">Seleccione facultad...</option>
                    {facultades.length === 0 && (
                      <option value="" disabled>No hay facultades registradas</option>
                    )}
                    {facultades.map(f => (
                      <option key={f.facultad_id} value={f.facultad_id}>{f.nombre || `ID: ${f.facultad_id}`}</option>
                    ))}
                  </select>
                  {facultades.length === 0 && (
                    <div className="text-xs text-red-600 dark:text-red-400 mt-1">No se encontraron facultades. Verifique la API.</div>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Plan de Estudios:</label>
                  <input type="text" name="plan" value={form.plan} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Descripción:</label>
                  <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" />
                </div>
              </div>
              {mensaje && <div className="text-green-600 text-center dark:text-green-400">{mensaje}</div>}
              {error && <div className="text-red-600 text-center dark:text-red-400">{error}</div>}
              <div className="flex justify-center mt-4">
                <button type="submit" className="bg-blue-700 dark:bg-blue-800 text-white font-semibold px-12 py-2 rounded hover:bg-blue-800 dark:hover:bg-blue-900 transition-colors">Registrar</button>
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

export default RegistroCarreras;
