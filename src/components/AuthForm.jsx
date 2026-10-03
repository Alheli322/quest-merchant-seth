import { useState } from "react"
import { mutateGraphQL } from "../lib/apollo"
import { M_LOGIN, M_REGISTRAR_USUARIO } from "../lib/queries"
import { useAuthStore } from "../store/authStore"
import { Input } from "@/components/motion/input"

export default function AuthForm({ mode = "login", onSuccess }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nombre, setNombre] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const loginStore = useAuthStore((state) => state.login)
    const isRegister = mode === "register"

    const submit = async (event) => {
        event.preventDefault()
        setError("")

        if (isRegister && password !== confirmPassword) {
            setError("Las contraseñas no coinciden")
            return
        }

        setLoading(true)

        try {
            let response

            if (isRegister) {
                const result = await mutateGraphQL(M_REGISTRAR_USUARIO, {
                    datos: {
                        nombre,
                        email,
                        password
                    }
                })

                response = result.registrarUsuario
            } else {
                const result = await mutateGraphQL(M_LOGIN, {
                    email,
                    password
                })

                response = result.login
            }

            if (!response.ok) {
                throw new Error(response.mensaje)
            }

            loginStore(response.usuario, response.token)

            if (onSuccess) {
                onSuccess(response.usuario)
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="auth-form" onSubmit={submit}>
            <div className="auth-heading">
            <h1>{isRegister ? "Crear cuenta" : "Iniciar sesión"}</h1>
            <p>
                {isRegister
                ? "Crea tu cuenta y comienza tu próxima aventura."
                : "Continúa tu aventura en Quest Merchant."}
            </p>
            </div>

            {isRegister && (
            <Input
                label="Nombre"
                required
                value={nombre}
                onChange={setNombre}
                placeholder="Tu nombre"
            />
            )}

            <Input
                label="Correo"
                required
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="aventurero@correo.com"
            />

            <Input
                label="Contraseña"
                required
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="••••••••"
                />

            {isRegister && (
                <Input
                    label="Confirmar contraseña"
                    required
                    type="password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="••••••••"
                    error={
                    confirmPassword && password !== confirmPassword
                        ? "Las contraseñas no coinciden"
                        : false
                    }
                    success={
                    Boolean(confirmPassword) &&
                    password === confirmPassword
                    }
                />
            )}

            {error && <div className="inline-error">{error}</div>}

            <button className="auth-submit" disabled={loading}>
            {loading
                ? "Procesando..."
                : isRegister
                ? "Crear cuenta"
                : "Iniciar sesión"}
            </button>
        </form>
    )
}