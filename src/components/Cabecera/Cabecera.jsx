import React from "react";
import styles from "./Cabecera.module.css";
import logo from "/logo.svg"; // Este archivo debe estar en /public/

export default function Cabecera({ plazaSeleccionada, resumen }) {
  return (
    <div className={styles.cabecera}>
      <div className={styles.filaSuperior}>
        <div className={styles.identificacion}>
          <img src={logo} alt="Logo parqueadero" />
          <div>
            <h1>Parqueadero FESC</h1>
            <p>Desarrollado por Luis Mario Jerez + ChatGPT</p>
          </div>
        </div>
      </div>

      <div className={styles.filaInferior}>
        <div className={styles.seleccion}>
          <strong>Plaza seleccionada:</strong> {plazaSeleccionada ?? "Ninguna"}
        </div>

        <div className={styles.opciones}>
          <button>Registrar ingreso</button>
          <button>Registrar salida</button>
        </div>

        <div className={styles.ocupacion}>
          <strong>Carros:</strong> {resumen?.carros ?? "0/0"}
          <br />
          <strong>Motos:</strong> {resumen?.motos ?? "0/0"}
        </div>
      </div>
    </div>
  );
}
