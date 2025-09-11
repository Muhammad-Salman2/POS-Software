import React, { useEffect, useState } from "react";

const ExternalScannerHandler = ({ onScan }) => {
  const [scanBuffer, setScanBuffer] = useState("");
  const [scanTimeout, setScanTimeout] = useState(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Clear buffer if too much time passed between keystrokes
      if (scanTimeout) clearTimeout(scanTimeout);

      // If Enter is pressed, process the barcode
      if (e.key === "Enter" && scanBuffer.length > 0) {
        onScan(scanBuffer);
        setScanBuffer("");
        return;
      }

      // Ignore modifier keys and non-character keys
      if (e.key.length === 1) {
        setScanBuffer((prev) => prev + e.key);
      }

      // Set timeout to clear buffer if no activity
      const timeout = setTimeout(() => {
        setScanBuffer("");
      }, 100);

      setScanTimeout(timeout);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      if (scanTimeout) clearTimeout(scanTimeout);
    };
  }, [scanBuffer, scanTimeout, onScan]);

  return null;
};

export default ExternalScannerHandler;
