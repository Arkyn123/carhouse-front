'use client'

import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';

export interface GlobalContextType {
    globalVariable: string;
    setGlobalVariable: Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [globalVariable, setGlobalVariable] = useState('467827020');

    return (
        <GlobalContext.Provider value={{ globalVariable, setGlobalVariable }}>
            {children}
        </GlobalContext.Provider>
    );
};
