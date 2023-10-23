import React from 'react';
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

interface configHooks {
    url: AxiosRequestConfig['url'],
    method: AxiosRequestConfig['method'],
    headers?: AxiosRequestConfig['headers'],
    body?: AxiosRequestConfig['data'],
    signal?: AbortController['signal']
}
//Refresh Token jika dibutuhkan
const errInterceptorHandler = async (err: any) => {
    if(err?.response.status === 401 && err.config.url !== '/auth/refresh') {
        // // Check if we can refresh the token
        const res = await axios.request({url: '/auth/refresh', baseURL: BASE_URL, withCredentials: true});
        if(res.status === 200 || res.status === 201){
            const prevRes = await axios.request(err.config);
            return prevRes;
        }
    } else {
        return Promise.reject(err);
    }
}

axios.interceptors.response.use((response: AxiosResponse) => {
    return response
}, errInterceptorHandler)


const useAxiosFetch = <T>(startWithLoading: boolean, fd=false) => {
    const [isLoading, setIsLoading] = React.useState(startWithLoading);
    const [isErr, setErr] = React.useState<AxiosError<{message: string}> | null >(null);
    const [data, setData] = React.useState<T | null>(null);

    const sendRequest = React.useCallback((config: configHooks, callback?: (data: T) => void) => {
        setIsLoading(true);
        setErr(null);
        axios.request({
            url: config.url,
            baseURL: BASE_URL,
            method: config.method,
            headers: config.headers,
            data: ['POST', 'PUT', 'PATCH'].indexOf(config.method as string) > -1 ? fd ? config.body : JSON.stringify(config.body) : JSON.stringify({}),
            signal: config.signal,
            withCredentials: true
        })
        .then(async (res) => {
            if(res && (res.status !== 200 && res.status !== 201 && res.status !== 204)){
                const errData = res.data;
                throw new Error(errData);
            }
            setData(res.data);
            if(callback) callback(res.data);
        })
        .finally(() => {
            setIsLoading(false);
        })
        .catch((err) => {
            setErr(err);
        })
    }, [fd])

    return {
        isLoading: isLoading,
        err: isErr,
        data: data,
        sendRequest: sendRequest,
        setData: setData
    }
}

export default useAxiosFetch;