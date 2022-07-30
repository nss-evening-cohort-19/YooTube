/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
<<<<<<< HEAD
import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
=======
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider> {/* gives children components access to user and auth methods */}
      <ViewDirectorBasedOnUserAuthStatus
        // if status is pending === loading
        // if status is logged in === view app
        // if status is logged out === sign in page
        component={Component}
        pageProps={pageProps}
      />
    </AuthProvider>
>>>>>>> origin/with-auth
  );
}

export default MyApp;
