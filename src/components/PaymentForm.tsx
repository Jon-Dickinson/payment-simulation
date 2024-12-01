"use client";

import React, { useState } from "react";
import styles from "./PaymentForm.module.css";
import FormValidation from "../utils/formValidation";

interface PaymentFormProps {
  setPaymentStatus: React.Dispatch<React.SetStateAction<string>>;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

const PaymentForm: React.FC<PaymentFormProps> = () => {
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState([false, false, false]);
  const [expiryDateValid, setExpiryDateValid] = useState(true);

  // TODO: use step 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [step, setStep] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // MM/YY format
    if (name === "expiryDate") {
      const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/; 
      setExpiryDateValid(expiryRegex.test(value));
    }
  };

  const simulateStep = (
    nextStatus: string,
    message: string,
    delay: number,
    stepIndex: number
  ): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setPaymentStatus(nextStatus);
        const updatedProgress = [...progress];
        updatedProgress[stepIndex] = true;
        setProgress(updatedProgress);
        setStep(stepIndex + 1);
        resolve();
      }, delay);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const { cardNumber, expiryDate, cvv } = formData;
  
    const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    if (!expiryRegex.test(expiryDate)) {
      setExpiryDateValid(false);
      setPaymentStatus("Invalid expiry date. Please check your input.");
      return;
    }
  
    if (!FormValidation({ cardNumber, expiryDate, cvv })) {
      setPaymentStatus("Invalid payment details. Please check your inputs.");
      return;
    }
  
    setIsProcessing(true);
    setPaymentStatus("Processing...");
  
    try {
      // Simulate form data submission
      await simulateStep("Submitting form data...", "Authenticating...", 2000, 0);
  
      // Simulate authentication
      await simulateStep("Authenticating...", "Processing payment...", 2000, 1);
  
      // Simulate payment processing
      await simulateStep("Payment successful!", "Payment successful!", 2000, 2);
  
      // Mock API call
      const mockApiResponse = await new Promise<ApiResponse>((resolve) => {
        setTimeout(() => {
 
          resolve({ success: true, message: "Payment processed successfully!" });
        }, 3000);
      });
  
      if (mockApiResponse.success) {
        setPaymentStatus(mockApiResponse.message);
        
        setTimeout(() => {
          resetForm();
          resetStepIndicators();
        }, 2000);
        
      } else {
        setPaymentStatus("Payment failed. Please try again.");
      }
    } catch (error) {
      setPaymentStatus("An error occurred.");
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      cardHolderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });
    setExpiryDateValid(true);
    setPaymentStatus('');
  };
  
  const resetStepIndicators = () => {
    setStep(0);
    setProgress([false, false, false]);
  };

  return (
    <div className="payment-container">
      <div className="vertical-inline-flex">
        <div className="vertical-inline-flex min-h-50 margin-t-40">
          <p className="t-align--c">
            {paymentStatus}
          </p>
        </div>
        <div className="horizontal-inline-flex">
          <div className={styles.stepIndicator}>
            <div
              className={`${styles.stepCircle} ${progress[0] ? styles.completed : ""}`}
            >
              1
            </div>
            <div
              className={`${styles.stepCircle} ${progress[1] ? styles.completed : ""}`}
            >
              2
            </div>
            <div
              className={`${styles.stepCircle} ${progress[2] ? styles.completed : ""}`}
            >
              3
            </div>
          </div>
        </div>
        <div className="horizontal-inline-flex">
          <div
            className={`bar ${progress[2] ? styles.completed : ""}`}
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
            className="border-2-d2d2d2"
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
            className="border-2-d2d2d2"
            maxLength={16}
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
                className={`border-2-d2d2d2 ${expiryDateValid ? "" : "border-2-red"}`}
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
                className="border-2-d2d2d2"
                maxLength={3}
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
