import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("successful login", async () => {
  // Render the login form
  render(<App />);

  // Enter a valid email address and password
  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");
  emailInput.value = "john.doe@example.com";
  passwordInput.value = "password123";

  // Click the login button
  const loginButton = screen.getByRole("button", { name: /Login/i });
  loginButton.click();

  // Wait for the login to complete
  await screen.findByText("Congratulations! You have successfully Logged In!");

  // Assert that the login was successful
  expect(loginButton).toBeDisabled();
});