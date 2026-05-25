import React, { captureOwnerStack } from "react";
import { Children } from "react";
export const AuthContext = React.createContext();

export const AuthContext = ({Children})=>{
    const [user,setUser]=React.useState(null);
    const [loading,setLoading]=React.userState(true);

    React.useEffect(()=>{
        const StorageUser = localStorage.getItem("user");
        if(StorageUser){
            setUser(JSON.parse(StorageUser))
        }
        setLoading(false)

        },[])

        const login = async(email,password)=>{
            try{
                const {data}=await api.post('/auth/login',{email,password})
                setUser(data)
                localStorage.setItem("user",JSON.stringify(data))
                localStorage.setItem("token",data.token)
                return data;

                
            }
            catch(err){
                console.log("login failed",err)
            }
        }
        
        const register = async (name,email,password) =>{
            try{
                const {data} = await api.post('/auth/register',{name,email,password})
                setUser(data);
                return data;
            }

            catch(err){
                console.log("Register failed",err)
                throw err;
            }
        }

        const verifyotp = async()=>{
            try{
                const {data} = await api.post('/auth/verify-otp')
            setUser(data)
            localStorage.setItem("user",JSON.stringify(data));
            localStorage.setItem("token",JSON.token)
            return data;
        }
    
        catch(err){
            console.log("OTP verifycation failed",err);

        }
    }

    const logout =()=>{
        setUser(null);
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }

        return(
            <AuthContext.provider value={{ user ,loading ,login,logout,verifyotp,register}}>
                {Children}
            </AuthContext.provider>
        )
    }