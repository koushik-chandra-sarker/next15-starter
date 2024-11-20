"use client";
import React from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useState} from "react";
import {login} from "@/app/services/auth/auth.service";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        const callbackUrl: string = new URL(window.location.href).searchParams.get('callbackUrl') || "/";
        await login({username, password}, callbackUrl)
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-600">
            <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
                <div className="text-center mb-6">
                    <h2 className="text-gray-900 text-3xl font-semibold mb-2">Welcome Back</h2>
                    <p className="text-gray-600">
                        Don&#39;t have an account?
                        <a href="#" className="text-blue-500 ml-2 hover:underline">
                            Create today!
                        </a>
                    </p>
                </div>

                <div>
                    <label htmlFor="username" className="block text-gray-900 font-medium mb-2">
                        Username
                    </label>
                    <InputText
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full p-inputtext p-component mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />

                    <label htmlFor="password" className="block text-gray-900 font-medium mb-2">
                        Password
                    </label>
                    <InputText
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-inputtext p-component mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <Checkbox
                                inputId="rememberme"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(!!e.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="rememberme" className="text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-blue-500 hover:underline">
                            Forgot your password?
                        </a>
                    </div>

                    <Button
                        label="Sign In"
                        icon="pi pi-user"
                        onClick={handleLogin}
                        className="w-full bg-blue-500 border-none text-white font-medium rounded-md hover:bg-blue-600"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
