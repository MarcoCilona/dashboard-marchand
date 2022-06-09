import React, { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Utils
import {
  capitalizeFirstLetter,
  currencyPrefix,
  formatNumber,
  formatTimeStamp,
  formatWithoutSymbols,
} from '../../utils/helpers';

// Components
import PaymentDetail from '../PaymentDetail/PaymentDetail';

// Hooks
import usePaymentDetail from '../PaymentDetail/PaymentDetailHook';

import { useTranslation } from 'react-i18next';

type Props = {
  payments: Array<DashboardMarchand.Payment>;
};

const PaymentsTable = ({ payments }: Props) => {
  const { t } = useTranslation();

  const [selectedPaymentId, updateSelectedPaymentId] = useState<string>();
  const [isOpen, setIsOpen] = usePaymentDetail(false);

  const handleRowClick = (payment: DashboardMarchand.Payment) => {
    setIsOpen(true);
    updateSelectedPaymentId(payment.id);
  };

  return (
    <React.Fragment>
      <PaymentDetail open={isOpen} onClose={setIsOpen} paymentId={selectedPaymentId} />
      <TableContainer component={Paper}>
        <Table
          sx={{ backgroundColor: '#40444c', color: '#fff', minWidth: 650 }}
          aria-label='simple table'
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>ID</TableCell>
              <TableCell sx={{ color: '#fff' }} align='right'>
                {capitalizeFirstLetter(t('CREATION'))}
              </TableCell>
              <TableCell sx={{ color: '#fff' }} align='right'>
                {capitalizeFirstLetter(t('AMOUNT'))}
              </TableCell>
              <TableCell sx={{ color: '#fff' }} align='right'>
                {capitalizeFirstLetter(t('INSTALLMENTS'))}
              </TableCell>
              <TableCell sx={{ color: '#fff' }} align='right'>
                {capitalizeFirstLetter(t('CUSTOMER'))}
              </TableCell>
              <TableCell sx={{ color: '#fff' }} align='right'>
                {capitalizeFirstLetter(t('MERCHANT'))}
              </TableCell>
              <TableCell sx={{ color: '#fff' }} align='right'>
                {capitalizeFirstLetter(t('STATUS'))}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment, index) => (
              <TableRow
                data-testid='table-row'
                key={index}
                sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => handleRowClick(payment)}
              >
                <TableCell sx={{ color: '#c6c6c6' }} component='th' scope='row'>
                  {payment.id}
                </TableCell>
                <TableCell sx={{ color: '#c6c6c6' }} align='right'>
                  {formatTimeStamp(payment.created)}
                </TableCell>
                <TableCell sx={{ color: '#c6c6c6' }} align='right'>
                  {currencyPrefix({ value: formatNumber(payment.amount) })}
                </TableCell>
                <TableCell sx={{ color: '#c6c6c6' }} align='right'>
                  {payment.installmentsCount}
                </TableCell>
                <TableCell sx={{ color: '#c6c6c6' }} align='right'>
                  {payment.customer_name}
                </TableCell>
                <TableCell sx={{ color: '#c6c6c6' }} align='right'>
                  {payment.merchant.name}
                </TableCell>
                <TableCell sx={{ color: '#c6c6c6' }} align='right'>
                  {formatWithoutSymbols(payment.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default PaymentsTable;
