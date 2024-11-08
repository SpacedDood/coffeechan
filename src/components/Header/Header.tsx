import PowerSpace from './spaced.png';
import './header.css';

function Header() {
  return (
    <div className="coffeeHeader">
      <h3>Coffee Chan</h3>
      <div className="midAlign">
        powered by <img src={PowerSpace} />
      </div>
    </div>
  );
}

export default Header;
