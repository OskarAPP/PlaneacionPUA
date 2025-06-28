import React, { useState } from "react";

const RegistroAreas = () => {
  const [area, setArea] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setArea(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    setLoading(true);
    if (!area.trim()) {
      setError("Por favor, ingresa el nombre del área.");
      setLoading(false);
      return;
    }
    // Aquí iría la lógica para guardar el área (API call)
    setTimeout(() => {
      setMensaje("Área registrada exitosamente.");
      setArea("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8">
      <div className="w-full max-w-md">
        <div className="bg-blue-700 dark:bg-blue-900 text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2">
          Registrar Área
        </div>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-b-md p-6 flex flex-col gap-6">
          {mensaje && <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded text-center">{mensaje}</div>}
          {error && <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-4 py-2 rounded text-center">{error}</div>}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Área: <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="area"
              value={area}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
              required
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-700 dark:bg-blue-800 text-white font-semibold px-12 py-2 rounded hover:bg-blue-800 dark:hover:bg-blue-900 transition-colors disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroAreas;
