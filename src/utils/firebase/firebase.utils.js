import {initializeApp} from 'firebase/app'
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth' //authentication
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore' //database


const firebaseConfig = {
    apiKey: "AIzaSyCao2UzOO1xZAV6HQr-jLJGY3m-vVMVRuQ",
    authDomain: "crwn-clothing-db-3ad78.firebaseapp.com",
    projectId: "crwn-clothing-db-3ad78",
    storageBucket: "crwn-clothing-db-3ad78.appspot.com",
    messagingSenderId: "32649245398",
    appId: "1:32649245398:web:fc3c9379a13db2c2378f77"
};
// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid) //db , collection, data
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)

    //if user data doesn't exist
    //create / set the document with data from userAuth in my collection

    //if user data exists
    //return user data

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        } catch (e) {
            console.error(e)
        }
    }

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password)
}

export const getUserProfile = async () => {
    return auth.currentUser

}
export const signOutUser = async () => await signOut(auth)

export const  onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback)
}