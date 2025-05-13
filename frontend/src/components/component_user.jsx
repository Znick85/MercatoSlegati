import React from "react";
import axios from "axios";

export function ModuloConferma({
  mercato,
  tuttiGiocatoriMercato,
  setTuttiGioc,
  state,
  setcassaMomentanea,
  cassaMomentanea,
  dispatch,
  setMercato,
}) {
  function conferma() {
    if (mercato.Acquisto.ruolo === mercato.Venduto.ruolo) {
      if (
        mercato?.Acquisto?.id &&
        mercato?.Venduto?.id &&
        tuttiGiocatoriMercato.some((e) => e.Venduto.id === mercato.Venduto.id)
      ) {
        // Se esiste un elemento con id uguale, aggiorniamo l'oggetto
        setcassaMomentanea(
          (prev) =>
            prev +
            tuttiGiocatoriMercato.find(
              (el) => el.Venduto.id === mercato.Venduto.id
            ).Acquisto.quotazione -
            mercato.Acquisto.quotazione
        );

        setTuttiGioc(
          tuttiGiocatoriMercato.map((el) =>
            el.Venduto.id === mercato.Venduto.id
              ? {
                  ...el,
                  Acquisto: mercato.Acquisto,
                }
              : el
          )
        );

        const arrayUPDATE = [
          ...state.freePlayer,
          tuttiGiocatoriMercato.find(
            (el) => el.Venduto.id === mercato.Venduto.id
          ).Acquisto,
        ];
        const freePlayerAGG = arrayUPDATE.filter(
          (el) => el.id !== mercato.Acquisto.id
        );

        dispatch({ type: "UPDATE_FREE_PLAYER", payload: freePlayerAGG });
      } else {
        // Se non esiste, aggiungiamo un nuovo oggetto
        setTuttiGioc((prev) => [
          ...prev,
          { Acquisto: mercato.Acquisto, Venduto: mercato.Venduto },
        ]);
        const freePlayerAGG = state.freePlayer.filter(
          (el) => el.id !== mercato.Acquisto.id
        );
        dispatch({ type: "UPDATE_FREE_PLAYER", payload: freePlayerAGG });
        //aggiornamento cassa
        mercato.Acquisto.id &&
          mercato.Venduto.id &&
          setcassaMomentanea(
            (prev) =>
              prev + mercato.Venduto.quotazione - mercato.Acquisto.quotazione
          );
      }
      setMercato({ Acquisto: "", Venduto: "" });
    }

    //filtro giocatore selezionato
  }

  return (
    <>
      <div className="col-3 ">
        <h2>{mercato.Venduto.nome}</h2>
        <h2>{mercato.Acquisto.nome}</h2>
        <button className="btn btn-warning" onClick={conferma}>
          CONFERMA
        </button>
        <h3 className="text-danger">cassa</h3>
        <h3 className="text-center">{cassaMomentanea}</h3>
      </div>
    </>
  );
}

export function ModuloSquadra({
  state,
  storedUser,
  setMercato,
  setruoloSelezionato,
  tuttiGiocatoriMercato,
  setTuttiGioc,
  setcassaMomentanea,
  mercato,
  dispatch,
}) {
  function bottone_deselezione(giocatore) {
    if (tuttiGiocatoriMercato.some((el) => el.Venduto.id === giocatore.id)) {
      setTuttiGioc((prev) =>
        prev.filter((el) => giocatore.id !== el.Venduto.id)
      );

      setcassaMomentanea(
        (prev) =>
          prev +
          tuttiGiocatoriMercato.find((el) => giocatore.id === el.Venduto.id)
            .Acquisto.quotazione -
          tuttiGiocatoriMercato.find((el) => giocatore.id === el.Venduto.id)
            .Venduto.quotazione
      );

      const arrayUPDATE = [
        ...state.freePlayer,
        tuttiGiocatoriMercato.find((el) => giocatore.id === el.Venduto.id)
          .Acquisto,
      ];
      dispatch({
        type: "UPDATE_FREE_PLAYER",
        payload: arrayUPDATE,
      });
    }
  }

  return (
    <div
      className="col-5 overflow-y-auto"
      style={{
        maxHeight: "90vh",
      }}
    >
      <h2>
        Giocatori squadra: {state.team.find((e) => e.id === storedUser)?.nome}
      </h2>
      {/* caricamento giocatori */}
      {state.ruoli.map((ruoli, index) => (
        <React.Fragment key={index}>
          <h5>{ruoli}</h5>
          <ul className="d-flex-column m-2 p-2 list-group">
            {state.teamPlayer
              .filter((el) => el.ruolo === ruoli)
              .map((giocatore) => (
                <div className="row" key={giocatore.id}>
                  <div className="col-6">
                    <li className="list-group-item list-group-item-action list-group-item-primary">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <input
                            type="radio"
                            className="btn-check"
                            name="options"
                            id={giocatore.id}
                            autoComplete="off"
                            onChange={() => {
                              setMercato((prevTest) => ({
                                ...prevTest,
                                Venduto: giocatore,
                              }));
                              setruoloSelezionato(giocatore.ruolo);
                            }}
                          />
                        </div>

                        <label
                          className="p-1 text-center"
                          htmlFor={giocatore.id}
                        >
                          {giocatore.nome} ({giocatore.squadra}) -{" "}
                          {giocatore.quotazione}
                        </label>
                      </div>
                    </li>
                  </div>
                  <button
                    className="col-6 btn btn-primary rounded fw-bold fs-6 align-middle p-3"
                    onClick={() => bottone_deselezione(giocatore)}
                  >
                    {tuttiGiocatoriMercato.some(
                      (el) => el.Venduto.id === giocatore.id
                    ) ? (
                      <div className="d-inline m-2 p-3 btn-primary">
                        {
                          tuttiGiocatoriMercato.find(
                            (x) => x.Venduto.id === giocatore.id
                          ).Acquisto.nome
                        }
                        {" - "}{" "}
                        {
                          tuttiGiocatoriMercato.find(
                            (x) => x.Venduto.id === giocatore.id
                          ).Acquisto.quotazione
                        }
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </button>
                </div>
              ))}
          </ul>
        </React.Fragment>
      ))}
    </div>
  );
}

export function ModuloInserimentoMercato({
  tuttiGiocatoriMercato,
  dispatch,
  idUser,
}) {
  function salva() {
    dispatch({
      type: "SAVE_MARKET",
      mercato: tuttiGiocatoriMercato,
      idUser: idUser,
    });

    axios
      .patch("http://130.25.12.189:8000/api/squadre/" + idUser + "/", {
        mercato: tuttiGiocatoriMercato,
      })
      // .patch("http://127.0.0.1:8000/api/squadre/" + idUser + "/", {
      //   mercato: tuttiGiocatoriMercato,
      // })
      .then((response) => {
        console.log("Giocatore aggiornato:", response.data);
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  }

  return (
    <>
      <button className="btn btn-info" onClick={salva}>
        Salva Dati
      </button>
    </>
  );
}
