import React, { useState } from "react";
import styles from "./ModalEntrada.module.css";

export default function ModalEntrada({
  visible,
  onClose,
  plaza,
  onRegistrarEntrada,
}) {
  const [placa, setPlaca] = useState("");

  const handleSubmit = () => {
    if (!placa.trim()) {
      alert("Por favor ingresa la placa del vehículo.");
      return;
    }

    onRegistrarEntrada(plaza, placa.trim().toUpperCase());
    setPlaca("");
    onClose(); // Cierra el modal
  };

  if (!visible || !plaza) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Registrar Ingreso</h2>
        <p>
          Plaza seleccionada: <strong>{plaza.nombre}</strong>
        </p>

        <input
          type="text"
          placeholder="Placa del vehículo"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
        />

        <div className={styles.botones}>
          <button onClick={handleSubmit}>Registrar</button>
          <button onClick={onClose} className={styles.cancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
