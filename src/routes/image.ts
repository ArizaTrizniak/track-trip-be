import { Router, Request, Response, json } from 'express';
import { modelToPng } from '../services/modelToPng.js';

const router = Router();

router.post('/', json(), async (req: Request, res: Response) => {
   const model = req.body;
   if (!model.width || !model.height || !Array.isArray(model.points)) {
      return res.status(400).send('Invalid graph model');
   }

   const buffer = await modelToPng(model);

   res.setHeader('Content-Type', 'image/png');
   res.setHeader('Content-Disposition', 'attachment; filename="graph.png"');
   res.send(buffer);
   return res;
});

export default router;
