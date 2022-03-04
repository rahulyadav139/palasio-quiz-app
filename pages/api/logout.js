import { withSessionApi } from '../../utils/with-session';

const logoutRoute = (req, res) => {
  if (req.method === 'GET') {
    req.session.destroy();

    res.status('201').json({ message: 'You have successfully logged out!' });
  }
};

export default withSessionApi(logoutRoute);
