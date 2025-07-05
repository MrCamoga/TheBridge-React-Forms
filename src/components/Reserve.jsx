import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './form.scss'

const Reserve = () => {
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
        telephone: value => [/^(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/.test(value), 'Invalid phone number'],
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
            setMessage('Reservation successfully made')
            localStorage['reserve'] = JSON.stringify(data)
            setTimeout(() => navigate('/'),1500)
        }
    }

    return (
        <>
            <h1>Make a reservation</h1>
            <form onSubmit={handleSubmit} className='form'>
                <div>
                    <label htmlFor='name'>Name: </label>
                    <input type='text' id='name' name='name' placeholder='Name' onChange={handleInputChange} required/>
                </div>
                <div>
                    <label htmlFor='telephone'>Phone number: </label>
                    <input type='tel' id='telephone' name='telephone' placeholder='+34XXXXXXXXX' onChange={handleInputChange} required/>
                </div>
                <div>
                    <label htmlFor='date'>Date: </label>
                    <input type='date' id='date' name='date' min={new Date().toISOString().split('T')[0]} placeholder='' onChange={handleInputChange} required/>
                </div>
                <div>
                    <label htmlFor='guests'>Number of guests: </label>
                    <input type='number' id='guests' name='guests' min='0' placeholder='' value='1' onChange={handleInputChange} required/>
                </div>
                <span className={messageType}>{message}</span>
                <input type='submit' value='Send'/>
            </form>
        </>
    )
}

export default Reserve