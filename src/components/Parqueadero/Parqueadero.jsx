import React, { useEffect, useState } from "react";
import styles from "./Parqueadero.module.css";
import TipoPlaza from "../TipoPlaza/TipoPlaza";
import axios from "axios";

export default function Parqueadero({ onSelectPlaza, recargar }) {
  const [plazas, setPlazas] = useState([]);
  const [agrupadas, setAgrupadas] = useState({});

  useEffect(() => {
    axios
      .get("https://backend-au4b.onrender.com/api/plazas/completo")
      .then((res) => {
        setPlazas(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener plazas:", err);
      });
  }, [recargar]); // 🔁 Se recarga cuando cambia el estado recargar

  useEffect(() => {
    const agrupado = plazas.reduce((acc, plaza) => {
      const tipo = plaza.tipoVehiculo;
      if (!acc[tipo]) acc[tipo] = [];
      acc[tipo].push(plaza);
      return acc;
    }, {});
    setAgrupadas(agrupado);
  }, [plazas]);

  return (
    <div className={styles.parqueadero}>
      {Object.keys(agrupadas).map((tipo) => (
        <TipoPlaza
          key={tipo}
          tipo={tipo}
          plazas={agrupadas[tipo]}
          onSelectPlaza={onSelectPlaza}
        />
      ))}
    </div>
  );
}
