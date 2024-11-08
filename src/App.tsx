/*import viteLogo from '/vite.svg';*/
import './App.css';
import Splash from './views/Splash';
import Header from './components/Header/Header';
import FancyBG from './components/FancyBG/FancyBG';
function App() {
  return (
    <div className="app">
      <FancyBG />
      <Header />
      <Splash />
    </div>
  );
}

export default App;
