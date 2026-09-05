
import { useEffect, useState } from "react";

import {
  HeartPulse,
  LogOut,
  UserRound,
  Activity,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  LoaderCircle,
  Stethoscope,
} from "lucide-react";

import { supabase } from "./lib/supabaseClient";
import Auth from "./components/Auth";

import "./index.css";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";


const AGE_GROUPS = [
  { value: 1, range: "18–24 years" },
  { value: 2, range: "25–29 years" },
  { value: 3, range: "30–34 years" },
  { value: 4, range: "35–39 years" },
  { value: 5, range: "40–44 years" },
  { value: 6, range: "45–49 years" },
  { value: 7, range: "50–54 years" },
  { value: 8, range: "55–59 years" },
  { value: 9, range: "60–64 years" },
  { value: 10, range: "65–69 years" },
  { value: 11, range: "70–74 years" },
  { value: 12, range: "75–79 years" },
  { value: 13, range: "80+ years" },
];

function App() {

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };

  }, []);


  const handleLogout = async () => {
    await supabase.auth.signOut();
  };


  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-heart">
          <HeartPulse size={30} />
        </div>
        <span>Loading HeartWise...</span>
      </div>
    );
  }


  if (!session) {
    return <Auth />;
  }


  return (
    <Dashboard
      user={session.user}
      onLogout={handleLogout}
    />
  );
}


function Dashboard({ user, onLogout }) {

  const [activeSection, setActiveSection] =
    useState("dashboard");

  const [stage, setStage] =
    useState("start");

  const [lifestyleResult, setLifestyleResult] =
    useState(null);

  const [clinicalResult, setClinicalResult] =
    useState(null);


  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "there";


  const startAssessment = () => {

    setActiveSection("assessment");
    setStage("lifestyle");
    setLifestyleResult(null);
    setClinicalResult(null);

  };


  const resetAssessment = () => {

    setStage("lifestyle");
    setLifestyleResult(null);
    setClinicalResult(null);

  };


  return (
    <div className="app-shell">

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
            className={
              activeSection === "dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("dashboard")
            }
          >
            Dashboard
          </button>

          <button
            className={
              activeSection === "assessment"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("assessment")
            }
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
            onClick={onLogout}
            title="Sign out"
          >
            <LogOut size={18} />
          </button>

        </div>

      </header>


      <main className="dashboard-main">

        {activeSection === "dashboard" && (

          <DashboardHome
            userName={userName}
            onStart={startAssessment}
          />

        )}


        {activeSection === "assessment" && (

          <AssessmentFlow
            stage={stage}
            setStage={setStage}
            lifestyleResult={lifestyleResult}
            setLifestyleResult={setLifestyleResult}
            clinicalResult={clinicalResult}
            setClinicalResult={setClinicalResult}
            onBack={() =>
              setActiveSection("dashboard")
            }
            onReset={resetAssessment}
          />

        )}

      </main>

      <footer className="heartwise-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="/heartwise-logo.svg"
                alt="HeartWise logo"
              />
            </div>
            <span>HeartWise</span>
          </div>

          <p className="footer-copy">
            © {new Date().getFullYear()} HeartWise. All rights reserved.
          </p>

          <p className="footer-made">
            Made with <span aria-label="love">♥</span> by Aanshika Verma
          </p>
        </div>
      </footer>

    </div>
  );
}


function DashboardHome({
  userName,
  onStart,
}) {

  return (
    <>

      <section className="dashboard-hero">

        <div>

          <span className="eyebrow">
            YOUR HEART HEALTH JOURNEY
          </span>

          <h1>
            Welcome, {userName}.
            <br />
            <span>
              Let's take care of your heart.
            </span>
          </h1>

          <p>
            Start with a simple lifestyle screening.
            Based on your result, HeartWise may guide
            you through a more detailed clinical assessment.
          </p>

          <button
            className="primary-button"
            onClick={onStart}
          >
            Start Lifestyle Assessment
            <ArrowRight size={18} />
          </button>

        </div>


        <div className="hero-heart">

          <div className="heart-circle">
            <HeartPulse
              size={105}
              strokeWidth={1.3}
            />
          </div>

        </div>

      </section>


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
            icon={<Stethoscope size={25} />}
            title="Clinical Assessment"
            text="If appropriate, continue with additional clinical health measurements."
          />

          <JourneyCard
            number="03"
            icon={<HeartPulse size={25} />}
            title="Understand Your Result"
            text="See model-influencing factors and practical healthy-lifestyle guidance."
          />

        </div>

      </section>


      <section className="notice-card">

        <ShieldCheck size={22} />

        <div>

          <strong>
            Screening, not diagnosis
          </strong>

          <p>
            HeartWise provides an educational screening
            experience. Results should not be used as a
            substitute for professional medical advice.
          </p>

        </div>

      </section>

    </>
  );
}


function JourneyCard({
  number,
  icon,
  title,
  text,
  active,
}) {

  return (
    <div
      className={
        `journey-card ${active ? "journey-active" : ""}`
      }
    >

      <div className="journey-top">

        <span className="journey-number">
          {number}
        </span>

        <div className="journey-icon">
          {icon}
        </div>

      </div>

      <h3>{title}</h3>

      <p>{text}</p>

    </div>
  );
}


function AssessmentFlow({
  stage,
  setStage,
  lifestyleResult,
  setLifestyleResult,
  clinicalResult,
  setClinicalResult,
  onBack,
  onReset,
}) {

  if (stage === "lifestyle") {

    return (
      <LifestyleAssessment
        onBack={onBack}
        onResult={(result) => {
          setLifestyleResult(result);
          setStage("lifestyle-result");
        }}
      />
    );

  }


  if (stage === "lifestyle-result") {

    return (
      <LifestyleResult
        result={lifestyleResult}
        onContinue={() =>
          setStage("clinical")
        }
        onFinish={onBack}
        onReset={onReset}
      />
    );

  }


  if (stage === "clinical") {

    return (
      <ClinicalAssessment
        onBack={() =>
          setStage("lifestyle-result")
        }
        onResult={(result) => {
          setClinicalResult(result);
          setStage("clinical-result");
        }}
      />
    );

  }


  if (stage === "clinical-result") {

    return (
      <ClinicalResult
        result={clinicalResult}
        onFinish={onBack}
        onReset={onReset}
      />
    );

  }


  return null;
}


function AssessmentHeader({
  step,
  title,
  description,
}) {

  return (
    <div className="assessment-header">

      <div className="assessment-step">
        STEP {step} OF 2
      </div>

      <h1>{title}</h1>

      <p>{description}</p>

    </div>
  );
}


function LifestyleAssessment({
  onBack,
  onResult,
}) {

  const [form, setForm] = useState({
    Age: 5,
    Sex: 0,
    BMI: "",
    Smoker: 0,
    HvyAlcoholConsump: 0,
    PhysActivity: 1,
    Fruits: 1,
    Veggies: 1,
    Diabetes: 0,
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const update = (key, value) => {

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

  };


  const submit = async (e) => {

    e.preventDefault();

    setError("");

    if (!form.BMI) {
      setError("Please enter your BMI.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        `${API_URL}/predict/lifestyle`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...form,
            BMI: Number(form.BMI),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
          "Lifestyle prediction failed."
        );
      }

      onResult(data);

    } catch (err) {

      setError(
        err.message ||
        "Unable to connect to HeartWise API."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="assessment-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        <ArrowLeft size={17} />
        Back to dashboard
      </button>


      <AssessmentHeader
        step="1"
        title="Lifestyle Assessment"
        description="Tell us about a few everyday factors. This screening uses lifestyle information to identify whether a more detailed assessment may be appropriate."
      />


      <form
        className="assessment-form"
        onSubmit={submit}
      >

        <FormSection
          title="Basic information"
          description="A few basic details help the screening model."
        >

          <Field
            label="Age group"
            help="Choose the age range that includes your current age. The groups match the age categories used by the lifestyle model."
          >

            <select
              value={form.Age}
              onChange={(e) =>
                update(
                  "Age",
                  Number(e.target.value)
                )
              }
            >

              {AGE_GROUPS.map((group) => (
                <option
                  key={group.value}
                  value={group.value}
                >
                  Group {group.value} — {group.range}
                </option>
              ))}

            </select>

          </Field>


          <Field label="Sex">

            <select
              value={form.Sex}
              onChange={(e) =>
                update(
                  "Sex",
                  Number(e.target.value)
                )
              }
            >
              <option value={0}>
                Female
              </option>

              <option value={1}>
                Male
              </option>

            </select>

          </Field>


          <Field
            label="BMI"
            help="Enter your BMI if you know it."
          >

            <input
              type="number"
              min="1"
              max="100"
              step="0.1"
              placeholder="e.g. 23.5"
              value={form.BMI}
              onChange={(e) =>
                update(
                  "BMI",
                  e.target.value
                )
              }
            />

          </Field>

        </FormSection>


        <FormSection
          title="Lifestyle habits"
          description="These questions describe common lifestyle factors."
        >

          <Choice
            label="Do you currently smoke?"
            value={form.Smoker}
            onChange={(v) =>
              update("Smoker", v)
            }
          />

          <Choice
            label="Heavy alcohol consumption?"
            value={form.HvyAlcoholConsump}
            onChange={(v) =>
              update(
                "HvyAlcoholConsump",
                v
              )
            }
          />

          <Choice
            label="Physically active?"
            value={form.PhysActivity}
            onChange={(v) =>
              update(
                "PhysActivity",
                v
              )
            }
          />

          <Choice
            label="Eat fruit regularly?"
            value={form.Fruits}
            onChange={(v) =>
              update("Fruits", v)
            }
          />

          <Choice
            label="Eat vegetables regularly?"
            value={form.Veggies}
            onChange={(v) =>
              update("Veggies", v)
            }
          />

          <Field label="Diabetes status">

            <select
              value={form.Diabetes}
              onChange={(e) =>
                update(
                  "Diabetes",
                  Number(e.target.value)
                )
              }
            >

              <option value={0}>
                No diabetes
              </option>

              <option value={1}>
                Diabetes
              </option>

              <option value={2}>
                Diabetes / related condition
              </option>

            </select>

          </Field>

        </FormSection>


        {error && (
          <ErrorBox message={error} />
        )}


        <div className="assessment-actions">

          <button
            type="button"
            className="secondary-button"
            onClick={onBack}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >

            {loading ? (
              <>
                <LoaderCircle
                  size={18}
                  className="spin"
                />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Lifestyle
                <ArrowRight size={18} />
              </>
            )}

          </button>

        </div>

      </form>

    </div>
  );
}


function LifestyleResult({
  result,
  onContinue,
  onFinish,
  onReset,
}) {

  const higherConcern =
    result?.prediction === 1;


  return (
    <ResultPage>

      <ResultBadge
        higher={higherConcern}
        risk={result?.risk}
      />

      <div className="score-card">

        <div className="score-value">
          {Math.round(
            (result?.score || 0) * 100
          )}
          <span>%</span>
        </div>

        <div>
          <strong>
            Lifestyle screening score
          </strong>

          <p>
            This score is a model output for
            screening and is not a diagnosis.
          </p>
        </div>

      </div>


      <InsightSection
        title="What influenced your result"
        icon={<Lightbulb size={21} />}
        factors={result?.factors}
      />


      <Recommendations
        items={result?.recommendations}
      />


      <div className="result-actions">

        {result?.proceed_to_clinical ? (

          <button
            className="primary-button"
            onClick={onContinue}
          >
            Continue to Clinical Assessment
            <ArrowRight size={18} />
          </button>

        ) : (

          <button
            className="primary-button"
            onClick={onFinish}
          >
            Return to Dashboard
            <ArrowRight size={18} />
          </button>

        )}


        <button
          className="secondary-button"
          onClick={onReset}
        >
          Retake Assessment
        </button>

      </div>

    </ResultPage>
  );
}


function ClinicalAssessment({
  onBack,
  onResult,
}) {

  const [form, setForm] = useState({
    Age: "",
    Sex: "M",
    ChestPainType: "ATA",
    RestingBP: "",
    Cholesterol: "",
    FastingBS: 0,
    RestingECG: "Normal",
    MaxHR: "",
    ExerciseAngina: "N",
    Oldpeak: "",
    ST_Slope: "Up",
  });


  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const update = (key, value) => {

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

  };


  const submit = async (e) => {

    e.preventDefault();

    setError("");

    const required = [
      "Age",
      "RestingBP",
      "Cholesterol",
      "MaxHR",
      "Oldpeak",
    ];

    const missing = required.some(
      (key) =>
        form[key] === "" ||
        form[key] === null
    );

    if (missing) {
      setError(
        "Please complete all clinical measurements."
      );
      return;
    }


    setLoading(true);


    try {

      const response = await fetch(
        `${API_URL}/predict/clinical`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...form,
            Age: Number(form.Age),
            RestingBP:
              Number(form.RestingBP),
            Cholesterol:
              Number(form.Cholesterol),
            MaxHR:
              Number(form.MaxHR),
            Oldpeak:
              Number(form.Oldpeak),
            FastingBS:
              Number(form.FastingBS),
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {
        throw new Error(
          data.detail ||
          "Clinical prediction failed."
        );
      }


      onResult(data);

    } catch (err) {

      setError(
        err.message ||
        "Unable to connect to HeartWise API."
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <div className="assessment-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        <ArrowLeft size={17} />
        Back to lifestyle result
      </button>


      <AssessmentHeader
        step="2"
        title="Clinical Assessment"
        description="Enter the available clinical measurements below. These values are used by the second-stage screening model."
      />


      <div className="clinical-warning">

        <AlertCircle size={19} />

        <span>
          Only enter measurements you know accurately.
          HeartWise does not diagnose medical conditions.
        </span>

      </div>


      <form
        className="assessment-form"
        onSubmit={submit}
      >

        <FormSection
          title="Clinical measurements"
          description="Enter your measured or reported health values."
        >

          <Field label="Age">

            <input
              type="number"
              min="1"
              value={form.Age}
              onChange={(e) =>
                update(
                  "Age",
                  e.target.value
                )
              }
            />

          </Field>


          <Field label="Resting blood pressure">

            <input
              type="number"
              min="0"
              placeholder="e.g. 120"
              value={form.RestingBP}
              onChange={(e) =>
                update(
                  "RestingBP",
                  e.target.value
                )
              }
            />

          </Field>


          <Field label="Cholesterol">

            <input
              type="number"
              min="0"
              placeholder="e.g. 200"
              value={form.Cholesterol}
              onChange={(e) =>
                update(
                  "Cholesterol",
                  e.target.value
                )
              }
            />

          </Field>


          <Field label="Maximum heart rate">

            <input
              type="number"
              min="0"
              placeholder="e.g. 150"
              value={form.MaxHR}
              onChange={(e) =>
                update(
                  "MaxHR",
                  e.target.value
                )
              }
            />

          </Field>


          <Field label="ST depression (Oldpeak)">

            <input
              type="number"
              step="0.1"
              value={form.Oldpeak}
              onChange={(e) =>
                update(
                  "Oldpeak",
                  e.target.value
                )
              }
            />

          </Field>


          <Field label="Fasting blood sugar">

            <select
              value={form.FastingBS}
              onChange={(e) =>
                update(
                  "FastingBS",
                  Number(e.target.value)
                )
              }
            >

              <option value={0}>
                Normal
              </option>

              <option value={1}>
                Elevated
              </option>

            </select>

          </Field>

        </FormSection>


        <FormSection
          title="Clinical observations"
          description="Select the reported clinical categories."
        >

          <Field label="Sex">

            <select
              value={form.Sex}
              onChange={(e) =>
                update(
                  "Sex",
                  e.target.value
                )
              }
            >

              <option value="M">
                Male
              </option>

              <option value="F">
                Female
              </option>

            </select>

          </Field>


          <Field label="Chest pain type">

            <select
              value={form.ChestPainType}
              onChange={(e) =>
                update(
                  "ChestPainType",
                  e.target.value
                )
              }
            >

              <option value="ATA">
                Typical/atypical angina
              </option>

              <option value="NAP">
                Non-anginal pain
              </option>

              <option value="ASY">
                Asymptomatic
              </option>

              <option value="TA">
                Typical angina
              </option>

            </select>

          </Field>


          <Field label="Resting ECG">

            <select
              value={form.RestingECG}
              onChange={(e) =>
                update(
                  "RestingECG",
                  e.target.value
                )
              }
            >

              <option value="Normal">
                Normal
              </option>

              <option value="ST">
                ST-T abnormality
              </option>

              <option value="LVH">
                LV hypertrophy
              </option>

            </select>

          </Field>


          <Field label="Exercise-induced angina">

            <select
              value={form.ExerciseAngina}
              onChange={(e) =>
                update(
                  "ExerciseAngina",
                  e.target.value
                )
              }
            >

              <option value="N">
                No
              </option>

              <option value="Y">
                Yes
              </option>

            </select>

          </Field>


          <Field label="ST slope">

            <select
              value={form.ST_Slope}
              onChange={(e) =>
                update(
                  "ST_Slope",
                  e.target.value
                )
              }
            >

              <option value="Up">
                Up
              </option>

              <option value="Flat">
                Flat
              </option>

              <option value="Down">
                Down
              </option>

            </select>

          </Field>

        </FormSection>


        {error && (
          <ErrorBox message={error} />
        )}


        <div className="assessment-actions">

          <button
            type="button"
            className="secondary-button"
            onClick={onBack}
          >
            Back
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >

            {loading ? (
              <>
                <LoaderCircle
                  size={18}
                  className="spin"
                />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Clinical Data
                <ArrowRight size={18} />
              </>
            )}

          </button>

        </div>

      </form>

    </div>
  );
}


function ClinicalResult({
  result,
  onFinish,
  onReset,
}) {

  const higher =
    result?.prediction === 1;


  return (
    <ResultPage>

      <ResultBadge
        higher={higher}
        risk={result?.risk}
      />


      <div className="score-card">

        <div className="score-value">
          {Math.round(
            (result?.score || 0) * 100
          )}
          <span>%</span>
        </div>

        <div>

          <strong>
            Clinical screening score
          </strong>

          <p>
            This is a model-generated screening
            output and is not a diagnosis.
          </p>

        </div>

      </div>


      <InsightSection
        title="Clinical factors influencing the model"
        icon={<Stethoscope size={21} />}
        factors={result?.factors}
      />


      <Recommendations
        items={result?.recommendations}
      />


      <div className="clinical-result-notice">

        <ShieldCheck size={20} />

        <div>

          <strong>
            What should you do next?
          </strong>

          <p>
            If you have symptoms, concerns, or an
            unusual clinical measurement, discuss
            them with a qualified healthcare professional.
          </p>

        </div>

      </div>


      <div className="result-actions">

        <button
          className="primary-button"
          onClick={onFinish}
        >
          Return to Dashboard
          <ArrowRight size={18} />
        </button>

        <button
          className="secondary-button"
          onClick={onReset}
        >
          Start Again
        </button>

      </div>

    </ResultPage>
  );
}


function ResultPage({ children }) {

  return (
    <div className="result-page">

      <div className="result-header">

        <span className="eyebrow">
          HEARTWISE SCREENING RESULT
        </span>

        <h1>
          Your assessment is complete.
        </h1>

        <p>
          Here's a summary of what the model found
          and some practical guidance.
        </p>

      </div>

      {children}

    </div>
  );
}


function ResultBadge({
  higher,
  risk,
}) {

  return (
    <div
      className={
        `result-badge ${
          higher
            ? "result-higher"
            : "result-lower"
        }`
      }
    >

      {higher ? (
        <AlertCircle size={24} />
      ) : (
        <CheckCircle2 size={24} />
      )}

      <div>

        <span>
          SCREENING RESULT
        </span>

        <strong>
          {risk}
        </strong>

      </div>

    </div>
  );
}


function InsightSection({
  title,
  icon,
  factors,
}) {

  return (
    <section className="insight-section">

      <div className="result-section-heading">

        <div className="result-section-icon">
          {icon}
        </div>

        <div>

          <h2>{title}</h2>

          <p>
            These are factors that influenced the
            model's prediction. They do not establish
            cause or effect.
          </p>

        </div>

      </div>


      <div className="factor-grid">

        {(factors || []).map(
          (factor, index) => (

            <div
              className="factor-card"
              key={index}
            >

              <div className="factor-number">
                {index + 1}
              </div>

              <div>

                <strong>
                  {factor.factor}
                </strong>

                <span>
                  {factor.impact}
                </span>

                <p>
                  {factor.detail}
                </p>

              </div>

            </div>

          )
        )}

      </div>

    </section>
  );
}


function Recommendations({
  items,
}) {

  return (
    <section className="recommendations-section">

      <div className="result-section-heading">

        <div className="result-section-icon">
          <HeartPulse size={21} />
        </div>

        <div>

          <h2>
            Practical recommendations
          </h2>

          <p>
            General healthy-lifestyle guidance based
            on the information you provided.
          </p>

        </div>

      </div>


      <div className="recommendation-list">

        {(items || []).map(
          (item, index) => (

            <div
              className="recommendation-item"
              key={index}
            >

              <CheckCircle2 size={19} />

              <span>{item}</span>

            </div>

          )
        )}

      </div>

    </section>
  );
}


function FormSection({
  title,
  description,
  children,
}) {

  return (
    <section className="form-section">

      <div className="form-section-heading">

        <h2>{title}</h2>

        <p>{description}</p>

      </div>

      <div className="form-grid">
        {children}
      </div>

    </section>
  );
}


function Field({
  label,
  help,
  children,
}) {

  return (
    <div className="form-field">

      <label>{label}</label>

      {children}

      {help && (
        <small>{help}</small>
      )}

    </div>
  );
}


function Choice({
  label,
  value,
  onChange,
}) {

  return (
    <div className="choice-field">

      <span>{label}</span>

      <div className="choice-buttons">

        <button
          type="button"
          className={
            value === 1
              ? "choice active"
              : "choice"
          }
          onClick={() =>
            onChange(1)
          }
        >
          Yes
        </button>

        <button
          type="button"
          className={
            value === 0
              ? "choice active"
              : "choice"
          }
          onClick={() =>
            onChange(0)
          }
        >
          No
        </button>

      </div>

    </div>
  );
}


function ErrorBox({
  message,
}) {

  return (
    <div className="form-error">

      <AlertCircle size={18} />

      <span>{message}</span>

    </div>
  );
}


export default App;