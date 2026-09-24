import React from "react";

interface Props {
  url: string;
  name: string;
  newEmail: string;
}

export const ChangeTemplate = ({ name, url, newEmail }: Props) => {
  return (
    <div>
      <h1>Hello {name}</h1>
      <p style={{ fontSize: "24px" }}>
        Link to url verify new email {newEmail}{" "}
        <a
          style={{
            padding: "10px",
            borderRadius: "10px",
            color: "white",
            backgroundColor: "aqua",
          }}
          href={url}
        >
          authorize
        </a>
      </p>
    </div>
  );
};
