import React from "react";

interface Props {
  url: string;
  name: string;
}

export const DeleteTemplate = ({ name, url }: Props) => {
  return (
    <div>
      <h1>Hello {name}</h1>
      <p style={{ fontSize: "24px" }}>
        Link to url delete account
        <a
          style={{
            padding: "10px",
            borderRadius: "10px",
            color: "white",
            backgroundColor: "brown",
          }}
          href={url}
        >
          remove
        </a>
      </p>
    </div>
  );
};
