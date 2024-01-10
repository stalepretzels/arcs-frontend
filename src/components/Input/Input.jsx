import './Input.css'

export function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export function IconButton({ onClick, children, size, icon, type }) {
  return (
    <button className="iconbutton" onClick={onClick}>
      <box-icon name={icon} type={type} size={`${size}px`}>{children}</box-icon>
    </button>
  );
}
