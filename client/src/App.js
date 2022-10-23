import Header from "./components/layout/Header";
import { BrowserRouter } from "react-router-dom";
import Router from "../src/router/index";
import './App.css';
import { Toaster } from 'react-hot-toast';
import './styles/main.css';
import './styles/bootstrap.min.css';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <Toaster toastOptions={{
        className: '',
        style: {
          borderRadius: '10px',
          background: '#cd5c9b',
          color: '#fff',
        },
      }} />
    </BrowserRouter>
  );
}


