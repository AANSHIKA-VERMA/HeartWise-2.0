import { useState } from "react";
import {
  Activity,
  Heart,
  HeartPulse,
  ShieldCheck,
  Brain,
  Clock3,
  UserRound,
  Stethoscope,
  Apple,
  Dumbbell,
  Wine,
  Cigarette,
  Lock,
  ArrowRight,
  ChevronDown,
  BarChart3,
  Menu,
  X,
  CircleCheck,
  AlertCircle,
} from "lucide-react";

import "./index.css";


const lifestyleInitial = {
  Age: "",
  Sex: "",
  BMI: "",
  Smoker: "",
  HvyAlcoholConsump: "",
  PhysActivity: "",
  Fruits: "",
  Veggies: "",
  Diabetes: "",
};

const clinicalInitial = {
  Age: "",
  Sex: "",
  ChestPainType: "",
  RestingBP: "",
  Cholesterol: "",
  FastingBS: "",
  RestingECG: "",
  MaxHR: "",
  ExerciseAngina: "",
  Oldpeak: "",
  ST_Slope: "",
};


function App() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const [lifestyle, setLifestyle] = useState(lifestyleInitial);
  const [clinical, setClinical] = useState(clinicalInitial);

  const [lifestyleResult, setLifestyleResult] = useState(null);
  const [clinicalResult, setClinicalResult] = useState(null);

  const updateLifestyle = (field, value) => {
    setLifestyle({
      ...lifestyle,
      [field]: value,
    });
  };

  const updateClinical = (field, value) => {
    setClinical({
      ...clinical,
      [field]: value,
    });
  };

  const analyzeLifestyle = (e) => {
    e.preventDefault();

    setLifestyleResult({
      type: "preview",
      message:
        "Your lifestyle assessment is ready. The AI prediction will be connected in Phase 4.",
    });
  };

  const analyzeClinical = (e) => {
    e.preventDefault();

    setClinicalResult({
      type: "preview",
      message:
        "Your clinical assessment is ready. The AI prediction will be connected in Phase 4.",
    });
  };

  const scrollToAssessment = () => {
    document
      .getElementById("assessment")
      ?.scrollIntoView({ behavior: "smooth" });

    setMobileMenu(false);
  };

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">
        <div className="container nav-container">

          <a className="logo" href="#home">
            <div className="logo-icon">
              <HeartPulse size={25} />
            </div>

            <span>
              Heart<span>Wise</span>
            </span>
          </a>

          <nav className={`nav-links ${mobileMenu ? "mobile-open" : ""}`}>
            <a href="#home" onClick={() => setMobileMenu(false)}>
              Home
            </a>

            <a href="#assessment" onClick={() => setMobileMenu(false)}>
              Assessment
            </a>

            <a href="#about" onClick={() => setMobileMenu(false)}>
              About
            </a>

            <a href="#how-it-works" onClick={() => setMobileMenu(false)}>
              How it Works
            </a>

            <a href="#contact" onClick={() => setMobileMenu(false)}>
              Contact
            </a>

            <button className="nav-button" onClick={scrollToAssessment}>
              Get Started
            </button>
          </nav>

          <button
            className="mobile-menu"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>

        </div>
      </header>


      {/* ================= HERO ================= */}

      <main>

        <section className="hero" id="home">

          <div className="container hero-container">

            <div className="hero-content">

              <div className="eyebrow">
                <ShieldCheck size={16} />
                AI-POWERED CARDIOVASCULAR SCREENING
              </div>

              <h1>
                Take Charge of
                <br />
                Your <span>Heart Health</span>
              </h1>

              <p className="hero-description">
                HeartWise uses advanced AI to assess your cardiovascular
                risk in two simple steps. Early screening today, healthier
                tomorrow.
              </p>

              <div className="hero-buttons">

                <button
                  className="primary-button"
                  onClick={scrollToAssessment}
                >
                  <Heart size={18} />
                  Start Your Assessment
                  <ArrowRight size={18} />
                </button>

                <a href="#how-it-works" className="secondary-button">
                  Learn More
                  <ArrowRight size={17} />
                </a>

              </div>

              <div className="disclaimer">
                <ShieldCheck size={15} />
                This tool is for screening purposes only and is not a
                substitute for professional medical advice.
              </div>

            </div>


            {/* HEART VISUAL */}

            <div className="hero-visual">

              <div className="heart-orbit orbit-one"></div>
              <div className="heart-orbit orbit-two"></div>
              <div className="heart-orbit orbit-three"></div>

              <div className="floating-icon icon-one">
                <HeartPulse size={24} />
              </div>

              <div className="floating-icon icon-two">
                <Stethoscope size={23} />
              </div>

              <div className="floating-icon icon-three">
                <Heart size={22} fill="currentColor" />
              </div>

              <div className="floating-icon icon-four">
                <BarChart3 size={22} />
              </div>

              <div className="heart-circle">
                <HeartPulse
                  size={170}
                  strokeWidth={1.3}
                />
              </div>

            </div>

          </div>

        </section>


        {/* ================= ASSESSMENT ================= */}

        <section className="assessment-section" id="assessment">

          <div className="container">

            <div className="section-heading">

              <h2>Start Your Assessment</h2>

              <p>
                Complete the two-step assessment to evaluate your
                cardiovascular risk.
              </p>

            </div>


            {/* STEPPER */}

            <div className="stepper">

              <div className="step active">
                <div className="step-number">1</div>

                <div>
                  <strong>Lifestyle Screening</strong>
                  <span>Initial Risk Assessment</span>
                </div>
              </div>

              <div className="step-line"></div>

              <div className="step">
                <div className="step-number">2</div>

                <div>
                  <strong>Clinical Assessment</strong>
                  <span>Detailed Risk Prediction</span>
                </div>
              </div>

            </div>


            {/* ================= LIFESTYLE CARD ================= */}

            <form
              className="assessment-card"
              onSubmit={analyzeLifestyle}
            >

              <div className="card-header">

                <div className="card-title-wrapper">

                  <div className="card-icon">
                    <UserRound size={23} />
                  </div>

                  <div>
                    <div className="stage-label">STAGE 1</div>

                    <h3>Lifestyle Screening</h3>

                    <p>
                      Tell us about your lifestyle and general health.
                    </p>
                  </div>

                </div>

                <div className="time-badge">
                  <Clock3 size={16} />
                  Takes about 2–3 minutes
                </div>

              </div>


              <div className="form-grid">

                <SelectField
                  label="Age Category"
                  icon={<Activity size={16} />}
                  value={lifestyle.Age}
                  onChange={(v) => updateLifestyle("Age", v)}
                  options={Array.from({ length: 13 }, (_, i) => ({
                    value: String(i + 1),
                    label: `Age Category ${i + 1}`,
                  }))}
                />

                <SelectField
                  label="Sex"
                  value={lifestyle.Sex}
                  onChange={(v) => updateLifestyle("Sex", v)}
                  options={[
                    { value: "0", label: "Female" },
                    { value: "1", label: "Male" },
                  ]}
                />

                <InputField
                  label="BMI"
                  type="number"
                  placeholder="Enter BMI"
                  icon={<Activity size={16} />}
                  value={lifestyle.BMI}
                  onChange={(v) => updateLifestyle("BMI", v)}
                />

                <SelectField
                  label="Do you smoke?"
                  icon={<Cigarette size={16} />}
                  value={lifestyle.Smoker}
                  onChange={(v) => updateLifestyle("Smoker", v)}
                  options={[
                    { value: "0", label: "No" },
                    { value: "1", label: "Yes" },
                  ]}
                />

                <SelectField
                  label="Heavy alcohol consumption?"
                  icon={<Wine size={16} />}
                  value={lifestyle.HvyAlcoholConsump}
                  onChange={(v) =>
                    updateLifestyle("HvyAlcoholConsump", v)
                  }
                  options={[
                    { value: "0", label: "No" },
                    { value: "1", label: "Yes" },
                  ]}
                />

                <SelectField
                  label="Physically active?"
                  icon={<Dumbbell size={16} />}
                  value={lifestyle.PhysActivity}
                  onChange={(v) =>
                    updateLifestyle("PhysActivity", v)
                  }
                  options={[
                    { value: "0", label: "No" },
                    { value: "1", label: "Yes" },
                  ]}
                />

                <SelectField
                  label="Eat fruits regularly?"
                  icon={<Apple size={16} />}
                  value={lifestyle.Fruits}
                  onChange={(v) => updateLifestyle("Fruits", v)}
                  options={[
                    { value: "0", label: "No" },
                    { value: "1", label: "Yes" },
                  ]}
                />

                <SelectField
                  label="Eat vegetables regularly?"
                  icon={<Apple size={16} />}
                  value={lifestyle.Veggies}
                  onChange={(v) => updateLifestyle("Veggies", v)}
                  options={[
                    { value: "0", label: "No" },
                    { value: "1", label: "Yes" },
                  ]}
                />

                <SelectField
                  label="Diabetes status"
                  icon={<Activity size={16} />}
                  value={lifestyle.Diabetes}
                  onChange={(v) => updateLifestyle("Diabetes", v)}
                  options={[
                    { value: "0", label: "No diabetes" },
                    { value: "1", label: "Prediabetes" },
                    { value: "2", label: "Diabetes" },
                  ]}
                />

              </div>


              <button className="analyze-button" type="submit">
                Analyze Lifestyle Risk
                <ArrowRight size={18} />
              </button>

              {lifestyleResult && (
                <ResultMessage result={lifestyleResult} />
              )}

            </form>


            {/* ================= CLINICAL CARD ================= */}

            <form
              className="assessment-card"
              onSubmit={analyzeClinical}
            >

              <div className="card-header">

                <div className="card-title-wrapper">

                  <div className="card-icon heart-icon">
                    <HeartPulse size={23} />
                  </div>

                  <div>
                    <div className="stage-label">STAGE 2</div>

                    <h3>Clinical Assessment</h3>

                    <p>
                      Enter your clinical measurements.
                    </p>
                  </div>

                </div>

                <div className="time-badge">
                  <Clock3 size={16} />
                  Takes about 3–4 minutes
                </div>

              </div>


              <div className="form-grid clinical-grid">

                <InputField
                  label="Age"
                  type="number"
                  placeholder="Enter age"
                  value={clinical.Age}
                  onChange={(v) => updateClinical("Age", v)}
                />

                <SelectField
                  label="Sex"
                  value={clinical.Sex}
                  onChange={(v) => updateClinical("Sex", v)}
                  options={[
                    { value: "F", label: "Female" },
                    { value: "M", label: "Male" },
                  ]}
                />

                <SelectField
                  label="Chest Pain Type"
                  icon={<Heart size={16} />}
                  value={clinical.ChestPainType}
                  onChange={(v) =>
                    updateClinical("ChestPainType", v)
                  }
                  options={[
                    { value: "ATA", label: "Atypical Angina" },
                    { value: "NAP", label: "Non-Anginal Pain" },
                    { value: "ASY", label: "Asymptomatic" },
                    { value: "TA", label: "Typical Angina" },
                  ]}
                />

                <InputField
                  label="Resting Blood Pressure"
                  type="number"
                  placeholder="mm Hg"
                  value={clinical.RestingBP}
                  onChange={(v) =>
                    updateClinical("RestingBP", v)
                  }
                />

                <InputField
                  label="Cholesterol"
                  type="number"
                  placeholder="mg/dL"
                  value={clinical.Cholesterol}
                  onChange={(v) =>
                    updateClinical("Cholesterol", v)
                  }
                />

                <SelectField
                  label="Fasting Blood Sugar > 120 mg/dl?"
                  value={clinical.FastingBS}
                  onChange={(v) =>
                    updateClinical("FastingBS", v)
                  }
                  options={[
                    { value: "0", label: "No" },
                    { value: "1", label: "Yes" },
                  ]}
                />

                <SelectField
                  label="Resting ECG"
                  value={clinical.RestingECG}
                  onChange={(v) =>
                    updateClinical("RestingECG", v)
                  }
                  options={[
                    { value: "Normal", label: "Normal" },
                    { value: "ST", label: "ST-T Wave Abnormality" },
                    { value: "LVH", label: "LV Hypertrophy" },
                  ]}
                />

                <InputField
                  label="Maximum Heart Rate"
                  type="number"
                  placeholder="Enter value"
                  value={clinical.MaxHR}
                  onChange={(v) =>
                    updateClinical("MaxHR", v)
                  }
                />

                <SelectField
                  label="Exercise Angina"
                  value={clinical.ExerciseAngina}
                  onChange={(v) =>
                    updateClinical("ExerciseAngina", v)
                  }
                  options={[
                    { value: "N", label: "No" },
                    { value: "Y", label: "Yes" },
                  ]}
                />

                <InputField
                  label="Oldpeak"
                  type="number"
                  step="0.1"
                  placeholder="Enter value"
                  value={clinical.Oldpeak}
                  onChange={(v) =>
                    updateClinical("Oldpeak", v)
                  }
                />

                <SelectField
                  label="ST Slope"
                  value={clinical.ST_Slope}
                  onChange={(v) =>
                    updateClinical("ST_Slope", v)
                  }
                  options={[
                    { value: "Up", label: "Up" },
                    { value: "Flat", label: "Flat" },
                    { value: "Down", label: "Down" },
                  ]}
                />

              </div>


              <button className="analyze-button" type="submit">
                Analyze Clinical Risk
                <ArrowRight size={18} />
              </button>

              {clinicalResult && (
                <ResultMessage result={clinicalResult} />
              )}

            </form>

          </div>

        </section>


        {/* ================= FEATURES ================= */}

        <section className="features-section" id="about">

          <div className="container features-grid">

            <Feature
              icon={<ShieldCheck />}
              title="Early Detection"
              text="Identify potential risks early with AI-powered screening."
            />

            <Feature
              icon={<Activity />}
              title="Two-Step Process"
              text="Simple lifestyle screening followed by clinical assessment."
            />

            <Feature
              icon={<Brain />}
              title="AI-Powered"
              text="Machine learning models provide consistent risk screening."
            />

            <Feature
              icon={<Lock />}
              title="Secure & Private"
              text="Your assessment data stays private and protected."
            />

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}

        <section className="how-section" id="how-it-works">

          <div className="container">

            <div className="section-heading">
              <h2>How HeartWise Works</h2>

              <p>
                A simple two-stage approach designed to make cardiovascular
                screening easy to understand.
              </p>
            </div>


            <div className="how-grid">

              <div className="how-card">
                <div className="how-number">01</div>

                <HeartPulse />

                <h3>Lifestyle Screening</h3>

                <p>
                  Answer simple questions about your lifestyle,
                  activity, diet and general health.
                </p>
              </div>


              <div className="how-arrow">
                <ArrowRight />
              </div>


              <div className="how-card">
                <div className="how-number">02</div>

                <Stethoscope />

                <h3>Clinical Assessment</h3>

                <p>
                  If a deeper assessment is needed, provide your
                  clinical measurements for detailed screening.
                </p>
              </div>


              <div className="how-arrow">
                <ArrowRight />
              </div>


              <div className="how-card">
                <div className="how-number">03</div>

                <BarChart3 />

                <h3>Risk Result</h3>

                <p>
                  Receive a clear screening result designed to
                  help you understand your cardiovascular risk.
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* ================= FOOTER ================= */}

        <footer id="contact">

          <div className="container footer-grid">

            <div className="footer-brand">

              <div className="footer-logo">
                <HeartPulse size={28} />
                Heart<span>Wise</span>
              </div>

              <p>
                AI-powered cardiovascular risk screening designed
                for simpler and earlier health awareness.
              </p>

              <div className="socials">
                <span>f</span>
                <span>𝕏</span>
                <span>◎</span>
                <span>in</span>
              </div>

            </div>


            <div className="footer-column">

              <h4>Quick Links</h4>

              <a href="#home">Home</a>
              <a href="#assessment">Assessment</a>
              <a href="#about">About Us</a>
              <a href="#how-it-works">How it Works</a>
              <a href="#contact">Contact</a>

            </div>


            <div className="footer-column">

              <h4>Resources</h4>

              <a href="#how-it-works">Heart Health Guide</a>
              <a href="#assessment">Risk Factors</a>
              <a href="#about">Prevention Tips</a>
              <a href="#contact">FAQ</a>

            </div>


            <div className="footer-column">

              <h4>Important</h4>

              <p className="footer-disclaimer">
                This tool is for screening purposes only and is not
                a substitute for professional medical advice.
                Always consult your doctor for medical concerns.
              </p>

            </div>

          </div>


          <div className="footer-bottom">
            © 2026 HeartWise. All rights reserved.
          </div>

        </footer>

      </main>

    </div>
  );
}


/* ================= INPUT COMPONENTS ================= */

function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  step,
}) {
  return (
    <div className="field">

      <label>{label}</label>

      <div className="input-wrapper">

        {icon && (
          <span className="field-icon">
            {icon}
          </span>
        )}

        <input
          type={type}
          step={step}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

      </div>

    </div>
  );
}


function SelectField({
  label,
  value,
  onChange,
  options,
  icon,
}) {
  return (
    <div className="field">

      <label>{label}</label>

      <div className="input-wrapper">

        {icon && (
          <span className="field-icon">
            {icon}
          </span>
        )}

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >

          <option value="">
            Select
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}

        </select>

        <ChevronDown className="select-arrow" size={17} />

      </div>

    </div>
  );
}


function ResultMessage({ result }) {
  return (
    <div className="result-message">

      {result.type === "preview" ? (
        <>
          <CircleCheck size={19} />
          <span>{result.message}</span>
        </>
      ) : (
        <>
          <AlertCircle size={19} />
          <span>{result.message}</span>
        </>
      )}

    </div>
  );
}


function Feature({ icon, title, text }) {
  return (
    <div className="feature">

      <div className="feature-icon">
        {icon}
      </div>

      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>

    </div>
  );
}


export default App;