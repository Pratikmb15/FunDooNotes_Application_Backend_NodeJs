import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import notesRoute from './notes.route';
import labelsRoute from './labels.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/note',notesRoute);
  router.use('/label',labelsRoute);

  return router;
};

export default routes;
