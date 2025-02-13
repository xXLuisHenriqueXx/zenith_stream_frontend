import { useState, useEffect } from "react";

import { tokenService } from "../services/tokenService";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    validateToken();
  }, []);

  async function validateToken() {
    try {
      const { status, data } = await tokenService.validateTokenRoute();

      setIsAuthenticated(status === 200 && data.success);
      setIsAdmin(data.role === "ROLE_ADMIN");
    } catch {
      setIsAuthenticated(false);
    }
  }

  async function logout() {
    await tokenService.logout();
    setIsAuthenticated(false);
  }

  return {
    isAuthenticated,
    isAdmin,
    validateToken,
    logout
  };
}
