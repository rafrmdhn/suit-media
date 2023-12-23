import logo from './logo.svg';
import Navbar from './components/navbar';
import Banner from './components/banner';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner
        imageUrl="https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg"
        title="Ideas"
        subtitle="Where all our great things begin"
      />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
