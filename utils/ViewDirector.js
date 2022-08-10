import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
// import Signin from '../components/Signin';
// import NavBar from '../components/NavBar';
// import SideBar from '../components/SideBar';
import MiniDrawer from '../components/NavBar';
import { addUser, getUser } from '../api/userData';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { userLoading } = useAuth();
  const { user } = useAuth();
  if (user) {
    getUser(user.uid).then((response) => {
      // eslint-disable-next-line no-empty
      if (response) {
      } else {
        const userCreate = {
          uid: user.uid,
        };
        addUser(userCreate);
      }
    });
  // eslint-disable-next-line no-empty
  } else {
  }

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  return (
    <>
      <MiniDrawer />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
