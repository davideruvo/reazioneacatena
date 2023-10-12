import React from "react";

const Scores = ({ scores }) => {
  return (
    <div>
      {scores.map((p) => (
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
