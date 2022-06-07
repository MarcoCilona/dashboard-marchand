import React from 'react';

const usePaymentDetail = (value: boolean): [boolean, (event: any) => void] => {
  const [isOpen, setIsOpen] = React.useState(value);

  return [
    isOpen,
    (event) => {
      setIsOpen(event);
    },
  ];
};

export default usePaymentDetail;
