import { Router } from 'express';
import { usersRoute } from './usersRoute.js';
import { homeRoute } from './homeRoute.js';
import { protectedRoute } from './protectedRoute.js';
import { googleRoute } from './googleAuthRoute.js';
import { facebookRoute } from './facebookAuthRoute.js';

const routes = Router();

routes.use('/protected', protectedRoute);
routes.use('/', homeRoute);
routes.use('/users', usersRoute);
routes.use('/auth/google', googleRoute);
routes.use('/auth/facebook', facebookRoute);

export default routes;
