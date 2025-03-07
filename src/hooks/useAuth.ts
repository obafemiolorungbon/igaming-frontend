import { useRouter } from "next/navigation";

// utils
import { saveCookie, COOKIE_KEYS } from "@/utils/cookie";

// routes
import { ROUTES } from '@/config/routes';
import { useCallback } from "react";

interface HandleAuth {
    token:string;
    action: 'REGISTER' | 'LOGIN' | 'LOGOUT';
}

export const useHandleAuth = () => {
    const router = useRouter();


    const handleAuth = useCallback(({token, action}:HandleAuth) => {
        // save token to cookies
        if(action === 'REGISTER' || action === 'LOGIN'){
            saveCookie(COOKIE_KEYS.ACCESS_COOKIE, token);
            router.push(ROUTES.app.dashboard);
        }
    
        // redirect to login
        if(action === 'LOGOUT'){
            saveCookie(COOKIE_KEYS.ACCESS_COOKIE, '');
            router.push(ROUTES.auth.login);
        }   
    }, []);
  

    return {handleAuth}
    
}