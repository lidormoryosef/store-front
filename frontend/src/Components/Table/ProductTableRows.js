


export default function ProductTableRows({ data, onRowClick }) {
  if (!data.length) {
    return (
      <tr>
        <td colSpan="4" className="text-center text-muted">
          No products found
        </td>
      </tr>
    );
  }

  return (
    <>
      {data.map((product) => (
        <tr
          key={product.id}
          style={{ cursor: 'pointer' }}
          onClick={() => onRowClick(product)}
        >
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.type}</td>
          <td>{new Date(product.date).toLocaleDateString()}</td>
        </tr>
      ))}
    </>
  );
}
