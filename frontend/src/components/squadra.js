import React, { useEffect, useReducer, useState } from "react";
import {
  FantaReducer,
  initialFantaState,
  CaricamentoGiocatori,
} from "./taskmanager";
import {
  ModuloConferma,
  ModuloSquadra,
  ModuloInserimentoMercato,
} from "./component_user";

function SquadraUtente() {
  const [state, dispatch] = useReducer(FantaReducer, initialFantaState); //inizializzo il reducer e lo stato iniziale
  const [storedUser, setstoredUser] = useState(1);

  useEffect(() => {
    if (state.team[0]) {
      setstoredUser(
        state.team.find(
          (el) => el.user === parseFloat(localStorage.getItem("user"))
        ).id
      );
    }
  }, [state.team]);

  const [ruoloSelezionato, setruoloSelezionato] = useState("");

  const [mercato, setMercato] = useState({ Acquisto: "", Venduto: "" });
  const [tuttiGiocatoriMercato, setTuttiGioc] = useState([]);

  const [cassaMomentanea, setcassaMomentanea] = useState("");

  CaricamentoGiocatori(state, dispatch);

  useEffect(() => {
    const arrayFiltrato = state.allPlayer.filter(
      (el) => el.id_squadra_serie_A === storedUser
    );
    //seleziona giocatori della squadra selezionata
    dispatch({ type: "UPDATE_TEAM_PLAYER", payload: arrayFiltrato });
    dispatch({ type: "UPDATE_ID_TEAM", payload: storedUser });
  }, [state.allPlayer, state.freePlayer, storedUser]);

  useEffect(() => {

      const cassa = state.team.find((e) => e.id === storedUser)?.cassa
      
      cassa &&     setcassaMomentanea(cassa);


  }, [state.team]);


  //caricamento giocatori selezionati mercato
  useEffect(() => {
    if (state.team[0] && state.freePlayer[0]) {
      const arrayMercatoImportato = state.team.find(
        (el) => el.id === storedUser
      ).mercato;

      arrayMercatoImportato.forEach((el) => {
        setcassaMomentanea(
          (prev) => prev - el.Acquisto.quotazione + el.Venduto.quotazione
        );
      });


      const freePlayerAGG = state.freePlayer.filter(
        (el) => !arrayMercatoImportato.some((ele) => ele.Acquisto.id === el.id)
      );
      dispatch({ type: "UPDATE_FREE_PLAYER", payload: freePlayerAGG });
      setTuttiGioc(arrayMercatoImportato);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.team, storedUser]);

  if (!state.team[0]) {
    return <div>Caricamento...</div>; // Mostra un messaggio di caricamento mentre i dati arrivano
  }

  // return <>test</>;

  return (
    <div>
      <div className="row p-3">
        <ModuloSquadra
          state={state}
          storedUser={storedUser}
          setMercato={setMercato}
          setruoloSelezionato={setruoloSelezionato}
          tuttiGiocatoriMercato={tuttiGiocatoriMercato}
          setTuttiGioc={setTuttiGioc}
          setcassaMomentanea={setcassaMomentanea}
          mercato={mercato}
          dispatch={dispatch}
        />

        {/* //giocatore libero */}
        <div
          className="col-7 row "

        >
          <div className="col-8 overflow-auto" style={{
            maxHeight: "90vh",}}
          >
            <h3>Giocatori liberi: {ruoloSelezionato} </h3>

            <div className="">
              <ul className="d-flex-column m-2 p-1 list-group overflow-auto">
                {state.freePlayer
                  .filter((giocatore) => giocatore.ruolo === ruoloSelezionato)
                  .sort((a, b) => b.quotazione - a.quotazione)
                  .map((giocatore) => (
                    <li
                      key={giocatore.id}
                      className="list-group-item list-group-item-action list-group-item-secondary text-center"
                    >
                      <button
                        className="btn"
                        onClick={() =>
                          setMercato((prevTest) => ({
                            ...prevTest,
                            Acquisto: giocatore,
                          }))
                        }
                      >
                        {giocatore.nome} - {giocatore.ruolo} (
                        {giocatore.squadra}) - {giocatore.quotazione}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="col-3 m-3 text-center">
            <ModuloConferma
              mercato={mercato}
              tuttiGiocatoriMercato={tuttiGiocatoriMercato}
              setTuttiGioc={setTuttiGioc}
              state={state}
              setcassaMomentanea={setcassaMomentanea}
              cassaMomentanea={cassaMomentanea}
              dispatch={dispatch}
              setMercato={setMercato}
            />
            <ModuloInserimentoMercato
              tuttiGiocatoriMercato={tuttiGiocatoriMercato}
              dispatch={dispatch}
              idUser={storedUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SquadraUtente;
