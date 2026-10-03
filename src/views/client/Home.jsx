import { useState } from "react"
import ClientShell from "../../components/ClientShell"
import ProductCard from "../../components/ProductCard"
import { ErrorBox, Loading } from "../../components/Ui"
import { Q_CATALOGO } from "../../lib/queries"
import { useApi } from "../../lib/useApi"
import { ScrollReveal } from "@/components/motion/scroll-reveal"

export default function Home({ navigate }) {
    const [search, setSearch] = useState("")
    const [categoryId, setCategoryId] = useState(null)

    const { data, loading, error, reload } = useApi(
        Q_CATALOGO,
        { busqueda: search || null, categoriaId: categoryId },
        [search, categoryId]
    )

    return (
        <ClientShell
            navigate={navigate}
            categories={data?.categorias || []}
            onCategory={setCategoryId}
            search={search}
            setSearch={setSearch}
        >
            <section className="hero">
                <div>
                    <span className="eyebrow">QUEST MERCHANT</span>
                    <h1>Equipa la próxima aventura.</h1>
                    <p>
                        Manuales, dados, accesorios y miniaturas para jugadores y Dungeon Masters.
                    </p>
                </div>

                <div className="hero-rune">D20</div>
            </section>

            <div className="section-heading">
                <div>
                    <span className="eyebrow">CATÁLOGO</span>

                    <h2>
                        {categoryId
                            ? data?.categorias?.find(
                                (item) => item.id === categoryId
                            )?.nombre
                            : "Todos los productos"}
                    </h2>
                </div>

                <span>{data?.productos?.length || 0} resultados</span>
            </div>

            {loading && <Loading />}

            {error && <ErrorBox message={error} retry={reload} />}

            {!loading && !error && (
                <div className="product-grid">
                    {(data?.productos || []).map((product, index) => (
                        <ScrollReveal
                        key={product.id}
                        delay={index * 0.08}
                        y={20}
                        blur={6}
                        >
                        <ProductCard
                            product={product}
                            onOpen={(id) => navigate(`/producto/${id}`)}
                        />
                        </ScrollReveal>
                    ))}
                    </div>
            )}
        </ClientShell>
    )
}