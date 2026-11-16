import { createContext, useState,useContext, useEffect } from "react";
import supabase from "../supabase-client";

const AuthContext = createContext()


export default function AuthcontextProvider ({children}){
   const [session, setSession] = useState(undefined)
   useEffect(()=>{
    async function getsession(){
        try {
            const{data, error} = await supabase.auth.getSession()
            if(error){
                throw error
            }
            setSession(data.session)
        } catch (error) {
            console.error("Error getting session:", error.message)
        }
    }
    getsession()
    supabase.auth.onAuthStateChange((_event, session)=>{
        setSession(session)
    })
   },[])
//    sign in function
   async function signIn(email, password){
    try {
        const{data, error} = await supabase.auth.signInWithPassword({email:email.toLowerCase(), password:password})
        if(error){
            return {success: false, error: error.message}
        }
        return {success:true, data}
    } catch (error) {
        return {sucess:false, error:"An unexpected error occured. please, try again"}
    }
   }
// signOut function
   async function signOut (){
    try {
        const{error, success} = await supabase.auth.signOut()
        if(error){
            return {success:false, error:error.message}
        }
        return{success:true}
    } catch (error) {
        return{success:false, error: error.message}
    }
   }
//    signUp function
async function signUpNewUser(email, password, name, account_type){
    try {
    const {error, data} = await supabase.auth.signUp({email:email.toLowerCase(), password:password}) 
    if(error){
        return {success:false, error:error.message}
    }
    return {success: true, data}
    } catch (error) {
        return {success:false, error: "An unexpected error occured during sign up."}
    }
}

    return(
        <AuthContext.Provider value={{session,signIn,signOut, signUpNewUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}
