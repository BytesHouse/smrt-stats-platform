import React from 'react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from '../../../components/LanguageSwitcher';
import { ArrowLine } from '../../../components/ui';
import cls from './ErrorBoundary.module.css';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      return (
        <div className={cls.container}>
          {/* change language component */}
          <LanguageSwitcher />

          <div className={cls.errorPageTextContainer}>
            <div className={cls.logo} />
            <h3>Something went wrong</h3>
            <Link to='/'>Go to home page</Link>
          </div>

          {/* arrow lines */}
          <ArrowLine
            style={{
              bottom: 147,
              color: '#08B839',
              left: '-80px',
              position: 'absolute',
              transform: 'rotate(270deg)',
              width: 300,
            }}
          />
          <ArrowLine style={{
            bottom: 72,
            color: '#08B839',
            left: '50px',
            position: 'absolute',
            transform: 'rotate(270deg)',
            width: 150,
          }}
          />
          <ArrowLine
            style={{
              color: '#FF0000',
              position: 'absolute',
              right: '-100px',
              top: 147,
              transform: 'rotate(90deg)',
              width: 300,
            }}
          />
        </div>
      );
    }

    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}
