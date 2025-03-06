import "./ControlButton.css";

export default function ControlButton({ buttonImage, onClick }) {
  return (
    <button className="control-button" onClick={onClick}>
      {buttonImage}
    </button>
  );
}
