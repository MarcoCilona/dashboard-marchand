import React from 'react';
import { capitalizeFirstLetter } from '../../utils/helpers';

// Style
import './PaymentDetailInfo.css';

type Props = {
  dataTestid?: string;
  label: string;
  value: string | number;
};

const PaymentDetailInfo = ({ dataTestid, label, value }: Props) => {
  return (
    <div data-testid={dataTestid}>
      <p className='PaymentDetailInfo__label'>{capitalizeFirstLetter(label)}</p>
      <p className='PaymentDetailInfo__value'>{value}</p>
    </div>
  );
};

export default PaymentDetailInfo;
