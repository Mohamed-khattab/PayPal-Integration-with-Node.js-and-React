import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import PaymentPage from './pages/Payment';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentAgreement from './components/PaymentAgreement';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route exact path="/" component={PaymentAgreement} />
          <Route path="/success" component={PaymentSuccess} />
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
