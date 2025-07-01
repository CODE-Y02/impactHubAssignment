import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameLobby from "./containers/GameLobby";
import WalletScreen from "./containers/WalletScreen";
import GameScreen from "./containers/GameScreen";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameLobby />} />

        <Route path="/wallet" element={<WalletScreen />} />

        <Route path="/game/:gameId" element={<GameScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
