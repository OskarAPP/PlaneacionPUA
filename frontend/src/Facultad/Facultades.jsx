import React, { useEffect, useState } from "react";

const FacultadesRegistradas = () => {
  const [facultades, setFacultades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFacultades = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/facultades");
        if (!res.ok) throw new Error("Error al obtener facultades");
        const data = await res.json();
        setFacultades(data);
      } catch (err) {
        setError("No se pudieron cargar las facultades");
      } finally {
        setLoading(false);
      }
    };
    fetchFacultades();
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col bg-gray-100 text-gray-900">
      <header className="bg-blue-700 text-white text-lg font-semibold px-4 py-2 text-center shadow">Facultades registradas</header>
      <main className="flex-1 flex flex-col items-center py-8 overflow-auto">
        <div className="w-full max-w-2xl bg-white rounded shadow p-6">
          {loading ? (
            <div className="text-center text-blue-700">Cargando...</div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : (
            <table className="min-w-full border border-gray-300 rounded">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 border-b text-left">ID</th>
                  <th className="px-4 py-2 border-b text-left">Facultad</th>
                </tr>
              </thead>
              <tbody>
                {facultades.map(facultad => (
                  <tr key={facultad.id_facultad} className="hover:bg-blue-50">
                    <td className="px-4 py-2 border-b">{facultad.id_facultad}</td>
                    <td className="px-4 py-2 border-b">{facultad.facultad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default FacultadesRegistradas;
