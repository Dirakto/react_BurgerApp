import { useState, useEffect } from 'react'

export default httpClient => {
        
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.response.use(res => res, error => {
        setError(error);
    });
    const resInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });
    
    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor]);
    
    const errorConfirmedHandler = () => {
        setError(null);
    }
    
    return [error, errorConfirmedHandler];
};
