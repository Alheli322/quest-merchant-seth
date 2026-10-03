import { TiltCard } from "@/components/motion/tilt-card"

export default function ProductCard({ product, onOpen }) {
  return (
    <TiltCard
      max={8}
      glare
      className="product-tilt"
    >
      <article
        className="product-card"
        onClick={() => onOpen(product.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onOpen(product.id)
          }
        }}
      >
        <img
          src={product.imagen || "/images/dados-arcanos.jpg"}
          alt={product.nombre}
        />

        <div className="product-meta">
          <span className="pill">{product.categoria?.nombre}</span>

          <span className={product.stock <= 5 ? "stock low" : "stock"}>
            Stock {product.stock}
          </span>
        </div>

        <h3>{product.nombre}</h3>

        <p>
          {product.descripcion || "Producto de Quest Merchant"}
        </p>

        <div className="product-footer">
          <strong>
            ${Number(product.precio).toLocaleString("es-MX")}
          </strong>
        </div>
      </article>
    </TiltCard>
  )
}