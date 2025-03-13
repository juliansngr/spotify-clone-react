import "./ControlButton.css";

export default function ControlButton({
  buttonImage,
  onClick,
  disabled,
  className: extraClass,
}) {
  return (
    <button
      className={`control-button ${
        disabled ? "control-button-disabled" : null
      } ${extraClass}`}
      onClick={onClick}
      disabled={disabled ? true : false}
    >
      {buttonImage}
    </button>
  );
}
