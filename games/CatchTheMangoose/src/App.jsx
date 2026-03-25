import React, { useState } from 'react';
import TitleScreen from './components/TitleScreen';
import Game from './components/Game';

export default function App() {
  const [screen, setScreen] = useState('title');

  return (
    <div className="app">
      {screen === 'title' && <TitleScreen onStart={() => setScreen('game')} />}
      {screen === 'game' && <Game onQuit={() => setScreen('title')} />}
    </div>
  );
}
