import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  updateProfile,
  signOut,
} from "firebase/auth";
import firebaseConfig from "./firebase.config";
import {} from "firebase/auth";
import { initializeApp } from "firebase/app";

export const initializeLoginFramework = () => {
  initializeApp(firebaseConfig);
};

export const handleGoogleSignIn = () => {
  const auth = getAuth();

  const googleProvider = new GoogleAuthProvider();

  return signInWithPopup(auth, googleProvider)
    .then((result) => {
      const { displayName, photoURL, email } = result.user;
      // console.log(displayName, photoURL, email);
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };
      return signedInUser;
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
};

export const handleSignOut = () => {
  const auth = getAuth();
  return signOut(auth)
    .then((res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        photo: "",
        error: "",
        success: false,
      };
      return signedOutUser;
      console.log(res);
    })
    .catch((err) => {});

  console.log("signed out");
};

export const handleFbSignIn = () => {
  const fbProvider = new FacebookAuthProvider();

  const auth = getAuth();
  return signInWithPopup(auth, fbProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      user.success = true;
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      console.log("fb user after sign in ", user);
      return user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(error);
    });
};

export const signInEmailAndPassword = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

export const createUserEmailAndPassword = (name, email, password) => {
  // console.log('valid email address and password');
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential);
      // const user = userCredential.user;

      // error initializing to empty string.
      const newUserInfo = userCredential.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // console.log(errorCode, errorMessage);

      // storing the error in a state to show on screen.
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

const updateUserName = (name) => {
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName: name,
  })
    .then(() => {
      // Profile updated!
      console.log("user name updated successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
