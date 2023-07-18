import HomePage from "./Home";
import Header from "../components/Header";
import SignupComponent from "../components/SignupComponent";

export default function SignupPage(){
    if(sessionStorage.length == 0){
        return (
            <>
        <div>
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'white' }}>
                <div className="max-w-md w-full space-y-8">
                    <Header
                        heading="Signup to create an account"
                        paragraph="Already have an account? "
                        linkName="Login"
                        linkUrl="/loginPage"
                    />
                    <SignupComponent/>
                </div>
            </div>
        </div>
        </>
            
        )
    }else{
        return(
            <HomePage />
        )
    }
}