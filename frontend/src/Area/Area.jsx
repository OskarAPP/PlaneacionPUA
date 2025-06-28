import React, { useState } from "react";

const Area = () => {
  // Simulación de datos de áreas
  const [areas] = useState([
    { id: 1, nombre: "Área de Matemáticas" },
    { id: 2, nombre: "Área de Ciencias" },
    { id: 3, nombre: "Área de Humanidades" }
  ]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8">
      <div className="w-full max-w-2xl">
        <div className="bg-blue-700 dark:bg-blue-900 text-white text-lg font-semibold rounded-t-md px-4 py-2 text-center mb-2">
          Áreas
        </div>
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-b-md p-6">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">Áreas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {areas.map(area => (
                <tr key={area.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{area.nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Area;
