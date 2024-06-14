import { Request, Response } from 'express';
import { Dater } from '../model/Dater.js';

export const getDaters = async (req: Request, res: Response) => {
  try {
    const daters = await Dater.findAll();
    res.json(daters);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch daters' });
  }
};
