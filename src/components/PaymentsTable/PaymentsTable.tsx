import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Utils
import { currencyPrefix, formatNumber, formatWithoutSymbols } from '../../utils/helpers';

type Props = {
  payments: Array<DashboardMarchand.Payment>;
};

const PaymentsTable = ({ payments }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ backgroundColor: '#40444c', color: '#fff', minWidth: 650 }}
        aria-label='simple table'
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#fff' }}>ID</TableCell>
            <TableCell sx={{ color: '#fff' }} align='right'>
              Creation date
            </TableCell>
            <TableCell sx={{ color: '#fff' }} align='right'>
              Amount
            </TableCell>
            <TableCell sx={{ color: '#fff' }} align='right'>
              Installments
            </TableCell>
            <TableCell sx={{ color: '#fff' }} align='right'>
              Customer
            </TableCell>
            <TableCell sx={{ color: '#fff' }} align='right'>
              Merchant
            </TableCell>
            <TableCell sx={{ color: '#fff' }} align='right'>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell sx={{ color: '#c6c6c6' }} component='th' scope='row'>
                {payment.id}
              </TableCell>
              <TableCell sx={{ color: '#c6c6c6' }} align='right'>
                {payment.created}
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
  );
};

export default PaymentsTable;
