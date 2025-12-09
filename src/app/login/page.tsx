"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.status === 1) {
        // Redirect based on role
        if (data.role === "admin") router.push("/admin");
        else router.push("/user");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong, try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A6C85",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px 35px",
          borderRadius: "16px",
          maxWidth: "420px",
          width: "100%",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#0A6C85",
            fontWeight: "600",
          }}
        >
          Login
        </h2>

        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: "15px",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "14px", fontWeight: "500" }}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "6px",
              }}
              required
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "18px", position: "relative" }}>
            <label style={{ fontSize: "14px", fontWeight: "500" }}>
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "6px",
                paddingRight: "40px",
              }}
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "40px",
                cursor: "pointer",
                fontSize: "13px",
                color: "#0A6C85",
                fontWeight: "600",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Forgot Password */}
          <div style={{ textAlign: "right", marginBottom: "18px" }}>
            <a
              href="/forgot-password"
              style={{ color: "#0A6C85", fontSize: "14px", fontWeight: "500" }}
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#0A6C85",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
