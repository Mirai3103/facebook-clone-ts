import React from 'react';
import Toast from '../Components/Toast';
const ToastContext = React.createContext({
    showToast: (header: string | React.ReactNode, children: React.ReactNode, timeOut?: number) => { },
    hideToast: () => { }
});
export default function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toast, setToast] = React.useState<{ header: string | React.ReactNode, children: React.ReactNode, timeOut?: number } | null>(null);
    const showToast = (header: string | React.ReactNode, children: React.ReactNode, timeOut?: number) => {
        setToast({ header, children });
        if (timeOut) {
            setTimeout(() => {
                hideToast();
            }, timeOut);
        }
    }
    const hideToast = () => {
        setToast(null);
    }
    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            {toast && <Toast header={toast.header} onClose={hideToast}>{toast.children}</Toast>}
        </ToastContext.Provider>
    )
}
export const useToast = () => {
    const context = React.useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
