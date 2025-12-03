import { useState } from "react";
import heroImage from "../../img/hero.jpg";
import "../App.css";

export default function HomePage() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("Sedentary");
  const [tdee, setTdee] = useState(null);

  const activityLevels = {
    Sedentary: 1.2,
    "Light Activity": 1.375,
    "Moderate Activity": 1.55,
    "Very Active": 1.725,
  };

  const calculateTDEE = () => {
    if (!age || !height || !weight) return;
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    setTdee(Math.round(bmr * activityLevels[activity]));
  };

  const [waterWeight, setWaterWeight] = useState("");
  const [waterResult, setWaterResult] = useState(null);

  const calculateWater = () => {
    if (!waterWeight) return;
    let ounces = Math.round(waterWeight * 0.67);
    setWaterResult(ounces);
  };

  return (
    <main className="homepage">
      <section className="hero-section">
        <img src={heroImage} alt="Healthy Living" className="hero-image" />
        <div className="hero-overlay"></div>

        <div className="hero-text">
          <h1>Healthy Living, Made Simple</h1>
          <p>Your nutrition & lifestyle assistant.</p>
        </div>
      </section>

      <div className="content-wrapper">

        <div className="two-column">
          
          <section className="card">
            <h2>Daily Calorie Needs (TDEE)</h2>
            <p className="description">Estimate your daily calorie needs.</p>

            <div className="grid">
              <input type="number" placeholder="Age"
                value={age} onChange={(e) => setAge(e.target.value)} />

              <input type="number" placeholder="Height (cm)"
                value={height} onChange={(e) => setHeight(e.target.value)} />

              <input type="number" placeholder="Weight (kg)"
                value={weight} onChange={(e) => setWeight(e.target.value)} />

              <select value={activity}
                onChange={(e) => setActivity(e.target.value)}>
                <option>Sedentary</option>
                <option>Light Activity</option>
                <option>Moderate Activity</option>
                <option>Very Active</option>
              </select>

              <button onClick={calculateTDEE}>Calculate TDEE</button>
            </div>

            {tdee && (
              <p className="result">Your TDEE: <strong>{tdee}</strong> calories/day</p>
            )}
          </section>

          <section className="card">
            <h2>Daily Water Intake</h2>
            <p className="description">Enter your weight to estimate water intake.</p>

            <div className="grid">
              <input type="number" placeholder="Weight (kg)"
                value={waterWeight} onChange={(e) => setWaterWeight(e.target.value)} />

              <button onClick={calculateWater}>Calculate Water Intake</button>
            </div>

            {waterResult && (
              <p className="result">
                Recommended: <strong>{waterResult} oz</strong> of water/day
              </p>
            )}
          </section>
        </div>

     </div>
    </main>
  );
}































