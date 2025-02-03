import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { GameCanvas } from "./components/GameCanvas";

export default function App() {
  useEffect(() => {
    WebApp.ready();
    WebApp.setHeaderColor("#6a040f");
    WebApp.MainButton.setText("PLAY").show();
  }, []);

  return (
    <div className="app-container">
      {/* <h1>Telegram Mini Game</h1> */}
      <GameCanvas />
    </div>
  );
}
