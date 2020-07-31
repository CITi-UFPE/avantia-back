import { Request, Response, NextFunction } from 'express';
import FormData from 'form-data';
import axios from 'axios';

export const post =  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (files?.length === 0) {
      res.locals.status === 400;
      return next('No file was found');
    }

    if (files?.length > 1) {
      res.locals.status = 400;
      return next('Only one image can be sent at a time');
    }

    if (files[0]?.mimetype !== 'image/png') {
      res.locals.status === 400;
      return next(`Invalid file type \"${files[0].mimetype}\"`);
    }

    const formData = new FormData();
    const image = new Buffer(files[0].buffer).toString('base64');

    formData.append('box', 'BoxTest');
    formData.append('analytic', 'TestMask');
    formData.append('camera', 'CameraTest');
    formData.append('image', image.replace(/^data:image\/png;base64,/, ''));

    const before = Date.now();

    const neuralNetResponse = await axios.post(
      'https://avva.grupoavantia.com.br/classifier/mask',
      formData,
      { headers: formData.getHeaders() },
    );

    const filterPositions: NeuralNetResponse[] = neuralNetResponse.data;

    res.locals.neuralNetLatency = Date.now() - before;
    res.locals.data = filterPositions;
    res.locals.status = 200;
    res.locals.message = 'Coords sent';

    return next();
  } catch (err) {
    next(err);
  }
}

export interface NeuralNetResponse {
  bb_o: number[];
  prob: number;
  label: 'mask' | 'nomask';
}
