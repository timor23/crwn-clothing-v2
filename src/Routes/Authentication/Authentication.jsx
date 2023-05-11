import {signInWithGooglePopup, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../Components/sign-up-form/SignUpForm";
import {Button} from "../../Components/Button/Button";


export const Authentication = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
    }
    return (
        <div>
            <h1>SIGN IN PAGE</h1>
            <Button onClick={logGoogleUser} buttonType={'google'}>Sign in with Google</Button><br/>
            <SignUpForm />
        </div>
    )
}