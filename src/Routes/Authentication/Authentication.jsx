import SignUpForm from "../../Components/Sign-up-form/SignUpForm";
import SignInForm from "../../Components/Sign-in-form/SignInForm";
import './authentication.scss'


export const Authentication = () => {

    return (
        <div>
            <div className={'authentication-container'}>
                    <SignInForm/>
                    <SignUpForm/>
            </div>
        </div>
    )
}