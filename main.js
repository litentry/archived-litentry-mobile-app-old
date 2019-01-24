import './shim';
import { registerRootComponent } from 'expo';
import React from 'react';
import App from './App';

class Entry extends React.Component {
  render() {
    return <App />;
  }
}

registerRootComponent(Entry);
