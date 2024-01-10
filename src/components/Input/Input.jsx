import './Input.css';
import 'boxicons';
import '../../boxicons.min.css';

export function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export function IconButton({ onClick, children, size, icon, type, color }) {
  return (
    <button className="iconButton" onClick={onClick}>
      <box-icon name={icon} type={type} size={`${size}px`} color={color}>{children}</box-icon>
    </button>
  );
}

export function MenuIconButton({ onClick, children, size, icon, type, color }) {
  return (
    <button className="menuIconButton" onClick={onClick}>
      <box-icon name={icon} type={type} size={size} color={color}>{children}</box-icon>
    </button>
  );
}