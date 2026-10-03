import AuthForm from "../../components/AuthForm"

export default function Register({ navigate }) {
  return (
    <div className="auth-screen">
      <div className="auth-card">
        <AuthForm
          mode="register"
          onSuccess={() => navigate("/")}
        />

        <div className="auth-switch">
          <span>¿Ya tienes cuenta?</span>

          <button
            className="ghost"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  )
}