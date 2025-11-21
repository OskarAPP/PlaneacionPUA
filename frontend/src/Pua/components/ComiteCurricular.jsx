import React, { useEffect, useState } from "react";
import useDocente from "../hooks/useDocente";

const RAW_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_BASE_URL = RAW_API_URL.endsWith("/") ? RAW_API_URL.slice(0, -1) : RAW_API_URL;
const MIN_DOCENTE_CHARS = 2;

const formatDocenteDisplay = (docente = {}) => {
  const partes = [docente.titulo, docente.nombre, docente.apellido_paterno, docente.apellido_materno]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return partes || "";
};

const normalizeDocente = (docente) => {
  if (!docente) return null;
  const display = docente.display ? docente.display.trim() : formatDocenteDisplay(docente);
  const id = docente.id ?? docente.docente_id ?? docente.docenteId ?? null;
  return {
    ...docente,
    id,
    display,
  };
};

const DocenteLookupInput = ({ etiqueta, value, onSelect }) => {
  const [term, setTerm] = useState(value?.display || "");
  const [debounced, setDebounced] = useState("");
  const [resultados, setResultados] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setTerm(value?.display || "");
    if (!value) {
      setTouched(false);
    }
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(term.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [term]);

  useEffect(() => {
    if (debounced.length < MIN_DOCENTE_CHARS) {
      setResultados([]);
      setBuscando(false);
      setError("");
      return;
    }

    const controller = new AbortController();
    setBuscando(true);
    setError("");

    fetch(`${API_BASE_URL}/api/docentes/search?q=${encodeURIComponent(debounced)}&limit=10`, { signal: controller.signal })
      .then(async (res) => {
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(text || "Respuesta no válida del servidor");
        }
        const body = await res.json();
        if (!res.ok || body.success === false) {
          throw new Error(body.message || "Error durante la búsqueda de docentes");
        }
        return body;
      })
      .then((body) => {
        const data = Array.isArray(body.data) ? body.data.map(normalizeDocente) : [];
        setResultados(data);
        setBuscando(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message || "No se pudo completar la búsqueda");
        setBuscando(false);
      });

    return () => controller.abort();
  }, [debounced]);

  const helper = (() => {
    if (!touched && !value) return null;
    if (term.trim().length < MIN_DOCENTE_CHARS) {
      return `Escribe al menos ${MIN_DOCENTE_CHARS} caracteres para buscar.`;
    }
    if (buscando) return "Buscando...";
    if (error) return error;
    if (resultados.length === 0) return "Sin coincidencias.";
    return null;
  })();

  const showDropdown = (touched || term.trim().length > 0 || buscando || error) && (helper || resultados.length > 0);

  const handleSelect = (docente) => {
    const normalizado = normalizeDocente(docente);
    onSelect(normalizado);
    setResultados([]);
    setTouched(false);
  };

  const handleClear = () => {
    setTerm("");
    setResultados([]);
    setTouched(false);
    onSelect(null);
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-gray-700">{etiqueta}</span>
      <div className="relative">
        <input
          type="text"
          className="border rounded px-2 py-1 w-full"
          placeholder="Nombre del docente"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            setTouched(true);
          }}
          onFocus={() => setTouched(true)}
        />
        {value && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600"
            onClick={handleClear}
            aria-label={`Limpiar ${etiqueta}`}
          >
            ×
          </button>
        )}
      </div>
      {showDropdown && (
        <div className="mt-1 bg-white border rounded text-xs max-h-48 overflow-y-auto shadow-sm">
          {helper ? (
            <div className={`px-2 py-1 ${error ? "text-red-600" : "text-gray-500"}`}>{helper}</div>
          ) : (
            resultados.map((docente) => {
              const activo = value && value.id === docente.id;
              return (
                <button
                  type="button"
                  key={docente.id}
                  onClick={() => handleSelect(docente)}
                  className={`w-full text-left px-2 py-1 border-b last:border-b-0 hover:bg-blue-50 ${activo ? "bg-blue-100" : ""}`}
                >
                  <div className="font-semibold text-gray-800">{docente.display || formatDocenteDisplay(docente)}</div>
                </button>
              );
            })
          )}
        </div>
      )}
      {value && (
        <div className="text-xs text-green-700">Seleccionado: {value.display}</div>
      )}
    </div>
  );
};

const ComiteCurricular = () => {
  const today = new Date();
  const fechaActual = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  const { docente } = useDocente();
  const [firmantes, setFirmantes] = useState({
    presidente: null,
    secretario: null,
    coordinador: null,
    secretarioAcademico: null,
    director: null,
  });
  const [participanteExtra, setParticipanteExtra] = useState(null);

  const updateFirmante = (clave, docente) => {
    setFirmantes((prev) => ({
      ...prev,
      [clave]: normalizeDocente(docente),
    }));
  };

  const docenteActivo = normalizeDocente(docente);
  const docenteDisplay = docenteActivo?.display || "Cargando docente...";

  return (
    <div className="border rounded bg-gray-50 p-4">
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <tbody>
            <tr className="align-top">
              <td className="border px-2 py-2 w-1/2 font-medium">Nombre y firma de los docentes que participaron en su elaboración</td>
              <td className="border px-2 py-2">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700">Docente responsable</span>
                    <input
                      className="border rounded px-2 py-2 w-full bg-gray-100"
                      value={docenteDisplay}
                      disabled
                    />
                  </div>
                  <DocenteLookupInput
                    etiqueta="Agregar participante extra"
                    value={participanteExtra}
                    onSelect={(docente) => setParticipanteExtra(docente)}
                  />
                </div>
              </td>
            </tr>
            <tr className="align-top">
              <td className="border px-2 py-2 font-medium">Nombre y firma del Presidente y/o Secretario de la Academia; o en su caso, del responsable del comité Curricular</td>
              <td className="border px-2 py-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DocenteLookupInput etiqueta="Presidente" value={firmantes.presidente} onSelect={(docente) => updateFirmante("presidente", docente)} />
                  <DocenteLookupInput etiqueta="Secretario" value={firmantes.secretario} onSelect={(docente) => updateFirmante("secretario", docente)} />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border px-2 py-2 font-medium">Nombre y firma del coordinador de carrera</td>
              <td className="border px-2 py-2">
                <DocenteLookupInput etiqueta="Coordinador(a)" value={firmantes.coordinador} onSelect={(docente) => updateFirmante("coordinador", docente)} />
              </td>
            </tr>
            <tr>
              <td className="border px-2 py-2 font-medium">Nombre y firma del Secretario Académico</td>
              <td className="border px-2 py-2">
                <DocenteLookupInput etiqueta="Secretario Académico" value={firmantes.secretarioAcademico} onSelect={(docente) => updateFirmante("secretarioAcademico", docente)} />
              </td>
            </tr>
            <tr>
              <td className="border px-2 py-2 font-medium">Nombre y firma del Director de la Facultad o Escuela</td>
              <td className="border px-2 py-2">
                <DocenteLookupInput etiqueta="Director(a)" value={firmantes.director} onSelect={(docente) => updateFirmante("director", docente)} />
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
