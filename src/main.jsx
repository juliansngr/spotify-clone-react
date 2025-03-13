import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Track from "./Track.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AudioPlayerProvider } from "../utils/AudioPlayerContext/AudioPlayerContext";

// Clerk Authentication
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// React Router Setup
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  // { path: "/track", element: <Track /> },
  { path: "/track/:id", element: <Track /> },
  { path: "*", element: <NotFoundPage /> },
  { path: "/track/*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AudioPlayerProvider>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/"
        appearance={{
          baseTheme: dark,
        }}
      >
        {/* <App /> */}
        <RouterProvider router={router} />
      </ClerkProvider>
    </AudioPlayerProvider>
  </StrictMode>
);
