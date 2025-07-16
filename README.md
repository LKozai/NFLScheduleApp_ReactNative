# NFL Schedule App

A mobile-friendly and intuitive React Native app built using Expo Snack. The app displays weekly NFL schedules with real-time scores and game information, powered by TheRundown's API.

---

## Features

- **Weekly NFL Schedule:** View games for any week (1–18) with accurate dates and times.
- **Live Scores:** See current or final scores for games that have started or finished.
- **Team Matchups:** Clearly display home and away teams.
- **Navigation Controls:** Easily switch between weeks using intuitive navigation buttons.
- **Responsive Design:** Works seamlessly on mobile devices via Expo.
- **State Management:** Utilizes Redux Toolkit for efficient state handling.

---

## Technologies Used

- **React Native** with Expo
- **Redux Toolkit**
- **React Redux**
- **TheRundown API** (requires key)
- **JavaScript**

---

## Installation

To run this project locally:

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/nfl-schedule-app.git
cd nfl-schedule-app
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Start the development server:

```bash
npm start
```

Open it in your browser or Expo Go on your device.

---

## Project Structure

```
nfl-schedule-app/
├── components/
│   ├── NFLSchedule.js
├── redux/
│   ├── slices/
        ├── scheduleSlice.js
│   └── store.js
├── App.js
├── app.json
├── babel.config.js
├── package.json
└── README.md
```

---

## API Reference

**TheRundown NFL Schedule API**\
(Requires free subscription and API key)

- **Endpoint format:**\
  `https://api.sportsdata.io/v4/nfl/scores/json/Schedules/{season}`
- **Authentication:** API Key via request headers
- **Response:** JSON array with game details, including team names, scores, dates, and status
