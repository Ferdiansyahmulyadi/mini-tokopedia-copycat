import React, { useState } from 'react';
import styles from './CheckoutForm.module.scss';

// Add type for `onSubmit` prop
interface CheckoutFormProps {
  onSubmit: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  // State to store user input
  const [name, setName] = useState(''); // Full name
  const [email, setEmail] = useState(''); // Email
  const [error, setError] = useState(''); // Error message if any

  // Function to handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Form validation: Ensure name and email are filled
    if (!name || !email) {
      setError('All fields must be filled.'); // Set error if any field is empty
      console.log('Error: All fields must be filled.');
      return;
    }

    // Email validation: Ensure email format is valid
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format.'); // Set error if email format is incorrect
      console.log('Error: Invalid email format.');
      return;
    }

    // If no errors, reset error and call onSubmit
    setError('');
    console.log('Form submitted with data:', { name, email });
    onSubmit(); // Call onSubmit function received as prop
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Form input for full name */}
        <div className={styles.formGroup}>
          <input
            type='text'
            id='name'
            value={name} // Bind input value with state name
            onChange={(e) => setName(e.target.value)} // Update state name when input changes
            className={styles.input}
            placeholder=' '
          />
          <label htmlFor='name' className={styles.label}>
            Full Name
          </label>
        </div>

        {/* Form input for email */}
        <div className={styles.formGroup}>
          <input
            type='email'
            id='email'
            value={email} // Bind input value with state email
            onChange={(e) => setEmail(e.target.value)} // Update state email when input changes
            className={styles.input}
            placeholder=' '
          />
          <label htmlFor='email' className={styles.label}>
            Email
          </label>
        </div>

        {/* Display error if any */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Submit button */}
        <button type='submit' className={styles.submitButton}>
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;

/*
Code Explanation:
State name, email, and error:

name and email are states that store user input values. Any changes to the input will update these values.
error stores the error message if any validation fails, such as if a field is empty or the email format is invalid.
Function handleSubmit:

This function handles the form submission process.
e.preventDefault() prevents the form from reloading the page when submitted.
The first validation ensures that name and email are not empty, and if they are, it sets an error and displays an error message.
The second validation checks if the entered email matches the correct email format (using regex).
If there are no errors, onSubmit() is called and console.log() prints the filled data (name and email).
Input Fields for name and email:

Each input has a value attribute bound to the state (name and email), making it a controlled component.
onChange is used to update the state when the user types.
Displaying Error:

If there is an error, the error message will be displayed below the form.
Submit Button:

When the submit button is clicked, handleSubmit is called.
Adding console.log():
console.log("Error: All fields must be filled.") will be printed if any field is empty.
console.log("Error: Invalid email format.") will be printed if the email format is incorrect.
console.log("Form submitted with data:", { name, email }) will be printed when the form is submitted with valid data.
With the addition of console.log(), you can see what happens during form validation and what data is sent when the form is successfully submitted.
*/
