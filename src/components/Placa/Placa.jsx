import React from "react";
import styles from "./Placa.module.css";

export default function Placa({ valor, grande = false }) {
  return (
    <div
      className={`${styles.placa} ${grande ? styles.grande : styles.pequena}`}
    >
      {valor}
    </div>
  );
}
