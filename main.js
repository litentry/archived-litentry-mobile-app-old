import './shim'
import { registerRootComponent } from 'expo';
import React from 'react';
import App from "./App";

console.log('Buffer is', Buffer)


class Entry extends React.Component {
  render() {
    return <App />;
  }
}

registerRootComponent(Entry);