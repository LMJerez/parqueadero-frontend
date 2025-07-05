import React from "react";
import styles from "./Plaza.module.css";
import Placa from "../Placa/Placa";

export default function Plaza({ plaza, onSelect }) {
  const ocupada = plaza.ocupada;
  const placa = plaza.parqueoActivo?.placa || "";

  const handleClick = () => {
    // Siempre permitimos seleccionar, la lógica de entrada/salida se controla externamente
    onSelect(plaza);
  };

  return (
    <div
      className={`${styles.plaza} ${ocupada ? styles.ocupada : styles.libre}`}
      onClick={handleClick}
      title={ocupada ? `Ocupada - ${placa}` : "Disponible"}
    >
      <div className={styles.nombre}>{plaza.nombre}</div>

      <div className={styles.estado}>
        {ocupada ? (
          <Placa valor={placa} />
        ) : (
          <span className={styles.check}>✅</span>
        )}
      </div>
    </div>
  );
}
