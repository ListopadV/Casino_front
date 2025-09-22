"use client";

import backgroundImage from "@/assets/auth-background.png";
import Header from "@/components/ui/Layout/Header";
import { apiClient, clientTokenStore } from "@/shared/api/apiClient";
import { isApiError } from "@/shared/api/apiHelpers";
import { useAuthStore } from "@/shared/lib/store";
import { useRouter } from "next/navigation";
import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await apiClient.post<{ data: { token: string; user: { id: string; email: string } } }>("/auth/login", { email, password });
      const { token, user } = response.data;
      
      clientTokenStore.setAccessToken(token);
      setAuth(user);
      router.push("/");
    } catch (error) {
      if (isApiError(error)){
          console.error(error.data.error.message)
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Слой 1: Оригинальная черно-белая текстура */}
      <div
        className="absolute inset-0 z-[-2] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      ></div>

      {/* Слой 2: Темный и насыщенный красный оттенок */}
      <div className="absolute inset-0 z-[-1] bg-red-800-65"></div>
      
      {/* ИЗМЕНЕНИЕ ЗДЕСЬ: Передаем необходимые пропсы в Header */}
      <Header 
        isLoggedIn={false} 
        onAccountClick={() => {}} 
        onLogoutClick={() => {}} 
      />

      {/* Контейнер для центрирования формы */}
      <main className="flex-grow flex items-center justify-center p-4">
        <LoginForm onSubmit={handleLogin} />
      </main>
    </div>
  );
};

export default LoginPage;
