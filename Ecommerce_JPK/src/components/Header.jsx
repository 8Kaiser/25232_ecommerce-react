export default function Header({ count = 0 }) {
  return (
    <header>
      <h1>Talento Tech Merch </h1>
      <div style={{ opacity: 0.7 }}>
        {count > 0 ? `🛒 ${count} ítem(s)` : "🛒 vacío"}
      </div>
    </header>
  );
}

