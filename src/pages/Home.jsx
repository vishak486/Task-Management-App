import React from 'react';
import Header from '../components/Header';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header />
      <div
        style={{
          height: '80vh',
          background: 'linear-gradient(120deg, #4e54c8, #8f94fb)',
        }}
        className="d-flex flex-column justify-content-center align-items-center text-white"
      >
        <div className="container d-flex flex-column flex-lg-row align-items-center justify-content-between">
          {/* Left Content */}
          <div className="text-center text-lg-start col-lg-6">
            <h1 className="display-4 fw-bold mb-4">
              Welcome to <span style={{ color: '#f9d342' }}>Task Manager</span>
            </h1>
            <p className="lead mb-4">
              Streamline your daily tasks, set reminders, and track progress effortlessly with our intuitive Task Manager.
            </p>
            
            <Link to={'/login'}  className="btn btn-warning btn-lg fw-bold px-4">Get Started</Link>

          </div>

          {/* Right Content */}
          <div className="col-lg-6 mt-5 mt-lg-0 text-center">
            <img
              style={{ maxWidth: '100%', maxHeight: '400px' }}
              className="img-fluid shadow-lg rounded"
              src="https://cdn.prod.website-files.com/5d9ffc249511353e753840c9/62a9b7bf28a7abc8de9a5dbd_what%20is%20a%20pmo.gif"
              alt="Task Manager"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
