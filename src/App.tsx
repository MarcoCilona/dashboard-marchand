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

import { sortArray } from './utils/helpers';

// Components
import PaymentsChart from './components/PaymentsChart/PaymentsChart';
import PaymentsTable from './components/PaymentsTable/PaymentsTable';
import RecapCardList from './components/RecapCardList/RecapCardList';

import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  const [amountSeries, updateAmountSeries] = useState([]);
  const [installmentsSeries, updateInstallmentsSeries] = useState([]);
  const [labels, updateLabels] = useState([]);
  const [payments, updatePayments] = useState([]);
  const [recaps, updateRecaps] = useState([]);

  useEffect(() => {
    (async () => {
      const paymentsResouce = await retrievePayments();
      updatePayments(sortArray({ array: paymentsResouce, key: 'status' }));
      updateRecaps(formatRecaps(paymentsResouce));
      updateLabels(chartPaymentsLabels(paymentsResouce));
      updateAmountSeries(chartAmountSeries(paymentsResouce));
      updateInstallmentsSeries(chartInstallmentsSeries(paymentsResouce));
    })();
  }, []);

  return (
    <div className='App'>
      <Typography align='left' sx={{ color: '#fff' }} variant='h5' gutterBottom>
        {t('PAYMENTS_RECAPS')}
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
        {t('PAYMENTS_LIST')}
      </Typography>
      <PaymentsTable payments={payments} />
    </div>
  );
}

export default App;
