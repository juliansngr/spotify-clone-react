import { Link } from "react-router-dom";
import Header from "./components/Header/Header";

import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <div>
        <h2>Couldn't find what you were looking for!</h2>
        <Link to={"/"}>
          <button className="not-found__button">Go back Home</button>
        </Link>
      </div>
    </>
  );
}
