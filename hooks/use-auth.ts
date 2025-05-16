// ✅ src/hooks/useAuth.ts
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import jwtDecode from "jwt-decode";

interface Credentials {
  email: string;
  password: string;
}

interface RegisterData {
  full_name: string;
  email: string;
  password: string;
  role: "STUDENT" | "TUTOR" | "BOTH";
}

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: Credentials) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) throw new Error("Error al iniciar sesión");

      const { access_token } = await res.json();
      localStorage.setItem("token", access_token);


      const profileRes = await fetch("http://localhost:3000/profile/me", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const profile = await profileRes.json();

 
      if (profile.role === "STUDENT") {
        router.push("/dashboard/student");
      } else {
        router.push("/dashboard/tutor");
      }
    } catch (err) {
      setError("Credenciales inválidas o error de servidor");
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al registrar usuario");

      const { access_token } = await res.json();
      localStorage.setItem("token", access_token);

      // ✅ Obtener perfil
      const profileRes = await fetch("http://localhost:3000/profile/me", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const profile = await profileRes.json();

      // ✅ Redirigir según rol
      if (profile.role === "STUDENT") {
        router.push("/onboarding/student");
      } else {
        router.push("/onboarding/tutor");
      }
    } catch (err) {
      setError("Error al crear cuenta");
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loading, error };
}
