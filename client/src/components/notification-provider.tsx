import { Toaster } from 'react-hot-toast';

export function NotificationProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'linear-gradient(145deg, #1a2b3c, #2a3b4c)',
          color: '#f5f5f5',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
        success: {
          iconTheme: {
            primary: '#50c878',
            secondary: '#1a2b3c',
          },
          style: {
            border: '1px solid rgba(80, 200, 120, 0.3)',
          },
        },
        error: {
          iconTheme: {
            primary: '#ff6b6b',
            secondary: '#1a2b3c',
          },
          style: {
            border: '1px solid rgba(255, 107, 107, 0.3)',
          },
        },
      }}
    />
  );
}