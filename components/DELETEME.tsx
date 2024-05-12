import React from "react";

interface myProps {
  script: string;
}

const DELETEME = ({ script }: myProps) => {
  return (
    <div>
      <p>{script}</p>
    </div>
  );
};

export default DELETEME;
