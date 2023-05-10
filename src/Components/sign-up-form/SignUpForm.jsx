import React, {useState} from 'react';
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import {FormInput} from "../form-input/FormInput";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields

    const handleChange = (event) => {
        // console.log(event.target.name);
        // switch (event.target.name) {
        //     case 'displayName':
        //         setFormFields({...formFields, displayName: event.target.value})
        //         break
        //     case 'email':
        //         setFormFields({...formFields, email: event.target.value})
        //         break
        //     case 'password':
        //         setFormFields({...formFields, password: event.target.value})
        //         break
        //     case 'confirmPassword':
        //         setFormFields({...formFields, confirmPassword: event.target.value})
        //         break
        // }
        setFormFields({...formFields, [event.target.name]: event.target.value})
        console.log(formFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            alert("passwords don't mach")
            return
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, { displayName })

            console.log(user)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <h1>Sign Up with your Email</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label={'Display Name'}
                    required={true}
                    type="text"
                    onChange={handleChange}
                    name={'displayName'}
                    value={displayName}
                />
                <FormInput
                    label={'Email Address'}
                    required={true}
                    type="email"
                    onChange={handleChange}
                    name={'email'}
                    value={email}
                />
                <FormInput
                    label={'Password'}
                    required={true}
                    type="password"
                    onChange={handleChange}
                    name={'password'}
                    value={password}
                />
                <FormInput
                    label={'Confirm Password'}
                    required={true}
                    type="password"
                    onChange={handleChange}
                    name={'confirmPassword'}
                    value={confirmPassword}
                />
                <button type={'submit'}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;