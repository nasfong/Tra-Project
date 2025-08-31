import React, { useEffect, useState } from "react";
import axios from "axios";

interface CashierProps {
  transactionId?: string;
}

const Cashier: React.FC<CashierProps> = ({ transactionId = "68b1ccdba1f6fd9d30786eea" }) => {
  const [html, setHtml] = useState<string>("Loading...");

  useEffect(() => {
    const fetchCashier = async () => {
      try {
        const response = await axios.get(
          `/payment/cashier/${transactionId}`,
        );

        setHtml(response.data);
      } catch (err) {
        console.error(err);
        setHtml("<p>Error loading cashier page</p>");
      }
    };

    fetchCashier();
  }, [transactionId]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ width: "100%", textAlign: "center" }}
    />
  );
};

export default Cashier;
