import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import {ToastContainer} from 'react-toastify'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
            <ToastContainer/>
		</QueryClientProvider>
	</StrictMode>
);
