import LandingPage from './pages/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Future import
import SignupPage from './pages/SignUpPage';
import { Provider } from 'react-redux';
import { store } from './store';
import Dashboard from './pages/Dashboard';
import RootLayout from './components/layout/RootLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ApplicationPage from './pages/Application';

function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <RootLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path='application' element={<ProtectedRoute> <ApplicationPage /> </ProtectedRoute>} />
          </Routes>
        </RootLayout>

      </BrowserRouter>
    </Provider>
  );
}

export default App;