//@ts-ignore
import axios, {AxiosResponse, InternalAxiosRequestConfig} from "axios";
import { getCurrentUser } from "./auth";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    timeout: 20000,
    timeoutErrorMessage: "Timeout exceeded! Try again.",
    validateStatus: function (status) {
        return (status >= 200 && status < 300) || status === 408;
    },
});

axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const user = await getCurrentUser();
        
        if (user) {
            const userIdToken = await user.getIdToken();
            config.headers.Authorization = `Bearer ${userIdToken}`;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse<any, any>) => response,
    (error: { response: { status: number, data: any } }) => {
        if (
            (error.response && error.response.status !== 200) ||
            (error.response && error.response.status !== 201) ||
            (error.response && error.response.data.message === "Invalid token") ||
            (!error.response)
        ) {
            // TODO: Add more error cases and action to be implemented if there's an error.
        }
        return Promise.reject(error);
    }
);

export class HttpClient {
    static async get<T>(url: string, params?: unknown) {
        try {
            const response = await axiosInstance.get<T>(url, {params});
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return { error }
        }
    }

    static async post<T>(url: string, data: unknown, options?: any) {
        try {
            const response = await axiosInstance.post<T>(url, data, options);
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return { error }
        }
    }

    static async put<T>(url: string, data: unknown, options?: any) {
        try {
            const response = await axiosInstance.put<T>(url, data, options);
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return { error }
        }
    }

    static async patch<T>(url: string, data: unknown, options?: any) {
        try {
            const response = await axiosInstance.patch<T>(url, data, options);
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return { error }
        }
    }

    static async delete<T>(url: string) {
        try {
            const response = await axiosInstance.delete<T>(url);
            return {
                data: response.data,
                status: response.status
            };
        } catch (error) {
            return { error }
        }
    }
}