export default function FormValidation({
  cardNumber,
  expiryDate,
  cvv,
}: {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}): boolean {
  const cardRegex = /^[0-9]{16}$/;
  const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
  const cvvRegex = /^[0-9]{3}$/;

  return (
    cardRegex.test(cardNumber) &&
    expiryRegex.test(expiryDate) &&
    cvvRegex.test(cvv)
  );
}