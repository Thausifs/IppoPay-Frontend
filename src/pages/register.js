import React, { useState } from "react";
import "../css/pages/register.css";
import Logo from "../asserts/logo.png";
import Passwordicon from "../asserts/passwordicon.png";
import Bookicon from "../asserts/bookicon.png";
import InputField from "../components/inputfields";
import { Slide, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import showPwdImg from '../asserts/show-password.svg';
import hidePwdImg from '../asserts/hide-password.svg';




function Register() {
  
   const [user, setUser] = useState({
    email: "",
    password: "",
   });
  const [showregister, setshowregister] = useState(true);
  const [showcheckpass, setshowcheckpass] = useState(false);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [UserCheckPass, SetUserCheckPass] = useState("");


   const SetUserEmail = (e)=> {
    
     setUser({ ...user, email: e.target.value });
     const mail = e.target.value 
     if (RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(mail) === false) {
      
     return  (document.getElementById("alertpara").innerHTML = "Enter valid email id",
      document.getElementById("alertpara").style.color="red")
     }
        document.getElementById("alertpara").innerHTML = "valid email id";
      document.getElementById("alertpara").style.color="Green"

  }
  const SetUserPass = (e)=> {
    
    setUser({ ...user, password: e.target.value });
    AlertText(e);


  }
  const changeformat = () => {
    setshowregister(!showregister)
    setshowcheckpass(!showcheckpass)
  }
  const SetUserCheckPassfn = (e) => {
    SetUserCheckPass(e.target.value)
  }
 
   //This function takes the password as a argument and validate it based on following conditions 
  // 1.	It has at least 6 characters and at most 20 characters 
   // 2.	It contains at least one lowercase letter, at least one uppercase letter, and at least one digit
   //3.	It does not contain three repeating characters in a row 
   
   // Alert text is shown based on the password strength calculated.
 
  const AlertText = (e) => {

    let Password = e.target.value;
    
    document.getElementById("alertpara").style.color = "Red";
     
    let hasTripple = /(.)\1\1/.test(Password);

    if (Password.length < 6) {
      
        document.getElementById("alertpara").innerHTML="Password length must be atleast 6 charcters "
    }
    else if (Password.length > 20) {
      document.getElementById("alertpara").innerHTML="Password length must be below 20 charcters"
    } else if (Password.length >= 6 && Password.length <= 20) {
      if (!Password.match(/[a-z]/)) {
             document.getElementById("alertpara").innerHTML="Password is weak ,must contain atleast one lowercase character"
            
          } else if (!Password.match(/[A-Z]/)){
             document.getElementById("alertpara").innerHTML="Password is weak ,must contain atleast one uppercase character"
      }
      else if (!Password.match(/[0-9]/)){
             document.getElementById("alertpara").innerHTML="Password is weak ,must contain atleast one digit number"
      }
      
       else if (hasTripple === true){
             document.getElementById("alertpara").innerHTML="Password is weak ,must not contain three repeating characters"
      }
      else {
        
        document.getElementById("alertpara").innerHTML = "Password is Strong";
        document.getElementById("alertpara").style.color="Green"
      }
    }


  }
    
  
  // This function validates the input datas and send it to the backend.
  async function Registerdata() {
    if (RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(user.email) === false) {
     return  alert("Email is not valid  ")
    }
    else if (user.password.length < 6 || user.password.length > 20 || !user.password.match(/[a-z]/) || !user.password.match(/[A-Z]/) || !user.password.match(/[0-9]/) ||  RegExp("\\b([a-zA-Z0-9])\\1\\1+\\b").test(user.password)=== true ) {
     return alert ("Password is Weak ")
    }
   
    
    await axios.post(`${process.env.REACT_APP_SERVER}/api/users/register`, user)
       .then(function (response) {
        if (response) {
         
             toast.success(response?.data?.data?.message, {
            autoClose: 2000,
            transition: Slide,
             });
         
          }        
        }
      )
      .catch(function (error) {
        
        toast.error(error.response?.data?.data?.message ?? error, {
          autoClose: 2000,
          transition: Slide,
        });
      }   
     );

  }
  
  //This function calculates the strength of the password 
  const CheckPassword = () => {
   document.getElementById("alertpara").style.color="Red"
    if (UserCheckPass.length < 6) {
     
      const steps = (6 - UserCheckPass.length)
       document.getElementById("alertpara").innerHTML = `${steps} minimum steps required to make the password strong`;
      return steps;
      
    } else if (UserCheckPass.length > 20) {
      const steps = (UserCheckPass.length - 20)
       document.getElementById("alertpara").innerHTML = `${steps} minimum steps required to make the password strong`;
       return steps
    } else if (UserCheckPass.length >= 6 && UserCheckPass.length <= 20 ) {
        if (!UserCheckPass.match(/[a-z]/) && !UserCheckPass.match(/[A-Z]/) && !UserCheckPass.match(/[0-9]/)) {
              document.getElementById("alertpara").innerHTML="minimum 3 steps required to make the password strong"
          return 3;
            
          }else if (!UserCheckPass.match(/[A-Z]/) && !UserCheckPass.match(/[a-z]/)){
             document.getElementById("alertpara").innerHTML="minimum 2 steps required to make the password strong"
          return 2;
      } else if (!UserCheckPass.match(/[0-9]/) && !UserCheckPass.match(/[A-Z]/)){
              document.getElementById("alertpara").innerHTML="minimum 2 steps required to make the password strong"
          return 2;
      }
      else if (!UserCheckPass.match(/[a-z]/) ){
           
        document.getElementById("alertpara").innerHTML="minimum 1 steps required to make the password strong"
          return 1;
      }
       else if (!UserCheckPass.match(/[A-Z]/)){
              document.getElementById("alertpara").innerHTML="minimum 1 steps required to make the password strong"
          return 1;
      }
       else if (!UserCheckPass.match(/[0-9]/) ){
             document.getElementById("alertpara").innerHTML="minimum 1 steps required to make the password strong"
          return 1;
      }else if (RegExp("\\b([a-zA-Z0-9])\\1\\1+\\b").test(UserCheckPass)=== true){
             document.getElementById("alertpara").innerHTML="minimum 10 steps required to make the password strong"
          return 1;
      }
        else if (UserCheckPass.match(/[a-z]/) && UserCheckPass.match(/[A-Z]/) && UserCheckPass.match(/[0-9]/) && !RegExp("\\b([a-zA-Z0-9])\\1\\1+\\b").test(UserCheckPass)=== true) {
          document.getElementById("alertpara").innerHTML = "Zero steps required password is strong "
                  document.getElementById("alertpara").style.color="Green"
          return 0; 
      }

    }
  }
  
  return (
    <>
    
      <div className="loginpgmaindiv">
       
        {showregister? (<>
         <div className="logincard">
          <div className="loginpglogospn">
            <img className="loginpglogo" src={Logo} alt=""></img>
            </div>
              <div>
           
            <p className="loginpgsingninpara">Register </p>
            </div>
            <InputField
            icon={Bookicon}
            placeholder="Username"
            type="Text"
            callback={(e)=>SetUserEmail(e)}
            value={user.Username}
          ></InputField>
          <p id="alertpara"></p>
        
        <div className="input-container">
        <span className="icon">
          <img className="inpfieldicon" src={Passwordicon} alt=""></img>
        </span>
        <input
          className="input-field"
              type={isRevealPwd ? "text" : "password"}
          placeholder="Password"
          name="usrnm"
          onChange={(e) => SetUserPass(e)}
          value={user.password}
            />
            <img className="imgpasswordhide" alt=""
          title={isRevealPwd ? "Hide password" : "Show password"}
          src={isRevealPwd ? hidePwdImg : showPwdImg}
          onClick={() => setIsRevealPwd(prevState => !prevState)}
        />
      </div>
          <>
            <button className="loginpgsubbtn" onClick={Registerdata}>
              Submit
            </button>
          </>
            <input type="checkbox" onClick={changeformat}>
            </input><span>Click to Check/register</span>
         
        </div>

          
          </>

        ) : null};
        {showcheckpass? (<>
         <div className="logincard">
          <div className="loginpglogospn">
            <img className="loginpglogo" src={Logo} alt=""></img>
            </div>
              <div>
           
            <p className="loginpgsingninpara">Check Password </p>
            </div>
            
          <p id="alertpara"></p>
        
        <div className="input-container">
        <span className="icon">
          <img className="inpfieldicon" src={Passwordicon} alt=""></img>
        </span>
        <input
          className="input-field"
              type={isRevealPwd ? "text" : "password"}
          placeholder="Password"
          name="usrnm"
          onChange={(e) => SetUserCheckPassfn(e)}
   
            />
            <img className="imgpasswordhide" alt=""
          title={isRevealPwd ? "Hide password" : "Show password"}
          src={isRevealPwd ? hidePwdImg : showPwdImg}
          onClick={() => setIsRevealPwd(prevState => !prevState)}
        />
      </div>
          <>
            <button className="loginpgsubbtn" onClick={CheckPassword}>
              check
            </button>
          </>
            <input type="checkbox" onClick={changeformat}>
            </input><span>Click to Check/register</span>
          
        </div>

          
          </>

          ):null};
        

          
        <div className="containerwaves">
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgb(83, 151, 211, 50%)"
                
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgb(48, 96, 138, 70%)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgb(23, 58, 89, 90%)"
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}

export default Register;
