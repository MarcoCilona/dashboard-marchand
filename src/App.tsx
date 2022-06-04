import React, { useEffect, useState } from 'react';
import './App.css';

import {
  chartAmountSeries,
  chartInstallmentsSeries,
  chartPaymentsLabels,
  formatRecaps,
  retrievePayments,
} from './utils/payments';

import Typography from '@mui/material/Typography';

// Components
import PaymentsChart from './components/PaymentsChart/PaymentsChart';
import PaymentsTable from './components/PaymentsTable/PaymentsTable';
import RecapCardList from './components/RecapCardList/RecapCardList';

function App() {
  const [amountSeries, updateAmountSeries] = useState([]);
  const [installmentsSeries, updateInstallmentsSeries] = useState([]);
  const [labels, updateLabels] = useState([]);
  const [payments, updatePayments] = useState([]);
  const [recaps, updateRecaps] = useState([]);

  useEffect(() => {
    (async () => {
      const paymentsResouce = await retrievePayments();
      updatePayments(paymentsResouce);
      updateRecaps(formatRecaps(paymentsResouce));
      updateLabels(chartPaymentsLabels(paymentsResouce));
      updateAmountSeries(chartAmountSeries(paymentsResouce));
      updateInstallmentsSeries(chartInstallmentsSeries(paymentsResouce));
    })();
  }, []);

  return (
    <div className='App'>
      <Typography align='left' sx={{ color: '#fff' }} variant='h5' gutterBottom>
        Payments recaps
      </Typography>
      <div className='App__reportings'>
        <PaymentsChart
          amountSeries={amountSeries}
          installmentsSeries={installmentsSeries}
          labels={labels}
        />
        <RecapCardList recaps={recaps} />
      </div>
      <Typography align='left' sx={{ color: '#fff', marginTop: '20px' }} variant='h5' gutterBottom>
        Payments list
      </Typography>
      <PaymentsTable payments={payments} />
    </div>
  );
}

export default App;
