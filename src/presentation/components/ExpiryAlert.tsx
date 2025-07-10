import React from 'react';

interface ExpiryAlertProps {
  isExpired: boolean;
  productName: string;
}

const ExpiryAlert: React.FC<ExpiryAlertProps> = ({ isExpired, productName }) => {
  if (!isExpired) return null;

  return (
    <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px' }}>
      <strong>Atenção!</strong> O produto <em>{productName}</em> está vencido.
    </div>
  );
};

export default ExpiryAlert;