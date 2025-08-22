import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
// import { Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import './index.css'
const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')  
    const navigate = useNavigate()

   const loginToHomePage = (token) => {
        Cookies.set('jwt_token', token, {expires: 30})
        navigate('/')
    }

    const onSubmitForm = async event => {
        event.preventDefault()

        if(email === '' || password === ''  || name === '' || age === '' ){
            setErrorMsg('Please enter email and password')      
            return
        }

        setEmail('')
        setPassword('') 
        const userDetails = {
            email,
            password,
            name,
            age
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        }
        const url = "https://carsstorebackend.onrender.com/register"
        const response = await fetch(url, options)
        console.log(response)
        if(response.ok){
            const data = await response.json()
            loginToHomePage(data.token)
            setErrorMsg('')
        }else{
            setErrorMsg('Invalid email or password')
        }
    }

    const onChangeshowPassword = () => {
        setShowPassword(prevState => !prevState)
    }
    const onChangeEmail = event => {
        setEmail(event.target.value)
    }   
    const onChangePassword = event => {
        setPassword(event.target.value)
    }
     const onChangeName = event => {
        setName(event.target.value)
    }
     const onChangeAge = event => {
        setAge(event.target.value)
    }

    const token = Cookies.get('jwt_token')
    if(token !== undefined){    
        navigate('/')
    }

    return(
        <div className="login-conatiner">
            <div className='register-card'>
                <img src="https://e7.pngegg.com/pngimages/250/321/png-clipart-bmw-logo-bmw-car-logo-bmw-logo-trademark-logo-thumbnail.png" alt="logo" className='login-logo' />
                <h1 className='="login-header'>Register</h1>
                <form className='login-form' onSubmit={onSubmitForm} >
                    <label htmlFor='name'>Name*</label>
                    <input id="name" type='text' className='login-input' onChange={onChangeName} />
                    <label htmlFor='age'>Age*</label>
                    <input id="age" type='number' className='login-input' onChange={onChangeAge} />
                    <label htmlFor='email'>Email*</label>
                    <input id="email" type='text' className='login-input' onChange={onChangeEmail} />
                    <label htmlFor='password'>Password*</label>
                    <input id="password" type={showPassword ? 'text' : 'password'} className='login-input' onChange={onChangePassword} />
                    <div className='new-user-show-pass'>
                        <Link to='/login' className='new-user-link' >Login?</Link>
                        <div className='show-password-container'>
                            <input id='show-pass' type="checkbox" onChange={onChangeshowPassword} className='checkbox-element' />
                            <label htmlFor="show-pass">Show Password</label>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className='login-btn'>Register</button>
                        <p className='error-msg'>{errorMsg}</p>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Register