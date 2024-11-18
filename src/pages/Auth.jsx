import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { loginAPI, registerAPI } from '../service/allApi';

const Auth = ({ insideRegister }) => {
  const navigate=useNavigate()
  const [isLoged, setIsLoged] = useState(false)

  const [inputData,setInputData]=useState({
    username:"",email:"",password:""
  })
  
  // console.log(inputData);
  const handleRegister=async(e)=>{
    e.preventDefault()
    console.log("Inside handleRegister");
    if(inputData.username && inputData.email && inputData.password)
    { 
        try
        {
          const result=await registerAPI(inputData)
          if(result.status==200)
          {
            alert("Register Successfull....Please Login!!!")
            navigate('/login')
            setInputData({username:"",email:"",password:""})
          }
          else
          {
            if(result.response.status==406)
            {
              alert(result.response.status)
              setInputData({username:"",email:"",password:""})

            }
          }
        }
        catch(err)
        {
          console.log(err);
        }
    }
    else
    {
      alert("Please Fill the form!!!!")
    }
    
  }

  const handleLogin=async(e)=>{
    e.preventDefault()
    console.log("Inside handleLogin");
    console.log(inputData);
    
    if(inputData.email && inputData.password)
    {
      try{
        const result= await loginAPI(inputData)
        if(result.status==200)
        {
           sessionStorage.setItem("user",JSON.stringify(result.data.user))
           sessionStorage.setItem("token",result.data.token)
           setIsLoged(true)
           setTimeout(()=>{
            setInputData({username:"",email:"",password:""})
            navigate('/tasks')
            setIsLoged(false)
           },2000)

        }
        else
        {
          alert(result.response.data)
        }
      }
      catch(err)
      {
        console.log(err);
        
      }
    }
    else
    {
      alert("Please Fill the form!!!!")
    }
  }
  

  return (
    <>
      <Header/>
      <div style={{  minHeight: '80vh',  width: '100%',    color: '#fff',background: 'linear-gradient(120deg, #4e54c8, #8f94fb)' }}
        className="d-flex bg-secondary justify-content-center align-items-center"
      >
        <div className="container p-4" style={{ maxWidth: '500px' }}>
          <div className="card shadow-lg border-0 p-4">
            <div className="text-center mb-4">
              <h1 className="fw-bold text-dark">
                Task Management
              </h1>
              <h5 className="text-muted">Sign {insideRegister ? 'Up' : 'In'} to Your Account</h5>
            </div>
            <Form>
              {
              insideRegister && (
                <FloatingLabel controlId="floatingInputName" label="Username" className="mb-3" >
                  <Form.Control value={inputData.username} onChange={e=>setInputData({...inputData,username:e.target.value})} type="text" placeholder="Username" />
                </FloatingLabel>
              )
              }
              <FloatingLabel controlId="floatingInput" label="Email Address"  className="mb-3" >
                <Form.Control value={inputData.email} onChange={e=>setInputData({...inputData,email:e.target.value})} type="email" placeholder="name@example.com" />
              </FloatingLabel>
              <FloatingLabel  controlId="floatingPassword" label="Password" className="mb-3" >
                <Form.Control value={inputData.password} onChange={e=>setInputData({...inputData,password:e.target.value})} type="password" placeholder="Password" />
              </FloatingLabel>
              {
                    insideRegister ?
                    <div className="mt-3">
                        <button onClick={handleRegister} className='btn btn-dark mb-2 w-100'>Register</button>
                        <p>Already A User? Please Click here to <Link to={'/login'}>Login</Link></p>
                    </div>
                    :
                    <div className="mt-3">
                        <button onClick={handleLogin} className='btn btn-dark mb-2 w-100'>Login</button>
                        <p>New User?Click here to <Link to={'/register'}>Register</Link></p>
                    </div>
                  }
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
