import "./ControlButton.css";

export default function ControlButton({ buttonImage, onClick, disabled }) {
  return (
    <button
      className={`control-button ${
        disabled ? "control-button-disabled" : null
      }`}
      onClick={onClick}
      disabled={disabled ? true : false}
    >
      {buttonImage}
    </button>
  );
}
