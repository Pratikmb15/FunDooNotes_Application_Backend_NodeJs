import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import notesRoute from './notes.route';
import labelsRoute from './labels.route';
import colaboratorsRoute from './collaborators.route';
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
  router.use('/notes',notesRoute);
  router.use('/labels',labelsRoute);
  router.use('/collaborators',colaboratorsRoute);

  return router;
};
 
export default routes;
