import axios from "axios";
import React, { useState } from "react";
import Cabecera from "./components/Cabecera/Cabecera";
import Parqueadero from "./components/Parqueadero/Parqueadero";
import ModalEntrada from "./components/ModalEntrada/ModalEntrada";

function App() {
  const [plazaSeleccionada, setPlazaSeleccionada] = useState(null);
  const [modalEntradaVisible, setModalEntradaVisible] = useState(false);
  const [recargarPlazas, setRecargarPlazas] = useState(false); // 🔁 trigger para actualizar plazas

  // Al hacer clic en cualquier plaza: solo seleccionarla
  const handleSelectPlaza = (plaza) => {
    setPlazaSeleccionada(plaza);
    // ❌ NO mostrar modal aquí
  };

  // POST: Registro de ingreso
  const handleRegistrarEntrada = async (plaza, placa) => {
    try {
      await axios.post("http://localhost:4000/api/parqueo/ingreso", {
        plazaId: plaza.id,
        placa,
      });

      setModalEntradaVisible(false);
      setPlazaSeleccionada(null);
      setRecargarPlazas(!recargarPlazas);
    } catch (err) {
      console.error("Error al registrar entrada:", err);
      alert("Hubo un error al registrar la entrada.");
    }
  };

  // POST: Registro de salida
  const handleRegistrarSalida = async (plaza) => {
    try {
      const parqueoId = plaza.parqueoActivo?.id;
      if (!parqueoId) return;

      const res = await axios.post("http://localhost:4000/api/parqueo/salida", {
        parqueoId,
      });

      alert(
        `Vehículo con placa ${plaza.parqueoActivo.placa} ha salido.\n` +
          `Total a pagar: $${res.data.parqueo.totalPagar}`
      );

      setPlazaSeleccionada(null);
      setRecargarPlazas(!recargarPlazas);
    } catch (err) {
      console.error("Error al registrar salida:", err);
      alert("Hubo un error al registrar la salida.");
    }
  };

  return (
    <>
      <Cabecera
        plazaSeleccionada={plazaSeleccionada}
        onMostrarModalEntrada={() => setModalEntradaVisible(true)}
        onRegistrarSalida={handleRegistrarSalida}
      />
      <Parqueadero
        onSelectPlaza={handleSelectPlaza}
        recargar={recargarPlazas}
      />
      <ModalEntrada
        visible={modalEntradaVisible}
        onClose={() => setModalEntradaVisible(false)}
        plaza={plazaSeleccionada}
        onRegistrarEntrada={handleRegistrarEntrada}
      />
    </>
  );
}

export default App;
