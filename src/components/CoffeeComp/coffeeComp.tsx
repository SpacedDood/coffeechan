import { useState, useEffect, useRef } from 'react';
import CoffeeJug from './svg/coffeeJug.svg';
import CoffeeMachine from './svg/coffeeMachine.svg';
import Beans from './Beans';
import './coffeeComp.css';

interface CoffeeCompProps {
  active: boolean;
  status: string;
  percent: number;
  duration: number;
}

export const CoffeeComp: React.FC<CoffeeCompProps> = ({
  active,
  status,
  percent,
  duration,
}) => {
  function getMinutes() {
    return Math.floor(duration / 60);
  }

  function getSeconds() {
    let count = duration % 60;
    if (count < 10) {
      count = '0' + count;
    }
    return count;
  }

  return (
    <div className={'coffeeCont'}>
      <Beans running={status === 'brewbeans'} />
      <div className={'coffeeComp '}>
        <img className="machine" src={CoffeeMachine} />
        <div className="jug">
          <img className="" src={CoffeeJug} />
          <div className="coffeeMask">
            <div
              className="coffeeLevel"
              style={{
                height:
                  (active ? 100 : 0) +
                  (status === 'coffeeDone' ? 100 : 0) +
                  (120 * percent) / 100,
              }}
            >
              <div
                /*key={Math.random()}*/
                className="bubble"
                /*style={{
                  left: Math.random() * 200 + 'px',
                  transitionDelay: '' + Math.random() * 5,
                }}*/
              ></div>
            </div>
          </div>
        </div>
        <div className="coffeePercent">
          {getMinutes()}:{getSeconds()}
        </div>
      </div>
    </div>
  );
};

export default CoffeeComp;
