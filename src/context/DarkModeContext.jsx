import { createContext, useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import useLocalStorageState from '../hooks/useLocalStorageState';
const DarkModeContext = createContext();

const DarkModeProvider = ({children}) =>{
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia('prefers-color-scheme: dark').matches, 'isDarkMode');
    //**! instead of false vlaue in hook we set user system settings to set dark mode or light mode */
     ///value and key and uselocal storage is custom hook that store state in local storage
    
    useEffect(()=>{
        if(isDarkMode){
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode')
        } else {
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.classList.add('light-mode')
        }
    },[isDarkMode]);
    
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    return (
        <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

//custom hook
const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if(!context){
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
}

DarkModeProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { useDarkMode, DarkModeProvider };