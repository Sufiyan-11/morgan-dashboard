import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import PrivateRoute from './common/guards/PrivateRoute';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from './pages/SignUp/SignUp';
import Blogs from './pages/Blogs/Blogs';
import ContactLeads from './pages/Leads/ContactLeads';
import DonorLeads from './pages/Leads/DonorLeads';
import NeedyLeads from './pages/Leads/NeedyLeads';
import Gallery from './pages/Gallery/Gallery';
import CarrerDetails from './pages/CarrersDetails/CarrerDetails'
import './App.css';
import Testimonails from './pages/Testimonails/Testimonails';
import Careers from './pages/Careers/Careers';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/blogs" component={Blogs} />
          <PrivateRoute path="/testimonails" component={Testimonails} />
          <PrivateRoute path="/contact-leads" component={ContactLeads} />
          <PrivateRoute path="/donor-leads" component={DonorLeads} />
          <PrivateRoute path="/needy-leads" component={NeedyLeads} />
          <PrivateRoute path="/gallery" component={Gallery} />
          <PrivateRoute path="/job-openings" component={Careers} />
          <PrivateRoute path="/carrer-details" component={CarrerDetails} />
          <Route path="/Login" component={Login} />
          <Route path="/morgan-dashboard-SignUp" component={SignUp} />
          <Route exact path="*" component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
