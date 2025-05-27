import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import SignInScreen from './components/SignInScreen';
import CreateAccountScreen from './components/CreateAccountScreen';
import AccountSettingsScreen from './components/AccountSettingsScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/sign-in" element={<SignInScreen />} />
        <Route path="/create-account" element={<CreateAccountScreen />} />
        <Route path="/account-settings" element={<AccountSettingsScreen />} />
      </Routes>
    </Router>
  );
}

export default App;