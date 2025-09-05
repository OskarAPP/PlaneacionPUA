import React from "react";

const ComiteCurricular = () => {
  // Obtener la fecha actual en formato d/m/yyyy
  const today = new Date();
  const fechaActual = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  return (
    <div className="border rounded bg-gray-50 p-4">
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <tbody>
            <tr className="align-top">
              <td className="border px-2 py-2 w-1/2 font-medium">Nombre y firma de los docentes que participaron en su elaboración</td>
              <td className="border px-2 py-2">
                <select className="w-full border rounded px-2 py-1 mb-2">
                  <option>Seleccione...</option>
                </select>
                <button type="button" className="border rounded bg-gray-200 px-3 py-1 text-sm">Guardar</button>
              </td>
            </tr>
            <tr className="align-top">
              <td className="border px-2 py-2 font-medium">Nombre y firma del Presidente y/o Secretario de la Academia; o en su caso, del responsable del comité Curricular</td>
              <td className="border px-2 py-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Presidente:</span>
                    <input className="border rounded px-2 py-1 flex-1 bg-gray-100" value="Mtro. Enrique Perera Abreu" disabled />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Secretario:</span>
                    <input className="border rounded px-2 py-1 flex-1 bg-gray-100" value="Mtra Diana Concepción Mex Alvarez" disabled />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border px-2 py-2 font-medium">Nombre y firma del coordinador de carrera</td>
              <td className="border px-2 py-2">
                <input className="border rounded px-2 py-1 w-full bg-gray-100" value="Mtra Nancy Geogina Ortiz Cuevas" disabled />
              </td>
            </tr>
            <tr>
              <td className="border px-2 py-2 font-medium">Nombre y firma del Secretario Académico</td>
              <td className="border px-2 py-2">
                <input className="border rounded px-2 py-1 w-full bg-gray-100" value="M. en C Carlos Alfonso Chavez Arias" disabled />
              </td>
            </tr>
            <tr>
              <td className="border px-2 py-2 font-medium">Nombre y firma del Director de la Facultad o Escuela</td>
              <td className="border px-2 py-2">
                <input className="border rounded px-2 py-1 w-full bg-gray-100" value="M. en C. Guadalupe Manuel Estrada Segovia" disabled />
              </td>
            </tr>
            <tr>
              <td className="border px-2 py-2 font-medium">Fecha de elaboración o modificación</td>
              <td className="border px-2 py-2">
                <input className="border rounded px-2 py-1 w-full bg-gray-100" value={fechaActual} disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComiteCurricular;
