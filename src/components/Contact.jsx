import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './form.scss'

const Contact = () => {
    const [message,setMessage] = useState('')
    const [messageType, setMessageType] = useState('error')
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const field = event.target.name
        const value = event.target.value
        if(validateAndPrint(validation[field], value)) setMessage('')
    }

    const validation = {
        name: value => [value.length >= 2, 'Name must be 2 characters or longer'],
        email: value => [/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(value), 'Invalid email'],
        message: value => [value.length >= 50, 'Message must be 50 characters or longer']
    }

    const validateAndPrint = (validation, value) => {
        const [valid, msg] = validation(value)
        if(!valid) setMessage(msg)
        return valid
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())
        
        const valid = Object.entries(validation).every(entry => validateAndPrint(entry[1], data[entry[0]]))
        if(valid) {
            setMessageType('success')
            setMessage('Message sent')
            localStorage['contact'] = JSON.stringify(data)
            setTimeout(() => navigate('/'),1500)
        }
    }

    return (
        <>
            <h1>Contact</h1>
            <form onSubmit={handleSubmit} className='form'>
                <div>
                    <label htmlFor='name'>Name: </label>
                    <input type='text' id='name' name='name' placeholder='Name' onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input type='text' id='email' name='email' placeholder='Email' onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor='message'>Message: </label>
                    <textarea type='text' id='message' name='message' placeholder='' onChange={handleInputChange}></textarea>
                </div>
                <span className={messageType}>{message}</span>
                <input type='submit' value='Send'/>
            </form>
        </>
    )
}

export default Contact