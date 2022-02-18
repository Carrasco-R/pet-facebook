export default function Icon({ code, color, size }) {
  return (
    <div
      className="material-icons-outlined"
      style={{ color, "font-size": size }}
    >
      {code}
    </div>
  );
}
