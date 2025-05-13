import { useEffect } from "react";
import axios from "axios";

export const FantaReducer = (state, action) => {
  //creamo il reducer per le azioni
  switch (action.type) {
    case "UPDATE_PLAYER":
      return { ...state, allPlayer: action.payload };
    case "UPDATE_TEAM":
      return { ...state, team: action.payload };
    case "UPDATE_ID_TEAM":
      return { ...state, idTeam: action.payload };
    case "UPDATE_TEAM_PLAYER":
      return { ...state, teamPlayer: action.payload };

    case "UPDATE_FREE_PLAYER":
      return { ...state, freePlayer: action.payload };
    case "ADD_PLAYER_TEAM":
      return {
        ...state,
        allPlayer: state.allPlayer.map((player) =>
          player.id === action.payload.id ? action.payload : player
        ),
      };
    case "UPDATE_CASH":
      return {     ...state,  team: state.team.map((team) =>
          team.id === state.idTeam
            ? { ...team, cassa: action.payload }
            : team
        ),
      };;

    case "SAVE_MARKET":
      const idTeam = action.idUser

        return { ...state, team: state.team.map((team)=>
          team.id === idTeam
              ? {...team, mercato: action.mercato}
              : team
        )}
    default:
      return state;
  }
};

// Stato iniziale
export const initialFantaState = {
  allPlayer: [],
  freePlayer: [],
  teamPlayer: [],
  team: [],
  idTeam: null,
  ruoli: ["Portiere", "Difensore", "Centrocampista", "Attaccante"],
};

export function CaricamentoGiocatori(state, dispatch) {

  //carico i giocatori

  useEffect(() => {
    axios
      // .get("http://127.0.0.1:8000/api/giocatori/")
      .get("http://130.25.12.189:8000/api/giocatori/")
      .then((response) => {
        // carica la lista di tutti i giocatori nel database
        const array = response.data;
        dispatch({ type: "UPDATE_PLAYER", payload: array });
      })
      .catch((error) => console.error("Errore:", error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios
      // .get("http://127.0.0.1:8000/api/squadre/")
      .get("http://130.25.12.189:8000/api/squadre/")
      .then((response) => {
        // carica le squadre
        const array = response.data;
        // const nuovoarray = array.map(el=> ({...el,mercato:[]}))
      
        dispatch({ type: "UPDATE_TEAM", payload: array });

        
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);



  useEffect(()=>{
    
        //aggiorna la lista di giocatori liberi
        const arraylibero = state.allPlayer.filter(
          (e) => e.id_squadra_serie_A === null
        );
        dispatch({ type: "UPDATE_FREE_PLAYER", payload: arraylibero })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[state.allPlayer])    
      

useEffect(() => {
  if (state.team && state.allPlayer) {
          //inserisce i giocatori in teamPlayer
          const arrayFiltrato =
          state.idTeam !== null
            ? state.allPlayer.filter(
                (e) => e.id_squadra_serie_A === state.idTeam
              )
            : [];
        dispatch({ type: "UPDATE_TEAM_PLAYER", payload: arrayFiltrato });

            }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [state.allPlayer])





  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/api/squadre/")
  //     .then((response) => {
  //       // carica le squadre
  //       const array = response.data;
  //       dispatch({ type: "UPDATE_TEAM", payload: array });
  //       //aggiorna la lista di giocatori liberi
  //       const arraylibero = state.allPlayer.filter(
  //         (e) => e.id_squadra_serie_A === null
  //       );
  //       dispatch({ type: "UPDATE_FREE_PLAYER", payload: arraylibero });

  //       //inserisce i giocatori in teamPlayer
  //       const arrayFiltrato =
  //         state.idTeam !== null
  //           ? state.allPlayer.filter(
  //               (e) => e.id_squadra_serie_A === state.idTeam
  //             )
  //           : [];
  //       dispatch({ type: "UPDATE_TEAM_PLAYER", payload: arrayFiltrato });
  //       console.log(state);
  //     })
  //     .catch((error) => console.error("Errore:", error));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.allPlayer]); // Questo `useEffect` viene eseguito solo una volta al montaggio
}












export function CaricamentoGiocatoriSquadre(state, dispatch) {
  //carico le squadre e aggiorno id team
  useEffect(() => {
    axios
      // .get("http://127.0.0.1:8000/api/squadre/")
      .get("http://130.25.12.189:8000/api/squadre/")
      .then((response) => {
        const array = response.data;
        dispatch({ type: "UPDATE_TEAM", payload: array });

        const storeUser = parseFloat(localStorage.getItem("user"));
        dispatch({ type: "UPDATE_ID_TEAM", payload: storeUser });
      })
      .catch((error) => console.error("Errore:", error));
  }, [dispatch]); // Questo `useEffect` viene eseguito solo una volta al montaggio

  useEffect(() => {
    const arrayFiltrato = state.allPlayer.filter(
      (e) => e.id_squadra_serie_A === state.idTeam
    );
    dispatch({ type: "UPDATE_TEAM_PLAYER", payload: arrayFiltrato });

    const arraylibero = state.allPlayer.filter(
      (e) => e.id_squadra_serie_A === null
    );
    dispatch({ type: "UPDATE_FREE_PLAYER", payload: arraylibero });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.allPlayer, state.idTeam]); // Questo `useEffect` viene eseguito ogni volta che `state.allPlayer` cambia
}




// function inserimentoGiocatoriTEST(
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
