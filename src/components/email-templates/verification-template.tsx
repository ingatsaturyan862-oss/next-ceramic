import React from "react";

interface Props {
  url: string;
  name: string;
}

export const VerificationTemplate = ({ name, url }: Props) => {
  return (
    <div>
      <h1>Hello {name}</h1>
      <p style={{ fontSize: "24px" }}>
        Link to url verify
        <a
          style={{
            padding: "10px",
            borderRadius: "10px",
            color: "white",
            backgroundColor: "aqua",
          }}
          href={url}
        >
          verify
        </a>
      </p>
    </div>
  );
};
