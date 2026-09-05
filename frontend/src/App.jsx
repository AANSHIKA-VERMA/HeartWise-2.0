import { useEffect, useState } from "react";

import {
  HeartPulse,
  LogOut,
  UserRound,
  Activity,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

import { supabase } from "./lib/supabaseClient";
import Auth from "./components/Auth";

import "./index.css";


function Dashboard({ user, onLogout }) {

  const [activeSection, setActiveSection] = useState("dashboard");

  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "there";


  const handleLogout = async () => {
    await onLogout();
  };


  return (
    <div className="app-shell">

      {/* NAVBAR */}

      <header className="navbar">

        <div className="navbar-brand">

          <div className="brand-icon small">
            <HeartPulse size={22} />
          </div>

          <div>
            <strong>HeartWise</strong>
            <span>Smart Heart Screening</span>
          </div>

        </div>


        <nav className="navbar-links">

          <button
            className={activeSection === "dashboard" ? "active" : ""}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={activeSection === "assessment" ? "active" : ""}
            onClick={() => setActiveSection("assessment")}
          >
            Assessment
          </button>

        </nav>


        <div className="navbar-user">

          <div className="user-avatar">
            <UserRound size={18} />
          </div>

          <span>{userName}</span>

          <button
            className="logout-button"
            onClick={handleLogout}
            title="Sign out"
          >
            <LogOut size={18} />
          </button>

        </div>

      </header>


      {/* MAIN */}

      <main className="dashboard-main">

        {activeSection === "dashboard" && (
          <>

            {/* HERO */}

            <section className="dashboard-hero">

              <div>

                <span className="eyebrow">
                  YOUR HEART HEALTH JOURNEY
                </span>

                <h1>
                  Welcome, {userName}.
                  <br />
                  <span>Let's take care of your heart.</span>
                </h1>

                <p>
                  Start with a simple lifestyle screening.
                  Based on your result, HeartWise may guide you
                  through a more detailed clinical assessment.
                </p>

                <button
                  className="primary-button"
                  onClick={() => setActiveSection("assessment")}
                >
                  Start Lifestyle Assessment
                  <ArrowRight size={18} />
                </button>

              </div>


              <div className="hero-heart">

                <div className="heart-circle">

                  <HeartPulse size={105} strokeWidth={1.3} />

                </div>

              </div>

            </section>


            {/* HOW IT WORKS */}

            <section className="dashboard-section">

              <div className="section-heading">

                <span className="eyebrow">
                  HOW IT WORKS
                </span>

                <h2>
                  A simple two-stage screening journey
                </h2>

              </div>


              <div className="journey-grid">

                <JourneyCard
                  number="01"
                  icon={<Activity size={25} />}
                  title="Lifestyle Screening"
                  text="Start with everyday factors such as activity, BMI, smoking and diet."
                  active
                />

                <JourneyCard
                  number="02"
                  icon={<ShieldCheck size={25} />}
                  title="Detailed Assessment"
                  text="If appropriate, continue with additional clinical health measurements."
                />

                <JourneyCard
                  number="03"
                  icon={<HeartPulse size={25} />}
                  title="Understand Your Result"
                  text="See the factors that influenced the model and practical lifestyle guidance."
                />

              </div>

            </section>


            {/* IMPORTANT NOTICE */}

            <section className="notice-card">

              <ShieldCheck size={22} />

              <div>

                <strong>Screening, not diagnosis</strong>

                <p>
                  HeartWise is designed to provide an educational
                  risk screening experience. Results should not be
                  used as a substitute for professional medical advice.
                </p>

              </div>

            </section>

          </>
        )}


        {activeSection === "assessment" && (
          <AssessmentStart
            onBack={() => setActiveSection("dashboard")}
          />
        )}

      </main>

    </div>
  );
}


/* ================= JOURNEY CARD ================= */

function JourneyCard({
  number,
  icon,
  title,
  text,
  active = false,
}) {

  return (
    <div className={`journey-card ${active ? "active" : ""}`}>

      <div className="journey-number">
        {number}
      </div>

      <div className="journey-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

      <ChevronRight size={18} className="journey-arrow" />

    </div>
  );
}


/* ================= ASSESSMENT START ================= */

function AssessmentStart({ onBack }) {

  return (
    <section className="assessment-start">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Dashboard
      </button>


      <div className="assessment-header">

        <span className="eyebrow">
          STAGE 1
        </span>

        <h1>Lifestyle Assessment</h1>

        <p>
          Answer a few simple questions about your everyday
          lifestyle. Your responses will be used by the HeartWise
          screening model.
        </p>

      </div>


      <div className="assessment-placeholder">

        <HeartPulse size={45} />

        <h2>Lifestyle assessment starts here</h2>

        <p>
          The lifestyle questionnaire will be connected to
          the FastAPI prediction endpoint next.
        </p>

      </div>

    </section>
  );
}


/* ================= APP ================= */

export default function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    let mounted = true;


    const loadSession = async () => {

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }

    };


    loadSession();


    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {

        setUser(session?.user ?? null);
        setLoading(false);

      }
    );


    return () => {

      mounted = false;

      subscription.unsubscribe();

    };

  }, []);


  const handleLogout = async () => {

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error);
      return;
    }

    setUser(null);
  };


  if (loading) {

    return (
      <div className="app-loading">

        <div className="loading-heart">
          <HeartPulse size={35} />
        </div>

        <p>Loading HeartWise...</p>

      </div>
    );

  }


  if (!user) {
    return <Auth />;
  }


  return (
    <Dashboard
      user={user}
      onLogout={handleLogout}
    />
  );
}