import React, {useState, useContext} from 'react';
import {
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import {FormInput} from "../Form-input/FormInput";
import './sign-in-form.styles.scss'
import {Button} from "../Button/Button";
import {UserContext} from "../../Contexts/User.context";

const defaultFormFields = {
    email: '',
    password: ''
}
const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields

    const { setCurrentUser } = useContext(UserContext)

    const handleChange = (event) => {

        setFormFields({...formFields, [event.target.name]: event.target.value})
        console.log(formFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password)

            setCurrentUser(user)
        } catch (err) {
            switch (err.code) {
                case 'auth/wrong-password':
                    alert('wrong Email or Password')
                    break
                case 'auth/user-not-found':
                    alert('no user with this email exist')
                    break
                default:
                    console.error(err)
            }
        }
        resetFormFields()
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
        setCurrentUser(user)
    }

    return (
        <div className={'sign-in-container'}>
            <h2>Already have an account?</h2>
            <span>Sign In with your Email</span>
            <form onSubmit={handleSubmit}>

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
                <div className={'buttons-container'}>
                    <Button type={'submit'}>Sign In</Button>
                    <Button type={'button'} onClick={logGoogleUser} buttonType={'google'}>Sign in with Google</Button>
                </div>

            </form>
        </div>
    );
};

export default SignInForm;