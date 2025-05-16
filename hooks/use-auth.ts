// src/hooks/useAuth.ts
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

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

      // ✅ Obtener el perfil
      const profileRes = await fetch("http://localhost:3000/profile/me", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const profile = await profileRes.json();

      // ✅ Redirigir según rol
      if (profile.user && profile.user.role === "STUDENT") {
        router.push("/dashboard/student");
      } else if (
        profile.user &&
        (profile.user.role === "TUTOR" || profile.user.role === "BOTH")
      ) {
        router.push("/dashboard/tutor");
      } else {
        // Fallback o manejo de error si el rol no está o es inesperado
        console.warn(
          `Rol de usuario no determinado o inesperado en login: ${profile.user?.role}. Redirigiendo a dashboard general o login.`
        );
        // router.push("/"); // O a una página de error/login
        // Por ahora, para mantener un comportamiento similar al anterior si solo hay dos dashboards:
        router.push("/dashboard/tutor"); // O considera un dashboard general
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

      const responseData = await res.json(); // Guardamos la respuesta completa
      console.log(
        "Respuesta completa del backend (/auth/register):",
        responseData
      ); // Logueamos la respuesta completa

      const { access_token } = responseData; // Intentamos desestructurar como antes
      localStorage.setItem("token", access_token);

      // Decodificar token para inspección (opcionalmente usar su rol si es fiable)
      let decodedTokenRole: string | undefined;
      console.log("Token a decodificar (valor):", access_token);
      console.log("Token a decodificar (tipo):", typeof access_token);
      try {
        const decoded: { role?: string; [key: string]: any } =
          jwtDecode(access_token);
        decodedTokenRole = decoded.role;
      } catch (e) {
        console.error("Error decodificando token:", e);
      }

      // ✅ Obtener perfil
      const profileRes = await fetch("http://localhost:3000/profile/me", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const profile = await profileRes.json();

      console.log("Rol enviado al registrar:", data.role);
      console.log("Rol en token JWT decodificado:", decodedTokenRole);
      // Accedemos a profile.user.role para el log y la lógica
      console.log("Rol obtenido de /profile/me:", profile.user?.role);

      // ✅ Redirigir según rol del perfil (fuente principal de verdad)
      if (
        profile.user &&
        (profile.user.role === "STUDENT" || profile.user.role === "BOTH")
      ) {
        router.push("/onboarding/student");
      } else if (profile.user && profile.user.role === "TUTOR") {
        router.push("/onboarding/tutor");
      } else {
        // Manejo para roles inesperados o si se necesita una lógica diferente
        console.warn(
          `Rol de perfil no manejado explícitamente para onboarding: ${profile.user?.role}. Redirigiendo a /onboarding/student por defecto.`
        );
        router.push("/onboarding/student"); // O a una página de error/dashboard general si es preferible
      }
    } catch (err) {
      console.error("Error en la función de registro:", err);
      setError("Error al crear cuenta. Revisa la consola para más detalles.");
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loading, error };
}
