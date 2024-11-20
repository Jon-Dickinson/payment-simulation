import "../globals.css";

export default function About() { return ( 
<div className="flex-mid-container max-w-768">
  <div className="vertical-inline-flex pad-tb-20">
   
    <p className="vertical-inline-flex heading"> PaymentPage Component </p>
    <p> This component is responsible for rendering the payment form and managing interactions. Display the payment form PaymentForm component. Handle navigation to other pages e.g., if the user is authenticated, show payment options. Manage high-level flow success/failure, redirection. </p>

    <pre className="code-block">
<code>

{`
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

`}
</code>
      </pre>

    <p className="vertical-inline-flex heading"> PaymentForm Component </p>
    <p> This is the core component for handling payment details input. Collect the payment form data and perform form validation. Trigger the payment submission process when the user submits the form. </p>

    <p className="vertical-inline-flex heading"> FormValidation Component </p>
    <p> This component is responsible for validating the form data before submission. Check whether the card number, expiry date, and CVV are valid. Display appropriate error messages for invalid fields. Use useState for error state and trigger visual feedback for validation issues. </p>

    <pre className="code-block">
<code>

{`
export default function FormValidation({ cardNumber, expiryDate, cvv }) {
  const cardRegex = /^[0-9]{16}$/;
  const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
  const cvvRegex = /^[0-9]{3}$/;

  return (
    cardRegex.test(cardNumber) &&
    expiryRegex.test(expiryDate) &&
    cvvRegex.test(cvv)
  );
}


`}
</code>
      </pre>

    <p className="vertical-inline-flex heading"> StatusIndicator Component </p>
    <p> This component visualizes the current status of the payment process.
      </p>
      <p>
      Step 1: Payment Data Sent
      </p>
      <p>
      Step 2: Payment Processing
        </p>
        <p>
        Step 3: Payment Successful
        </p>
      
      <p>Show the status of each step e.g., step 1, step 2, step 3. Update the UI to show the current step and indicate if it was successful. Use props to get the current step and status and render appropriate styles and messages. </p>
      <pre className="code-block">
<code>

{`
import styles from './StatusIndicator.module.css';

export default function StatusIndicator({ status }) {
  const messages = {
    idle: 'Waiting for user input...',
    processing: 'Processing payment...',
    success: 'Payment successful!',
    error: 'Payment failed. Please try again.',
  };

  return (
    <div className={styles.statusIndicator}>
      <p>Status: {messages[status]}</p>
    </div>
  );
}

`}
</code>
      </pre>

    <p className="vertical-inline-flex heading"> PaymentAPI Component </p>
    <p> This component handles the API requests for processing the payment. Send the payment data to a server or payment processor e.g., Stripe, PayPal. Handle success or failure responses from the payment gateway. Could use axios or fetch to send the payment data to the API. Return the result success/failure back to the parent component e.g., PaymentForm or PaymentPage. </p>

    <pre className="code-block">
<code>

{`
export default async function PaymentAPI(formData) {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return true; // Simulate success
  } catch (error) {
    console.error('Payment API Error:', error);
    return false;
  }
}

`}
</code>
      </pre>

    <p className="vertical-inline-flex heading"> Auth Component </p>
    <p> Handles authentication if the payment requires the user to log in first. Check if the user is authenticated or not. Show login form or redirect to login page if the user is not authenticated. Use context or hooks useState, useEffect to manage user authentication state. </p>
    <pre className="code-block">

<code>

{`
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Auth({ children }) {
  const router = useRouter();
  const isAuthenticated = true;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : null;
}`}
</code>
</pre>

    <p className="vertical-inline-flex heading"> Confirmation Component </p>
    <p> After payment, show a confirmation message or failure message. Display a message about the payment outcome e.g., “Payment Successful” or “Payment Failed”. Provide options like “Return to Home” or “View Receipt.” It can also redirect the user to a success page or log the payment in their account. </p>

    <pre className="code-block">
<code>

{`
export default function Confirmation() {
  return (
    <div>
      <h2>Payment Confirmed!</h2>
      <p>Thank you for your payment.</p>
      <button onClick={() => (window.location.href = '/')}>Return Home</button>
    </div>
  );
}
`}
</code>
      </pre>
  </div>
</div> ); }