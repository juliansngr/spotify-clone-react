import "./FeelingLuckyButton.css";

export default function FeelingLuckyButton({ onClick }) {
  return (
    <button className="feeling-lucky-button" onClick={onClick}>
      Feelin' lucky today?
    </button>
  );
}
