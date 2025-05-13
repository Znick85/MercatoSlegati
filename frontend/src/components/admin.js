import { useState, useReducer } from "react";
import React from "react";
import {
  SelezionaGiocatori,
  InserimentoGiocatori,
  RimozioneGiocatori,
} from "./giocatori";
import {
  FantaReducer,
  initialFantaState,
  CaricamentoGiocatori,
} from "./taskmanager";


function Admin() {
const [ruoloSelezionato, setruoloSelezionato] = useState("")

  const [state, dispatch] = useReducer(FantaReducer, initialFantaState); //inizializzo il reducer e lo stato iniziale

  CaricamentoGiocatori(state, dispatch);

  if (!state.team[0]) {
    return <div>Caricamento...</div>; // Mostra un messaggio di caricamento mentre i dati arrivano
  }

  return (
    <div>
      <div className="row">
        <select
          className="form-select p-3"
          aria-label="Default select example"
          defaultValue=""
          onChange={(e) => {
            SelezionaGiocatori(parseInt(e.target.value), state, dispatch);
          }}
        >
          <option value="" disabled>
            Scegli la squadra da modificare
          </option>
          <option value={null}>---</option>
          <option value={state.team[0].id}>{state.team[0].nome}</option>
          <option value={state.team[1].id}>{state.team[1].nome}</option>
          <option value={state.team[2].id}>{state.team[2].nome}</option>
          <option value={state.team[3].id}>{state.team[3].nome}</option>
        </select>
      </div>
      <div className="row p-2">
        <div className="col">
          <h2>
            Giocatori squadra:{" "}
            {state.team.find((e) => e.id === state.idTeam)?.nome}
          </h2>
          {state.ruoli.map((ruoli,index) => (
            <React.Fragment key={index}>
              {/* crea la lista dei giocatori della squadra divisi per ruoli */}
              <h5>{ruoli}</h5>
              <ul className="d-flex-column m-2 p-2 list-group">
                {state.teamPlayer
                  .filter((el) => el.ruolo === ruoli)
                  .map((giocatore) => (
                    <li key={giocatore.id} className="list-group-item">
                      {giocatore.nome}({giocatore.squadra}) -{" "}
                      {giocatore.quotazione}
                      <button
                        type="button"
                        className="btn-close float-end"
                        aria-label="Close"
                        onClick={() =>
                          RimozioneGiocatori(giocatore, state, dispatch)
                        }
                      />
                    </li>
                  ))}
              </ul>
            </React.Fragment>
          ))}
        </div>



        <div className="col">
        <select
          className="form-select p-3"
          aria-label="Default select example"
          defaultValue=""
          onChange={(e) => {
            setruoloSelezionato(e.target.value);
          }}
        >
          <option value="" disabled>
            Scegli il ruolo
          </option>
          <option value={null}>---</option>
          {state.ruoli.map((ruolo)=>(<option key={ruolo} value={ruolo}>{ruolo}</option>))}
                  </select>

        
          <ul className="d-flex-column m-2 p-2 list-group overflow-auto" style={{maxHeight: "80vh"}}>
            {state.freePlayer
            .filter((giocatore) => (giocatore.ruolo === ruoloSelezionato))
            .map((giocatore) => (
              <li key={giocatore.id} className="list-group-item list-group-item-action list-group-item-secondary">
                <button
                  className="btn"
                  onClick={() =>
                    InserimentoGiocatori(giocatore, state, dispatch)
                  }
                >
                  {giocatore.nome} - {giocatore.ruolo} ({giocatore.squadra}) -{" "}
                  {giocatore.quotazione}
                </button>
              </li>
            ))}
          </ul>
        </div>


        
        <div className="col">
          <h2>Soldi rimanenti:</h2>
          <p> {state.team.find((e) => e.id === state.idTeam)?.cassa}</p>
        </div>
      </div>
    </div>
  );
}

export default Admin;
