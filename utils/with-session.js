import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';

const cookieDetails = {
  cookieName: 'palasio-user',
  password: 'g2(dqztb;?kadfgsu.sfsX9baKj.IK0!L,L}~',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 60,
  },
};

const withUser = async ({ req }) => {
  const user = req.session.user;

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard',
      },
      props: {
        user,
      },
    };
  }

  return {
    props: {
      user: {
        isAuthenticated: false,
      },
    },
  };
};

const withoutUser = async ({ req }) => {
  const user = req.session.user;

  if (!user || !user.isAuthenticated) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

const withSessionApi = handler => {
  return withIronSessionApiRoute(handler, cookieDetails);
};

const withSessionSsr = handler => {
  return withIronSessionSsr(handler, cookieDetails);
};

export { withSessionApi, withSessionSsr, withoutUser, withUser };
