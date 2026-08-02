---

```markdown
# 🌤️ Real-time Weather & Search Dashboard

A modern, responsive weather dashboard built with **Vanilla JavaScript (ES6+)**, CSS Glassmorphism, and the **Open-Meteo REST API**. 

This project demonstrates sequential asynchronous API fetch chaining (`async/await`), robust error handling, dynamic state-driven UI management, and temperature-aware condition mapping without relying on any external libraries or frameworks.

---

## ✨ Features

* **⚡ Sequential API Chaining (`async/await`):** Dynamically fetches latitude and longitude from a city string using Open-Meteo's Geocoding API, then chains those coordinates to fetch live weather data.
* **🛡️ Robust Error Handling:** Gracefully catches network failures, invalid city names, and DOM edge cases using `try/catch` boundaries and guard clauses.
* **🎨 Predictable UI State Machine:** Seamlessly toggles visibility between 4 distinct application states: **Idle**, **Loading**, **Success**, and **Error**.
* **🥶 Context-Aware Condition Mapping:** Translates raw WMO weather codes into intuitive icons and text labels, including smart freezing-temperature handling for polar regions.
* **📱 Responsive Glassmorphism Design:** Built with modern CSS variables, flexbox/grid layouts, dynamic backdrop blurs, and full mobile optimization.
* **⌨️ Dual Search Triggers:** Search via search button click or by pressing the `Enter` key.

---

## 🛠️ Tech Stack

* **HTML5:** Semantic markup structure.
* **CSS3:** Custom CSS variables, flexbox, grid, glassmorphism (`backdrop-filter`), and mobile media queries.
* **JavaScript (ES6+):** `async/await`, Promises, DOM Manipulation, and Event Listeners.
* **REST API:** [Open-Meteo API](https://open-meteo.com/) (Free, no API key required).

---

## 🚀 How It Works

1. **User Action:** The user enters a city name (e.g., `"Cairo"`) into the search input and clicks **Search** or presses **Enter**.
2. **Geocoding Request:** The app queries `https://geocoding-api.open-meteo.com/v1/search?name={cityName}` to retrieve precise geographic coordinates.
3. **Weather Request:** The app extracts `latitude` and `longitude` from the response and queries `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true`.
4. **UI Render:** The app parses temperature, wind speed, and weather code metrics, passes them through `getWeatherCondition()`, and updates the DOM in the Success state.

---

## 📁 Project Structure

```text
├── index.html        # Semantic HTML structure & icon setup
├── style.css         # Glassmorphism styling, dark mode, and media queries
├── script.js        # Async API engine, UI controller, and event listeners
└── README.md         # Project documentation

```

---

## 💻 Local Setup

1. **Clone the repository:**
```bash
git clone [https://github.com/your-username/weather-dashboard.git](https://github.com/your-username/weather-dashboard.git)

```


2. **Navigate into the project folder:**
```bash
cd weather-dashboard

```


3. **Open `index.html**` directly in your browser or run it with Live Server in VS Code!

---

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

```

---

