import { useState } from "react";
import { API_BASE_URL } from "./config";

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export function LoginPage(props: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const body = new URLSearchParams();
      body.append("username", username);
      body.append("password", password);

      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail ?? "Usuario o contraseña incorrectos.");
      }

      const data = (await res.json()) as LoginResponse;
      props.onLogin(data.access_token);
    } catch (err: any) {
      setError(err.message ?? "Error inesperado al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          padding: 24,
          border: "1px solid #ddd",
          borderRadius: 8,
          width: 320,
        }}
      >
        <h2>Acceso personal sanitario</h2>
        <div style={{ marginTop: 16 }}>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        {error && (
          <div style={{ marginTop: 16, color: "red" }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: 16, width: "100%" }}
        >
          {loading ? "Accediendo..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}