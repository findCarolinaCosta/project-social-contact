import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './components/Profile';
import Connections from './components/Connections';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isLogin: false,
    };
  }

  render() {
    const confirmIfLogin = (action) => {
      const { isLogin } = this.state;
      if (action) {
        return this.setState({
          isLogin: action,
        });
      }
      console.log(isLogin);
    };

    return (
      <div className="gitNetwork d-flex flex-column justify-content-center">
        <Profile
          { ...this }
          { ...this.state }
          { ...this.props }
          confirmIfLogin={ confirmIfLogin }
        />
        <Connections
          { ...this }
          { ...this.state }
          confirmIfLogin={ confirmIfLogin }
        />
      </div>
    );
  }
}

export default App;
