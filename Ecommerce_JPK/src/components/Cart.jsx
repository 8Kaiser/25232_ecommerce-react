// src/components/Cart.jsx
export default function Cart({
  items = [],
  total = 0,
  onInc,
  onDec,
  onRemove,
  onClear,
}) {
  if (items.length === 0) return <p>El carrito está vacío</p>;

  return (
    <div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ flex: 1 }}>
              <strong>{item.name}</strong> — ${Number(item.price).toFixed(2)} ×{" "}
              {item.qty}
            </span>
            <div>
              <button onClick={() => onDec(item.id)}>-</button>
              <button onClick={() => onInc(item.id)} style={{ margin: "0 6px" }}>
                +
              </button>
              <button onClick={() => onRemove(item.id)} style={{ marginRight: 6 }}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <hr />
      <p>
        <strong>Total: ${Number(total).toFixed(2)}</strong>
      </p>
      <button onClick={onClear}>Vaciar carrito</button>
    </div>
  );
}
