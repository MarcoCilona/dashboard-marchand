import React from 'react';
import { capitalizeFirstLetter } from '../../utils/helpers';

// Style
import './PaymentDetailInfo.css';

type Props = {
  label: string;
  value: string | number;
};

const PaymentDetailInfo = ({ label, value }: Props) => {
  return (
    <div>
      <p className='PaymentDetailInfo__label'>{capitalizeFirstLetter(label)}</p>
      <p className='PaymentDetailInfo__value'>{value}</p>
    </div>
  );
};

export default PaymentDetailInfo;
