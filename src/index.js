import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/freakflags.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ErrorServerBoundary } from 'components/ErrorPage/ErrorPage';
import ThemeProvider from 'providers/ThemeProvider/ThemeProvider';
import App from './components/App/App';
// import reportWebVitals from "./reportWebVitals";
import { StoreProvider } from './providers/storeProvider';
import { ErrorBoundary } from './providers/ErrorBoundary';

// process.env.REACT_APP_MODE !== "test" && localStorage.setItem("token", "123");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <BrowserRouter>
    <ThemeProvider>

      <ErrorServerBoundary>
        <ErrorBoundary>
          <StoreProvider>
            <App />
          </StoreProvider>
        </ErrorBoundary>
      </ErrorServerBoundary>
    </ThemeProvider>

  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
