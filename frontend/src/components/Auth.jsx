import { useState } from "react";
import {
  HeartPulse,
  Mail,
  Lock,
  User,
  ArrowRight,
  LoaderCircle,
  AlertCircle,
  CircleCheck,
} from "lucide-react";

import { supabase } from "../lib/supabaseClient";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error("Please enter your email and password.");
      }

      if (password.length < 6) {
        throw new Error("Password must contain at least 6 characters.");
      }

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

      } else {
        if (!name.trim()) {
          throw new Error("Please enter your name.");
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name.trim(),
            },
          },
        });

        if (error) {
          throw error;
        }

        if (!data.session) {
          setSuccess(
            "Account created! Please check your email to verify your account."
          );
        } else {
          setSuccess("Account created successfully!");
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT BRAND PANEL */}

      <div className="auth-brand">

        <div className="brand-logo">
          <div className="brand-icon">
            <HeartPulse size={28} />
          </div>

          <div>
            <h1>HeartWise</h1>
            <span>Smart Heart Screening</span>
          </div>
        </div>

        <div className="auth-brand-content">

          <div className="heart-decoration">
            <HeartPulse size={110} strokeWidth={1.2} />
          </div>

          <h2>
            Understand your heart health.
            <span> One step at a time.</span>
          </h2>

          <p>
            Start with a simple lifestyle assessment and receive
            an AI-powered screening result with understandable
            insights and healthy lifestyle guidance.
          </p>

          <div className="auth-benefits">

            <div>
              <CircleCheck size={18} />
              <span>Simple lifestyle screening</span>
            </div>

            <div>
              <CircleCheck size={18} />
              <span>Explainable AI results</span>
            </div>

            <div>
              <CircleCheck size={18} />
              <span>Personalized healthy habits</span>
            </div>

          </div>

        </div>

        <p className="auth-disclaimer">
          HeartWise provides screening information and does not
          replace professional medical advice.
        </p>

      </div>


      {/* AUTH FORM */}

      <div className="auth-form-container">

        <div className="auth-card">

          <div className="mobile-logo">
            <div className="brand-icon">
              <HeartPulse size={25} />
            </div>

            <h1>HeartWise</h1>
          </div>

          <div className="auth-heading">

            <h2>
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>

            <p>
              {isLogin
                ? "Sign in to continue your heart health journey."
                : "Create an account to begin your heart health journey."}
            </p>

          </div>


          {error && (
            <div className="auth-alert error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}


          {success && (
            <div className="auth-alert success">
              <CircleCheck size={18} />
              <span>{success}</span>
            </div>
          )}


          <form onSubmit={handleSubmit}>

            {!isLogin && (
              <div className="auth-field">

                <label>Full Name</label>

                <div className="input-wrapper">

                  <User size={18} />

                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />

                </div>

              </div>
            )}


            <div className="auth-field">

              <label>Email Address</label>

              <div className="input-wrapper">

                <Mail size={18} />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />

              </div>

            </div>


            <div className="auth-field">

              <label>Password</label>

              <div className="input-wrapper">

                <Lock size={18} />

                <input
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={
                    isLogin ? "current-password" : "new-password"
                  }
                  required
                  minLength={6}
                />

              </div>

            </div>


            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >

              {loading ? (
                <>
                  <LoaderCircle className="spin" size={19} />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={19} />
                </>
              )}

            </button>

          </form>


          <div className="auth-switch">

            <span>
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>

            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setSuccess("");
              }}
            >
              {isLogin ? "Create account" : "Sign in"}
            </button>

          </div>


          <div className="auth-security">

            <Lock size={14} />

            <span>
              Your account is secured using Supabase Authentication.
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}