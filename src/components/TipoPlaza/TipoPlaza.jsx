import React from "react";
import styles from "./TipoPlaza.module.css";
import Plaza from "../Plaza/Plaza";

export default function TipoPlaza({ tipo, plazas, onSelectPlaza }) {
  return (
    <div className={styles.tipoPlaza}>
      <h2 className={styles.titulo}>{tipo}</h2>
      <div className={styles.grid}>
        {plazas.map((plaza) => (
          <Plaza
            key={plaza.id} // ✅ antes era plaza.id_plaza
            plaza={plaza}
            onSelect={() => onSelectPlaza(plaza)}
          />
        ))}
      </div>
    </div>
  );
}
