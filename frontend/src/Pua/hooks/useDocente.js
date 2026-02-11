import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../utils/api";

const useDocente = () => {
  const [docente, setDocente] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id_docente) {
      fetch(`${API_BASE_URL}/docente/${user.id_docente}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setDocente(data.docente);
        });
    }
  }, []);

  let bienvenida = "Bienvenido";
  if (docente) {
    const titulo = docente.titulo ? docente.titulo : '';
    const nombre = docente.nombre ? docente.nombre : '';
    const apellidoP = docente.apellido_paterno ? docente.apellido_paterno : '';
    const apellidoM = docente.apellido_materno ? docente.apellido_materno : '';
    bienvenida = `Bienvenido${titulo ? ' ' + titulo : ''}${nombre ? ' ' + nombre : ''}${apellidoP ? ' ' + apellidoP : ''}${apellidoM ? ' ' + apellidoM : ''}`.trim();
  }

  return { docente, bienvenida };
};

export default useDocente;
