export default function Icon({ code, color, size }) {
  return (
    <div className="material-icons-outlined" style={{ color, fontSize: size }}>
      {code}
    </div>
  );
}
