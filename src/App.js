import { HashRouter as Router } from 'react-router-dom';
import { Routes } from './components/Routes.js'
import './App.css';
import { Layout } from './components/Layout/Layout.js';

function App() {
  return (
    <div>
      <Layout>
        <Router basename='/'>
            <Routes />
        </Router>
      </Layout>
    </div>
  );
}

export default App;