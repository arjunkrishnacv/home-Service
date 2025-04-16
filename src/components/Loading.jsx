import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

const LoadingButton = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    // Simulate an async operation (e.g., API call)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Button variant="primary" onClick={handleClick} disabled={loading}>
      {loading ? <Spinner as="span" animation="border" size="sm" role="status" /> : "Click Me"}
    </Button>
  );
};

export default LoadingButton;
