import { passport } from '@/api-lib/auth';
import { auths } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler
  .use(...auths)
  .post(passport.authenticate('local'), (req, res) => {
    res.status(201).json({
      data: req.user,
      success: true
    });
  })
  .delete(async (req, res) => {
    await req.session.destroy();
    res.status(204).end();
  });

export default handler;
