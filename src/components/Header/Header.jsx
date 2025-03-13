import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <img src="../assets/logo.png" className="logo" />

      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div className="user-button-container">
          <UserButton />
        </div>
      </SignedIn>
    </header>
  );
}
