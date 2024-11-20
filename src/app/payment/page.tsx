"use client";
import { useState } from "react";
import PaymentForm from "../../components/PaymentForm";
import "../globals.css";

export default function PaymentPage() {
  const [status, setStatus] = useState<string>("");

  return (
    <div className="flex-mid-container max-w-520">
      <div className="vertical-inline-flex pad-tb-20">
      <div className="vertical-inline-flex min-h-50 margin-t-40">
        <p className="t-align--c">
          {status}
        </p>
      </div>
      <PaymentForm setStatus={setStatus} />
      </div>
    </div>
  );
}
