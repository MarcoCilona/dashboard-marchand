import React, { SetStateAction } from 'react';

const usePaymentDetail = (value: boolean): [boolean, (event: SetStateAction<boolean>) => void] => {
  const [isOpen, setIsOpen] = React.useState(value);

  return [
    isOpen,
    (event) => {
      setIsOpen(event);
    },
  ];
};

export default usePaymentDetail;
