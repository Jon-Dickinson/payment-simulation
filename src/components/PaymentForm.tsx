"use client";
import React, { useState } from "react";
import styles from "./PaymentForm.module.css";
import "../app/globals.css";

interface PaymentFormProps {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ setStatus }) => {
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState([false, false, false]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const simulateStep = (
    nextStatus: string,
    message: string,
    delay: number,
    stepIndex: number
  ): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setStatus(nextStatus);
        const updatedProgress = [...progress];
        updatedProgress[stepIndex] = true;
        setProgress(updatedProgress);
        resolve();
      }, delay);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setStatus("Processing...");

    try {
      // Simulate form data submission
      await simulateStep("Submitting form data...", "Authenticating...", 2000, 0);

      // Simulate authentication
      await simulateStep("Authenticating...", "Processing payment...", 2000, 1);

      // Simulate payment processing
      await simulateStep("Payment successful!", "Payment successful!", 2000, 2);
    } catch (error) {

      setStatus("An error occurred.");
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="vertical-inline-flex">
        <div className="horizontal-inline-flex">
          {/* Step indicator circles */}
          <div className={styles.stepIndicator}>
            <div
              className={`${styles.stepCircle} ${
                progress[0] ? styles.completed : ""
              }`}
            >
              1
            </div>
            <div
              className={`${styles.stepCircle} ${
                progress[1] ? styles.completed : ""
              }`}
            >
              2
            </div>
            <div
              className={`${styles.stepCircle} ${
                progress[2] ? styles.completed : ""
              }`}
            >
              3
            </div>
          </div>
        </div>
        <div className="horizontal-inline-flex">
       
          <div 
           className={`bar ${styles.stepCircle} ${
            progress[2] ? styles.completed : ""
          }`}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className={styles.formGroup}>
          <label htmlFor="cardHolderName">Cardholder Name</label>
          <input
            type="text"
            id="cardHolderName"
            name="cardHolderName"
            value={formData.cardHolderName}
            onChange={handleChange}
            required
            disabled={isProcessing}
            className="border-1-d8d8d8"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            disabled={isProcessing}
            className="border-1-d8d8d8"
          />
        </div>


        <div className="horizontal-inline-flex">
          <div className="vertical-inline-flex pad-r-10">
          <div className={styles.formGroup}>
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            disabled={isProcessing}
            className="border-1-d8d8d8"
          />
        </div>
          </div>
          <div className="vertical-inline-flex pad-l-10">
          <div className={styles.formGroup}>
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            required
            disabled={isProcessing}
            className="border-1-d8d8d8"
          />
        </div>
          </div>
        </div>
              

      
        <div className="horizontal-inline-flex justify--flex-end">

        <button className="button" type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Submit"}
        </button>
          </div>

     
      </form>
    </div>
  );
};

export default PaymentForm;
