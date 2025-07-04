import React, { useEffect, useState } from "react";
import styles from "./Parqueadero.module.css";
import TipoPlaza from "../TipoPlaza/TipoPlaza";
import axios from "axios";

export default function Parqueadero({ onSelectPlaza }) {
  const [plazas, setPlazas] = useState([]);
  const [agrupadas, setAgrupadas] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/plazas/disponibles")
      .then((res) => {
        setPlazas(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener plazas:", err);
      });
  }, []);

  useEffect(() => {
    // Agrupar plazas por tipo_vehiculo
    const agrupado = plazas.reduce((acc, plaza) => {
      const tipo = plaza.tipo_vehiculo;
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
