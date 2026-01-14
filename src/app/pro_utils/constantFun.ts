export const logout = (type: "user" | "admin" = "user") => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    localStorage.removeItem("role");

    sessionStorage.clear();

    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    window.location.href = type === "admin" ? "/admin-login" : "/login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
