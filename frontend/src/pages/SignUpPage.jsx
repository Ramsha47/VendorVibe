import React from 'react'
import Signup from '../components/Signup/Signup'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const {isAuthenticated} = useSelector((state) => state.user);
  const navigate = useNavigate();
    
  useEffect(() => {
        if(isAuthenticated === true){
            navigate("/");
        }
    }, []);

  return (
    <div>
       <Signup />
   </div>
  )
}

export default SignUpPage