import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AttendantDashboard from './pages/attendant/Dashboard';
import ClientDashboard from './pages/client/Dashboard';
import Forbidden from './pages/Forbidden';
import Home from './pages/Home';
import ProtectedRoute from './components/shared/ProtectedRoute';
import './App.css';

const { Content, Footer } = Layout;

function App() {
    return (
    <Provider store={store}>
        <Router>
        <Layout className="layout">
            <Navbar />
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <div className="site-layout-content">
                <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <ProtectedRoute path="/admin" roles={['ADMINISTRADOR']} component={AdminDashboard} />
                <ProtectedRoute path="/attendant" roles={['ACOMODADOR']} component={AttendantDashboard} />
                <ProtectedRoute path="/client" roles={['CLIENTE']} component={ClientDashboard} />
                <Route path="/forbidden" component={Forbidden} />
                <Redirect to="/" />
                </Switch>
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            Sistema de Gestión de Parqueadero ©2023
            </Footer>
        </Layout>
        </Router>
    </Provider>
    );
}

export default App;