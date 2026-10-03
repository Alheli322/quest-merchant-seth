import AuthForm from "../../components/AuthForm"

export default function Login({ navigate }) {
  return (
    <div className="auth-screen">
      <div className="auth-card">
        <AuthForm
          mode="login"
          onSuccess={() => navigate("/")}
        />

        <div className="auth-switch">
          <span>¿Aún no tienes cuenta?</span>

          <button
            className="ghost"
            onClick={() => navigate("/registro")}
          >
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  )
}