import { useCartStore, selectCount } from "../store/cartStore"
import { useAuthStore } from "../store/authStore"
import { useState } from "react"
import { useAvatarStore } from "../store/avatarStore"
import { Drawer } from "@/components/motion/drawer"

export default function ClientShell({
  children,
  navigate,
  categories = [],
  onCategory,
  search,
  setSearch
}) {
  const usuario = useAuthStore((state) => state.usuario)
  const logout = useAuthStore((state) => state.logout)
  const count = useCartStore(selectCount(usuario?.id))
  const [showAvatars, setShowAvatars] = useState(false)

const avatar = useAvatarStore(
  (state) => state.avatars[usuario?.id] || "dnd.svg"
)

const setAvatar = useAvatarStore((state) => state.setAvatar)

const avatarOptions = [
  ["artificer.svg", "Artífice"],
  ["barbarian.svg", "Bárbaro"],
  ["bard.svg", "Bardo"],
  ["cleric.svg", "Clérigo"],
  ["druid2.svg", "Druida"],
  ["fighter.svg", "Guerrero"],
  ["monk.svg", "Monje"],
  ["paladin.svg", "Paladín"],
  ["ranger.svg", "Explorador"],
  ["rogue.svg", "Pícaro"],
  ["sorcerer.svg", "Hechicero"],
  ["warlock.svg", "Brujo"],
  ["wizard.svg", "Mago"],
  ["book.svg", "Libro"],
  ["dagger.svg", "Daga"],
  ["dice.svg", "Dados"],
  ["dnd.svg", "D&D"]
]

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="client-shell">
      <header className="topbar">
        <button className="brand" onClick={() => navigate("/")}>
          Quest Merchant
        </button>

        <input
          className="search"
          value={search || ""}
          onChange={(e) => setSearch?.(e.target.value)}
          placeholder="Buscar manuales, dados, miniaturas..."
        />

        <div className="top-actions">
          {usuario && (
            <span className="welcome">
              Hola, {usuario.nombre}
            </span>
          )}

          <button
            className="cart-button"
            onClick={() =>
              usuario ? navigate("/carrito") : navigate("/login")
            }
          >
            🛒 Carrito ({count})
          </button>
        </div>
      </header>

      <aside className="sidebar">
        <div>
          <div className="sidebar-title">Categorías</div>

          <button
            className="side-link"
            onClick={() => onCategory?.(null)}
          >
            Todo
          </button>

          {categories.map((category) => (
            <button
              className="side-link"
              key={category.id}
              onClick={() => onCategory?.(category.id)}
            >
              {category.nombre}
            </button>
          ))}
        </div>

        <div className="sidebar-profile">
          {usuario ? (
            <>
            <div>
              <button
                className="profile-avatar"
                onClick={() => setShowAvatars(true)}
              >
                <img
                  src={`/avatars/${avatar}`}
                  alt="Avatar"
                />
              </button>

                <div>
                  <strong>{usuario.nombre}</strong>
                </div>
              </div>

              <Drawer
                open={showAvatars}
                onOpenChange={setShowAvatars}
                side="right"
                ariaLabel="Seleccionar avatar"
                className="avatar-drawer"
                backdropClassName="avatar-drawer-backdrop"
              >
                <div className="avatar-drawer-header">
                  <div>
                    <span className="eyebrow">PERSONAJE</span>
                    <h2>Elige tu clase</h2>
                  </div>

                  <button
                    className="ghost"
                    onClick={() => setShowAvatars(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="avatar-drawer-grid">
                  {avatarOptions.map(([file, name]) => (
                    <button
                      key={file}
                      className={
                        avatar === file
                          ? "avatar-drawer-option selected"
                          : "avatar-drawer-option"
                      }
                      onClick={() => {
                        setAvatar(usuario.id, file)
                        setShowAvatars(false)
                      }}
                    >
                      <img src={`/avatars/${file}`} alt={name} />
                      <span>{name}</span>
                    </button>
                  ))}
                </div>
              </Drawer>

              <button
                className="side-link"
                onClick={() => navigate("/pedidos")}
              >
                Mis pedidos
              </button>

              {usuario.rol === "ADMIN" && (
                <button
                  className="side-link"
                  onClick={() => navigate("/admin")}
                >
                  Panel administrador
                </button>
              )}

              <button
                className="side-link logout-button"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              className="side-link"
              onClick={() => navigate("/login")}
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </aside>

      <main className="content">
        {children}
      </main>

      <footer className="footer">
        Quest Merchant · Tu próxima aventura comienza aquí
      </footer>
    </div>
  )
}