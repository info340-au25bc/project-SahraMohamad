import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function HomePage() {
  const { activeUser } = useAuth();
  const [notices, setNotices] = useState([
    { item: 'X', days: 3 },
    { item: 'Y', days: 4 }
  ]);
  const [todayTasks, setTodayTasks] = useState(['----------', '-----------', '-----------']);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTomorrowTask, setNewTomorrowTask] = useState('');
  const [mealName, setMealName] = useState('Chicken Fried Rice');
  const [ingredients, setIngredients] = useState('Chicken, Rice, Egg, Onion, Soy Sauce');
  const [steps, setSteps] = useState([
    'Cook rice',
    'Make scrambled eggs',
    'Stir-fry chicken',
    'Add onions and mix it with chicken',
    'Add rice, eggs, and soy sauce'
  ]);
  const [newStep, setNewStep] = useState('');

  const addTodayTask = () => {
    if (newTask.trim()) {
      setTodayTasks([...todayTasks, newTask]);
      setNewTask('');
    }
  };

  const addTomorrowTask = () => {
    if (newTomorrowTask.trim()) {
      setTomorrowTasks([...tomorrowTasks, newTomorrowTask]);
      setNewTomorrowTask('');
    }
  };

  const addStep = () => {
    if (newStep.trim()) {
      setSteps([...steps, newStep]);
      setNewStep('');
    }
  };

  const removeTask = (index, isToday) => {
    if (isToday) {
      setTodayTasks(todayTasks.filter((_, i) => i !== index));
    } else {
      setTomorrowTasks(tomorrowTasks.filter((_, i) => i !== index));
    }
  };

  return (
    <main>
      <div>
        <section className="column">
          <div className="box notice">
            <h2>Notice!</h2>
            {notices.map((notice, index) => (
              <p key={index}>
                <strong>{notice.item}</strong> is expiring in {notice.days} days!
              </p>
            ))}
          </div>

          <div className="box">
            <h3>Dates</h3>
            <label htmlFor="userDate">Enter today's date:</label>
            <input
              type="text"
              id="userDate"
              name="userDate"
              placeholder="MM/DD/YYYY"
            />
          </div>
        </section>

        <section className="column">
          <div className="box welcome">
            <h2>
              {activeUser ? `Welcome back, ${activeUser.firstName}!` : 'Welcome Back!'}
            </h2>
            <p>
              {activeUser
                ? `Here's what's on your radar today, ${activeUser.firstName}.`
                : 'Use the lists below to plan your day.'}
            </p>
          </div>

          <div className="box">
            <h3>Today</h3>
            <ul>
              {todayTasks.map((task, index) => (
                <li key={index}>
                  {task}
                  {task !== '----------' && task !== '-----------' && (
                    <button onClick={() => removeTask(index, true)} style={{marginLeft: '10px', fontSize: '12px'}}>✕</button>
                  )}
                </li>
              ))}
            </ul>
            <div style={{marginTop: '10px'}}>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new task..."
                style={{width: '70%'}}
              />
              <button onClick={addTodayTask} style={{marginLeft: '5px'}}>Add</button>
            </div>
          </div>

          <div className="box">
            <h3>Tomorrow</h3>
            <ul>
              {tomorrowTasks.map((task, index) => (
                <li key={index}>
                  {task}
                  <button onClick={() => removeTask(index, false)} style={{marginLeft: '10px', fontSize: '12px'}}>✕</button>
                </li>
              ))}
            </ul>
            <div style={{marginTop: '10px'}}>
              <input
                type="text"
                value={newTomorrowTask}
                onChange={(e) => setNewTomorrowTask(e.target.value)}
                placeholder="Add task for tomorrow..."
                style={{width: '70%'}}
              />
              <button onClick={addTomorrowTask} style={{marginLeft: '5px'}}>Add</button>
            </div>
          </div>
        </section>

        <section className="column">
          <div className="box suggested-meal">
            <h3>Suggested meal for the day</h3>
            <input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="meal-text"
              style={{fontSize: '16px', marginBottom: '10px', width: '100%'}}
            />

            <h4>Ingredients</h4>
            <div className="Ingreidents-list">
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                style={{width: '100%', minHeight: '60px'}}
              />
            </div>

            <h4>Quick Steps</h4>
            <div className="meal-steps">
              <ol>
                {steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <div style={{marginTop: '10px'}}>
                <input
                  type="text"
                  value={newStep}
                  onChange={(e) => setNewStep(e.target.value)}
                  placeholder="Add new step..."
                  style={{width: '70%'}}
                />
                <button onClick={addStep} style={{marginLeft: '5px'}}>Add</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
