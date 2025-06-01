import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from "react-redux";
import { store } from './app/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext.tsx';
import { FavoriteProvider } from './context/FavoriteContext.tsx';
import { Toaster } from 'react-hot-toast';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
});

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
            <FavoriteProvider>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <Toaster />
                        <App />
                    </Provider>
                </QueryClientProvider>
            </FavoriteProvider>
        </AuthProvider>
    </GoogleOAuthProvider>
)
