import Header from "../components/Header"
import LoginComponent from "../components/LoginComponent.js"
import HomePage from "./Home"

export default function LoginPage(){
    if(sessionStorage.length == 0){
        return (
            <>
        <div>
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'white' }}>
                <div className="max-w-md w-full space-y-8">
                    <Header
                        heading="Login to your account"
                        paragraph="Don't have an account yet? "
                        linkName="Signup"
                        linkUrl="/signup"
                        />
                    <LoginComponent/>
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