import React from "react";

interface Props {
  name: string;
  email: string;
  message?: string;
  company?: string;
  phone: string;
}

export const ContactTemplate = ({
  name,
  email,
  message,
  company,
  phone,
}: Props) => {
  return (
    <div>
      <p style={{ fontSize: "24px" }}>
        Name:{" "}
        <span style={{ fontSize: "30px", fontWeight: "bold" }}>{name}</span>
      </p>
      <p style={{ fontSize: "24px" }}>
        Email:{" "}
        <span style={{ fontSize: "30px", fontWeight: "bold" }}>{email}</span>
      </p>
      {message && (
        <p style={{ fontSize: "24px" }}>
          Message:{" "}
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>
            {message}
          </span>
        </p>
      )}
      {company && (
        <p style={{ fontSize: "24px" }}>
          Company:{" "}
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>
            {company}
          </span>
        </p>
      )}
      <p style={{ fontSize: "24px" }}>
        Phone:{" "}
        <span style={{ fontSize: "30px", fontWeight: "bold" }}>{phone}</span>
      </p>
    </div>
  );
};
