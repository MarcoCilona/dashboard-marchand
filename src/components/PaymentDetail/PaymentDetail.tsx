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

import { useTranslation } from 'react-i18next';

type Props = {
  onClose: (event) => void;
  open: boolean;
  paymentId: string;
};

const PaymentDetail = ({ onClose, paymentId, open }: Props) => {
  const { t } = useTranslation();

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
          <DialogTitle sx={{ padding: 0 }}>{t('PAYMENTS_DETAILS')}</DialogTitle>
          <div className='PaymentDetail__basic-info'>
            <PaymentDetailInfo label={t('ID')} value={payment.id} />
            <PaymentDetailInfo label={t('CREATION')} value={formatTimeStamp(payment.created)} />
            <PaymentDetailInfo label={t('MERCHANT')} value={payment.merchant.name} />
            <PaymentDetailInfo label={t('CUSTOMER')} value={payment.customer_name} />
            <PaymentDetailInfo label={t('STATUS')} value={formatWithoutSymbols(payment.status)} />
            <PaymentDetailInfo
              label={t('AMOUNT')}
              value={currencyPrefix({ value: formatNumber(payment.amount) })}
            />
            <PaymentDetailInfo label='installments' value={payment.installmentsCount} />
          </div>
          <div className='PaymentDetail__divider' />
          <Typography align='left' sx={{ color: '#fff' }} variant='h6' gutterBottom>
            {t('PAYMENT_PLAN')}
          </Typography>
          <div className='PaymentDetail__payment-wrapper'>
            <div className='PaymentDetail__payment-plans'>
              {payment.paymentPlan.map((paymentPlan, index) => {
                return (
                  <div className='PaymentDetail__payment-plan' key={index}>
                    <PaymentDetailInfo label={t('ID')} value={paymentPlan.id} />
                    <PaymentDetailInfo
                      label={t('AMOUNT')}
                      value={currencyPrefix({ value: formatNumber(paymentPlan.amount) })}
                    />
                    <PaymentDetailInfo label={t('FEE')} value={paymentPlan.fee} />
                    <PaymentDetailInfo label={t('DUE_DATE')} value={paymentPlan.due_date} />
                    <PaymentDetailInfo label={t('FEE')} value={paymentPlan.fee} />
                    <PaymentDetailInfo
                      label={t('STATUS')}
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
