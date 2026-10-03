import { useEffect, useState } from "react"
import AdminShell from "../components/AdminShell"
import Home from "../views/client/Home"
import ProductDetail from "../views/client/ProductDetail"
import Cart from "../views/client/Cart"
import Checkout from "../views/client/Checkout"
import Orders from "../views/client/Orders"
import AdminDashboard from "../views/admin/AdminDashboard"
import AdminProducts from "../views/admin/AdminProducts"
import AdminCategories from "../views/admin/AdminCategories"
import AdminInventory from "../views/admin/AdminInventory"
import AdminOrders from "../views/admin/AdminOrders"
import AdminPayments from "../views/admin/AdminPayments"
import AdminInvoices from "../views/admin/AdminInvoices"
import AdminUsers from "../views/admin/AdminUsers"
import { useAuthStore } from "../store/authStore"
import Login from "../views/client/Login"
import Register from "../views/client/Register"

function useRoute() {
  const [route, setRoute] = useState(window.location.pathname)

  useEffect(() => {
    const handler = () => setRoute(window.location.pathname)
    window.addEventListener("popstate", handler)

    return () => window.removeEventListener("popstate", handler)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, "", path)
    setRoute(path)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return { route, navigate }
}

function AppContent() {
  const { route, navigate } = useRoute()
  const usuario = useAuthStore((state) => state.usuario)
  const logout = useAuthStore((state) => state.logout)

  if (route === "/login") {
    return <Login navigate={navigate} />
  }

  if (route === "/registro") {
    return <Register navigate={navigate} />
  }

  if (route.startsWith("/admin")) {
    if (!usuario) {
      return <Login navigate={navigate} />
    }

    if (usuario.rol !== "ADMIN") {
      return <Home navigate={navigate} />
    }

    let page = <AdminDashboard />

    if (route === "/admin/productos") page = <AdminProducts />
    if (route === "/admin/categorias") page = <AdminCategories />
    if (route === "/admin/inventario") page = <AdminInventory />
    if (route === "/admin/pedidos") page = <AdminOrders />
    if (route === "/admin/pagos") page = <AdminPayments />
    if (route === "/admin/facturas") page = <AdminInvoices />
    if (route === "/admin/usuarios") {
      page = <AdminUsers currentAdmin={usuario} />
    }

    return (
      <AdminShell
        navigate={navigate}
        admin={usuario}
        logout={() => {
          logout()
          navigate("/")
        }}
        route={route}
      >
        {page}
      </AdminShell>
    )
  }

  if (route.startsWith("/producto/")) {
    return (
      <ProductDetail
        id={route.split("/").pop()}
        navigate={navigate}
      />
    )
  }

  if (route === "/carrito") {
    if (!usuario) return <Login navigate={navigate} />
    return <Cart navigate={navigate} />
  }

  if (route === "/checkout") {
    if (!usuario) return <Login navigate={navigate} />
    return <Checkout navigate={navigate} />
  }

  if (route === "/pedidos") {
    if (!usuario) return <Login navigate={navigate} />
    return <Orders navigate={navigate} />
  }

  return <Home navigate={navigate} />
}

export default function App() {
  return <AppContent />
}