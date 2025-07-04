import React from "react";
import styles from "./Plaza.module.css";
import Placa from "../Placa/Placa";

export default function Plaza({ plaza, onSelect }) {
  const ocupada = plaza.plaza_ocupada;

  return (
    <div
      className={`${styles.plaza} ${ocupada ? styles.ocupada : styles.libre}`}
      onClick={() => onSelect(plaza)}
      title={ocupada ? `Ocupada - ${plaza.placa_vehiculo}` : "Disponible"}
    >
      <div className={styles.nombre}>{plaza.nombre_plaza}</div>

      <div className={styles.estado}>
        {ocupada ? (
          <Placa valor={plaza.placa_vehiculo} />
        ) : (
          <span className={styles.check}>✅</span>
        )}
      </div>
    </div>
  );
}
