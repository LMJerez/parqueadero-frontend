import React, { useEffect, useState } from "react";
import styles from "./Cabecera.module.css";
import Placa from "../Placa/Placa";

export default function Cabecera({
  plazaSeleccionada,
  onMostrarModalEntrada,
  onRegistrarSalida,
}) {
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState("00:00:00");
  const [costoEstimado, setCostoEstimado] = useState(0);

  useEffect(() => {
    let intervalo;

    if (plazaSeleccionada?.ocupada && plazaSeleccionada.parqueoActivo) {
      const calcular = () => {
        const horaInicio = new Date(plazaSeleccionada.parqueoActivo.horaInicio);
        const ahora = new Date();
        const segundos = Math.floor((ahora - horaInicio) / 1000);

        const horas = String(Math.floor(segundos / 3600)).padStart(2, "0");
        const minutos = String(Math.floor((segundos % 3600) / 60)).padStart(
          2,
          "0"
        );
        const segundosRest = String(segundos % 60).padStart(2, "0");

        setTiempoTranscurrido(`${horas}:${minutos}:${segundosRest}`);

        const minutosTotales = Math.ceil((ahora - horaInicio) / 60000);
        setCostoEstimado(minutosTotales * plazaSeleccionada.valorMinuto);
      };

      calcular();
      intervalo = setInterval(calcular, 1000);
    } else {
      setTiempoTranscurrido("00:00:00");
      setCostoEstimado(0);
    }

    return () => clearInterval(intervalo);
  }, [plazaSeleccionada]);

  if (!plazaSeleccionada) {
    return (
      <header className={styles.cabecera}>
        <div className={styles.identificacion}>
          <img src="/logo.svg" alt="Logo" className={styles.logo} />
          <h1>Parqueadero Misión 3</h1>
          <span>Desarrollado por Luis Mario Jerez</span>
        </div>
      </header>
    );
  }

  const estaOcupada = plazaSeleccionada.ocupada;

  return (
    <header className={styles.cabecera}>
      <div className={styles.identificacion}>
        <img src="/logo.svg" alt="Logo" className={styles.logo} />
        <h1>Parqueadero Misión 3</h1>
        <span>Desarrollado por Luis Mario Jerez</span>
      </div>

      <div className={styles.detalles}>
        <h2>Plaza Seleccionada: {plazaSeleccionada.nombre}</h2>
        {estaOcupada ? (
          <>
            <Placa
              valor={plazaSeleccionada.parqueoActivo.placa}
              size="grande"
            />
            <p>
              Hora ingreso:{" "}
              {new Date(
                plazaSeleccionada.parqueoActivo.horaInicio
              ).toLocaleTimeString()}
            </p>
            <p>Tiempo transcurrido: {tiempoTranscurrido}</p>
            <p>Costo estimado: ${costoEstimado}</p>
          </>
        ) : (
          <p>Plaza libre. Puede registrar un nuevo ingreso.</p>
        )}
      </div>

      <div className={styles.acciones}>
        <button
          onClick={onMostrarModalEntrada}
          disabled={!plazaSeleccionada || plazaSeleccionada.ocupada}
        >
          Registrar entrada
        </button>

        <button
          className={styles.btnSalida}
          onClick={() => onRegistrarSalida(plazaSeleccionada)}
          disabled={!plazaSeleccionada || !plazaSeleccionada.ocupada}
        >
          Registrar salida
        </button>
      </div>
    </header>
  );
}
