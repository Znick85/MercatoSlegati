import { useReducer, useState, useEffect } from "react";
import {
  FantaReducer,
  initialFantaState,
  CaricamentoGiocatori,
} from "./taskmanager";

export function Totale() {
  const [state, dispatch] = useReducer(FantaReducer, initialFantaState); //inizializzo il reducer e lo stato iniziale
  const [squadre, setsquadre] = useState([]);
  const [mercato, setmercato] = useState([]);

  CaricamentoGiocatori(state, dispatch);

  useEffect(() => {
    let nuovoArray = [];

    state.team.forEach((el, index) => {
      const array = state.allPlayer.filter(
        (player) => player.id_squadra_serie_A === index + 1
      );
      nuovoArray = [...nuovoArray, array];
      setsquadre(nuovoArray);
    });
  }, [state.allPlayer, state.team]);

  useEffect(() => {
    const mercato_aggiornato = state.team.map((el) => {
      return el.mercato;
    });
    setmercato(mercato_aggiornato);
  }, [state.team]);

  function giocatoriAcquisto(el) {
    const idSquadra = el.id_squadra_serie_A;

    // Verifica se il mercato è definito e non è vuoto
    if (!Array.isArray(mercato) || mercato.length === 0) {
      return null;
    }

    // Trova il mercato della squadra selezionata
    const squadra = mercato.find(
      (ele) =>
        Array.isArray(ele) && ele[0]?.Venduto?.id_squadra_serie_A === idSquadra
    );

    // Se non trova la squadra, ritorna null
    if (!squadra) {
      return null;
    }

    // Cerca il giocatore venduto
    const giocAcquisto = squadra.find((ele) => ele?.Venduto?.id === el.id);

    // Restituisce il nome del giocatore acquistato o null se non trovato
    return giocAcquisto?.Acquisto?.nome || null;
  }

  if (!state.team[0] && !state.allPlayer[0]) {
    return <div>Caricamento...</div>; // Mostra un messaggio di caricamento mentre i dati arrivano
  }

  return (
    <>
      <div className="row p-3 ">
        {squadre.map((el, index) => (
          <div className="col-2 " key={index}>
            <h3>
              {el[0] &&
              state.team.find(
                (ele) => ele.id === parseFloat(el[0].id_squadra_serie_A)
              )
                ? state.team.find(
                    (ele) => ele.id === parseFloat(el[0].id_squadra_serie_A)
                  ).nome
                : ""}
            </h3>

            <div className="col-12 ">
              {el.map((gioc) => (
                <p className="" key={gioc.id}>
                  {gioc.nome} {" -> "}
                  {giocatoriAcquisto(gioc)}
                </p>
              ))}
            </div>

            <h3>Cassa:</h3>
            <h3>
              {el[0] &&
              state.team.find(
                (ele) => ele.id === parseFloat(el[0].id_squadra_serie_A)
              )
                ? state.team.find(
                    (ele) => ele.id === parseFloat(el[0].id_squadra_serie_A)
                  ).cassa
                : ""}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
}
