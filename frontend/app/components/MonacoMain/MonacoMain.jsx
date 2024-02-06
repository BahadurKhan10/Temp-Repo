// MonacoMain.jsx
"use client";
import React, { useState } from "react";
import MonacoComponent from "../MonacoRest/MonacoComponent";
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';

const MonacoMain = () => {
  const [code, setCode] = useState("// Your code here");

  const handleDownload = () => {
    // Create a Blob with the code content and trigger a download
    const blob = new Blob([code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "your-code-file.js";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <h1
        style={{
          textAlign: "center",
          letterSpacing: "4px",
          fontSize: "45px",
          position: "relative",
          fontWeight: "600",
        }}
      >
<span dangerouslySetInnerHTML={{ __html: '&lt;Code Editor/&gt;' }}></span>
        <button
          style={{
            position: "absolute",
            top: "0px",
            right: "36px",
            padding: "8px",
            backgroundColor: "#1e1e1e",
            color: "#fff",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
          }}
          onClick={handleDownload}
        >
  <FileDownloadSharpIcon style={{ fontSize:45 }} />
        </button>
      </h1>
      <div style={{ marginTop: "50px" }}>
        <MonacoComponent code={code} setCode={setCode} />
      </div>
    </div>
  );
};

export default MonacoMain;
