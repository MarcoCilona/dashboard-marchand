import React, { useEffect, useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { retrievePayment } from '../../utils/payments';

// Components
import PaymentDetailInfo from './PaymentDetailInfo';
import {
  currencyPrefix,
  formatNumber,
  formatTimeStamp,
  formatWithoutSymbols,
} from '../../utils/helpers';

// Styles
import './PaymentDetail.css';
import { Typography } from '@mui/material';

type Props = {
  onClose: (event) => void;
  open: boolean;
  paymentId: string;
};

const PaymentDetail = ({ onClose, paymentId, open }: Props) => {
  const [payment, updatePayment] = useState<DashboardMarchand.PaymentDetail>();

  useEffect(() => {
    (async () => {
      if (!paymentId) return;

      const paymentResource = await retrievePayment(paymentId);
      updatePayment(paymentResource);
    })();
  }, [paymentId]);

  if (payment)
    return (
      <Dialog
        data-testid='payment-detail'
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        onClose={() => onClose(false)}
      >
        <DialogContent sx={{ backgroundColor: '#40444c', color: '#fff' }}>
          <DialogTitle sx={{ padding: 0 }}>Payment details</DialogTitle>
          <div className='PaymentDetail__basic-info'>
            <PaymentDetailInfo label='id' value={payment.id} />
            <PaymentDetailInfo label='creation' value={formatTimeStamp(payment.created)} />
            <PaymentDetailInfo label='merchant' value={payment.merchant.name} />
            <PaymentDetailInfo label='customer' value={payment.customer_name} />
            <PaymentDetailInfo label='status' value={formatWithoutSymbols(payment.status)} />
            <PaymentDetailInfo
              label='amount'
              value={currencyPrefix({ value: formatNumber(payment.amount) })}
            />
            <PaymentDetailInfo label='installments' value={payment.installmentsCount} />
          </div>
          <div className='PaymentDetail__divider' />
          <Typography align='left' sx={{ color: '#fff' }} variant='h6' gutterBottom>
            Payment plan
          </Typography>
          <div className='PaymentDetail__payment-wrapper'>
            <div className='PaymentDetail__payment-plans'>
              {payment.paymentPlan.map((paymentPlan, index) => {
                return (
                  <div className='PaymentDetail__payment-plan' key={index}>
                    <PaymentDetailInfo label='id' value={paymentPlan.id} />
                    <PaymentDetailInfo
                      label='amount'
                      value={currencyPrefix({ value: formatNumber(paymentPlan.amount) })}
                    />
                    <PaymentDetailInfo label='fee' value={paymentPlan.fee} />
                    <PaymentDetailInfo label='due date' value={paymentPlan.due_date} />
                    <PaymentDetailInfo label='fee' value={paymentPlan.fee} />
                    <PaymentDetailInfo
                      label='status'
                      value={formatWithoutSymbols(paymentPlan.status)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/*
    
    
    */}
        </DialogContent>
      </Dialog>
    );

  return null;
};

export default PaymentDetail;
