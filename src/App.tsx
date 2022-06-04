import React, { useEffect, useState } from 'react';
import './App.css';

import { formatRecaps, retrievePayments } from './utils/payments';

// Components
import RecapCardList from './components/RecapCardList/RecapCardList';

function App() {
  const [payments, updatePayments] = useState([]);
  const [recaps, updateRecaps] = useState([]);

  useEffect(() => {
    (async () => {
      const paymentsResouce = await retrievePayments();
      updatePayments(paymentsResouce);
      updateRecaps(formatRecaps(paymentsResouce));
    })();
  }, []);

  return (
    <div className='App'>
      <RecapCardList recaps={recaps} />
    </div>
  );
}

export default App;
