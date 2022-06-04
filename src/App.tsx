import React from 'react';
import './App.css';

// Components
import RecapCardList from './components/RecapCardList/RecapCardList';

function App() {
  const recaps = [];

  return (
    <div className='App'>
      <RecapCardList recaps={recaps} />
    </div>
  );
}

export default App;
