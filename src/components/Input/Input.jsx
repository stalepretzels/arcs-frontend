import './Input.css';

export function Button({ onClick, children, classes, id }) {
  return (
    <button id={id} className={`button ${classes}`} onClick={onClick}>
      {children}
    </button>
  );
}

export function IconButton({ onClick, size, icon, classes, id }) {
  return (
    <button id={id} className={`iconButton ${classes}`} onClick={onClick}>
      <ion-icon name={icon} style={{fontSize: size}}></ion-icon>
    </button>
  );
}

export function MenuIconButton({ onClick, size, icon, id }) {
  return (
    <button id={id} className="menuIconButton" onClick={onClick}>
      <ion-icon name={icon} style={{fontSize: size}}></ion-icon>
    </button>
  );
}