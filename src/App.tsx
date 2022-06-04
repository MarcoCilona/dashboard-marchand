import React, { useEffect, useState } from 'react';
import './App.css';

import { formatRecaps, retrievePayments } from './utils/payments';

import Typography from '@mui/material/Typography';

// Components
import RecapCardList from './components/RecapCardList/RecapCardList';
import PaymentsTable from './components/PaymentsTable/PaymentsTable';

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
      <Typography align='left' sx={{ color: '#fff' }} variant='h5' gutterBottom>
        Payments recaps
      </Typography>
      <RecapCardList recaps={recaps} />
      <Typography align='left' sx={{ color: '#fff', marginTop: '20px' }} variant='h5' gutterBottom>
        Payments list
      </Typography>
      <PaymentsTable payments={payments} />
    </div>
  );
}

export default App;
