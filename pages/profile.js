import { Fragment, useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import Layout from '../components/ui/Layout';
import styles from '../styles/Profile.module.css';
import ResetPassword from '../components/ResetPassword';
import EditName from '../components/EditName';
import { withSessionSsr, withoutUser } from '../utils/with-session';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useFetch } from '../hooks/use-fetch';
import { useRouter } from 'next/router';

const Profile = props => {
  const [loading, setLoading] = useState(false);
  const { sendData } = useFetch();
  const userId = props.user.id;

  const router = useRouter();

  const deleteAccountHandler = async () => {
    setLoading(true);

    const data = await sendData('/api/delete-account', { userId });

    setLoading(false);

    router.replace('/');
  };
  return (
    <Fragment>
      <Fragment>
        <AdminHeader />
        <Layout>
          <h1>Profile</h1>
          <div className="hr-line fad"></div>
          <div className={styles.wrapper}>
            <EditName userId={userId} />
            <ResetPassword userId={userId} />
            <button onClick={deleteAccountHandler} className="btn error ">
              Delete Account
            </button>
          </div>
        </Layout>
      </Fragment>
      {loading && <LoadingSpinner />}
    </Fragment>
  );
};

export const getServerSideProps = withSessionSsr(withoutUser);
export default Profile;
