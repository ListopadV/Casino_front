"use client";

import backgroundImage from "@/assets/auth-background.png";
import Header from "@/components/ui/Layout/Header";
import { apiClient, clientTokenStore } from "@/shared/api/apiClient";
import { isApiError } from "@/shared/api/apiHelpers";
import { useAuthStore } from "@/shared/lib/store";
import { useRouter } from "next/navigation";
import React from "react";
import RegisterForm from "../components/RegisterForm";

const RegistrationPage: React.FC = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleRegister = async ({
    email,
    password,
    terms,
    marketing,
  }: {
    email: string;
    password: string;
    terms: boolean;
    marketing: boolean;
  }) => {
    try {
      const response = await apiClient.post<{ data: { token: string; user: { id: string; email: string } }} >("/auth/register", {
        email,
        password,
        terms,
        marketing,
      });
      const { token, user } = response.data;
      
      clientTokenStore.setAccessToken(token);
      setAuth(user);
      router.push("/");
    } catch (error) {
      if (isApiError(error)) {
        console.warn(error.data.error.message);
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

      {/* Header с нужными пропсами */}
      <Header
        isLoggedIn={false}
        onAccountClick={() => {}}
        onLogoutClick={() => {}}
      />

      {/* Контейнер для центрирования формы */}
      <main className="flex-grow flex items-center justify-center p-4">
        <RegisterForm onSubmit={handleRegister} />
      </main>
    </div>
  );
};


export default RegistrationPage;
