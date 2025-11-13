export default function Admin() {
    return (
      <div style={{ padding: 24 }}>
        <h2>Panel de Administración</h2>
        <p>Bienvenido al área privada del sistema.</p>
  
        <section style={{ marginTop: 16 }}>
          <h3>Resumen rápido</h3>
          <ul>
            <li>Total de productos activos: 5</li>
            <li>Ventas del mes: $1.250.000</li>
            <li>Usuarios registrados: 12</li>
          </ul>
        </section>
      </div>
    );
  }
  