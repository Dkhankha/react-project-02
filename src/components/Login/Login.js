import React, { useState,useReducer,useContext } from 'react';

import AuthContext from '../../Store/Auth-context';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../Input/Input';


const emailReducer = (state , action) => {
  if(action.type === "USER_INPUT") {
    return { value: action.val , isValid: action.val.includes('@')}
  }
  if(action.type === "INPUT_BLUR"){
    return { value: state.value , isValid: state.value.includes("@")}
  }
return { value:'' , isValid: false}
} 

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, { value:'' , 
  isValid: null
})
 
const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
  value: '',
  isValid: null,
});

const authCtx = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollName, setEnteredCollName] = useState('')
  const [collegeIsValid, setCollegeIsValid] = useState();
  
  const [formIsValid, setFormIsValid] = useState(false);
  // useEffect(() => {
  //   console.log("effect")
  // })
  // useEffect(() => {
  //   const identifier =  setTimeout(() => {
  //     console.log("chal")
  //   setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //   );
  //  }, 500);
  //  return () => {
  //   console.log("dikha")
  //   clearTimeout(identifier)
  //  };
  // },[enteredEmail,enteredPassword])
 
  
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    );
  };
  
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };
  
  const validateEmailHandler = () => {
    dispatchEmail({type: "INPUT_BLUR"})
  };
  
  const validatePasswordHandler = () => {
   dispatchPassword({type:"INPUT_BLUR"})
  };
  
  const collegeChangeHandler = (event) => {
    setEnteredCollName(event.target.value)
  }

  const validatecollegeHandler = (event) =>{
    setCollegeIsValid(enteredCollName.trim().length > 5)
  }
  const submitHandler = (event) => {
    event.preventDefault();
     authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
       <Input id="email" label="E-mail" type="email" isValid={emailState} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}/>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="coll"
            value={enteredCollName}
            onChange={collegeChangeHandler}
            onBlur={validatecollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;