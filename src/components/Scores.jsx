import React from "react";
import useFetch, { getReq } from "#utils/useFetch";

const Scores = ({ offsetBottom }) => {
  const { response: responseGet, doFetch: doGet } = useFetch();
  const [players, setPlayers] = React.useState([]);
  React.useEffect(() => {
    doGet(getReq(`/api/players/get`, { sort: "n" }));
  }, []);
  React.useEffect(() => {
    if (responseGet) {
      setPlayers(responseGet);
    }
  }, [responseGet]);

  return (
    <div>
      {players.map((p) => (
        <div
          style={{
            display: "inline-block",
            borderRadius: 10,
            padding: 5,
            backgroundColor: p.color,
          }}
          key={p.id}
        >
          {p.name}
        </div>
      ))}
    </div>
  );
};

export default Scores;
