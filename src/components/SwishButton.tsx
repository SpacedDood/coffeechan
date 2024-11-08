import React from 'react';
import './SwishButton.css';

interface SwishButtonProps {
  active: boolean;
  toggle: () => void;
  inactiveText?: string;
  activeText?: string;
  iconText?: Element | string;
}

export const SwishButton: React.FC<SwishButtonProps> = ({
  active,
  toggle,
  inactiveText = 'Inactive',
  activeText = 'Active',
  iconText = '☕',
}) => {
  return (
    <div className={`swish ${active ? 'show-active' : ''}`} onClick={toggle}>
      <div className="swish-fill start">{inactiveText}</div>
      <div className="swish-fill end">{activeText}</div>
      <div className="slide">
        <div className="slide-inner">{iconText}</div>
      </div>
    </div>
  );
};

export default SwishButton;
