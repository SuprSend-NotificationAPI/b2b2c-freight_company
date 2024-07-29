import type { AppProps } from 'next/app'; // Import the AppProps type
import '../styles/globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import dynamic from 'next/dynamic';
import 'react-toastify/dist/ReactToastify.css'; // For toast notifications

const SuprSendInbox = dynamic(() => import('@suprsend/react-inbox'), { ssr: false });

// Ensure environment variables are defined
const workspaceKey = process.env.NEXT_PUBLIC_SUPRSEND_WORKSPACE_KEY || '';
const subscriberId = process.env.NEXT_PUBLIC_SUPRSEND_SUBSCRIBER_ID || '';
const distinctId = process.env.NEXT_PUBLIC_SUPRSEND_DISTINCT_ID || '';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      {/* App Inbox Component */}
      <div className="fixed top-0 right-0 m-4 z-50">
        <SuprSendInbox
          workspaceKey={workspaceKey}
          subscriberId={subscriberId}
          distinctId={distinctId}
          themeType="dark"
        />
      </div>
    </>
  );
}

export default MyApp;
