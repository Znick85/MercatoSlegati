import axios from "axios";

function SelezionaGiocatori(e, state, dispatch) {
  const arrayFiltrato = state.allPlayer.filter(
    (el) => el.id_squadra_serie_A === e
  );
  //seleziona giocatori della squadra selezionata
  dispatch({ type: "UPDATE_TEAM_PLAYER", payload: arrayFiltrato });
  dispatch({ type: "UPDATE_ID_TEAM", payload: e });
}


// function SelezionaGiocatori(e, state, dispatch) {
//   const arrayFiltrato = state.allPlayer.filter(
//     (el) => el.id_squadra_serie_A === e
//   ); //seleziona giocatori della squadra selezionata
//   dispatch({ type: "UPDATE_TEAM_PLAYER", payload: arrayFiltrato });
//   dispatch({ type: "UPDATE_ID_TEAM", payload: e });
// }




function InserimentoGiocatori(e, state, dispatch) {
  //aggiorno giocatore nello state
  const gioConID = { ...e, id_squadra_serie_A: state.idTeam };
  dispatch({ type: "ADD_PLAYER_TEAM", payload: gioConID });

  //rimuovo i soldi dalla cassa della squadra
  const cassaAggior =  state.team.find((e) => e.id === state.idTeam)?.cassa - e.quotazione;
  dispatch({ type: "UPDATE_CASH", payload: cassaAggior });


  //carica giocatore nel database
  axios
    .patch("http://127.0.0.1:8000/api/giocatori/" + e.id + "/", {
      id_squadra_serie_A: state.idTeam,
    })
    .then((response) => {
      console.log("Giocatore aggiornato:", response.data);
    })
    .catch((error) => {
      console.error("Errore:", error);
    });

  //aggiorna cassa
  axios
    .patch("http://127.0.0.1:8000/api/squadre/" + state.idTeam + "/", {
      cassa: cassaAggior,
    })
    .then((response) => {
      console.log("Giocatore aggiornato:", response.data);
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
}

function RimozioneGiocatori(e, state, dispatch) {
  console.log(e);
  const giosenID = { ...e, id_squadra_serie_A: null };

  dispatch({ type: "ADD_PLAYER_TEAM", payload: giosenID });

  axios
    .patch("http://127.0.0.1:8000/api/giocatori/" + e.id + "/", {
      id_squadra_serie_A: null,
    })
    .then((response) => {
      console.log("Giocatore aggiornato:", response.data);
    })
    .catch((error) => {
      console.error("Errore:", error);
    });

    const cassaAggior =  state.team.find((e) => e.id === state.idTeam)?.cassa + e.quotazione;
    dispatch({ type: "UPDATE_CASH", payload: cassaAggior });

  //aggiorna cassa
  axios
    .patch("http://127.0.0.1:8000/api/squadre/" + state.idTeam + "/", {
      cassa: cassaAggior,
    })
    .then((response) => {
      console.log("Giocatore aggiornato:", response.data);
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
}

export { SelezionaGiocatori, InserimentoGiocatori, RimozioneGiocatori };

// function inserimentoGiocatori(
//   gioc,
//   setallGioc,
//   setgiocatoriLiberi,
//   id,
//   giocatoriLiberi,
//   setGQ
// ) {
//   setallGioc((prev) => [...prev, (gioc.id_squadra_serie_A = id.current)]);
//   const arrayGiocaLib = giocatoriLiberi.filter((el) => el.id !== gioc.id);
//   setgiocatoriLiberi(arrayGiocaLib);
//   setGQ((prev) => [...prev, gioc]);
//   axios
//     .patch("http://127.0.0.1:8000/api/giocatori/" + gioc.id + "/", {
//       id_squadra_serie_A: id.current,
//     })
//     .then((response) => {
//       console.log("Giocatore aggiornato:", response.data);
//     })
//     .catch((error) => {
//       console.error("Errore:", error);
//     });
// }
// function selezionaGiocatori(e, gio, set, idSquadra) {
//   const arrayFiltrato = gio.filter(
//     (el) => el.id_squadra_serie_A === parseInt(e)
//   ); //seleziona giocatori della squadra selezionata
//   set(arrayFiltrato);
//   console.log(arrayFiltrato);
//   idSquadra.current = parseFloat(e);
//   // const arrayGioLibFil = gio.filter(el=> el.id_squadra_serie_A === null)
