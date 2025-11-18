// src/components/Cart.jsx

export default function Cart({
  items = [],
  total = 0,
  onInc,
  onDec,
  onRemove,
  onClear
}) {
  return (
    <div className="cart-wrapper">
      
      <div className="cart-panel">
        <h2>Carrito de compras</h2>

        {items.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />

                <h3>{item.name}</h3>
                <p>
                  ${item.price.toLocaleString()} × {item.qty}
                </p>

                <div style={{ marginTop: "8px" }}>
                  <button onClick={() => onDec(item.id)}>-</button>
                  <button onClick={() => onInc(item.id)}>+</button>
                  <button onClick={() => onRemove(item.id)}>Eliminar</button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              Total: ${total.toLocaleString()}
            </div>

            <button onClick={onClear}>Vaciar carrito</button>
          </>
        )}
      </div>
    </div>
  );
}
