import "./Message.css";

export function chatMessage({ user, message }) {
    return (
        <div className="message">
            <p>{message}</p>
        </div>
    );
}