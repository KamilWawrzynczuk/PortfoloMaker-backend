import { Router } from 'express';

export const homeRoute = Router();

homeRoute.get('/', function (req, res, next) {
  try {
    res.status(200).json({ msg: 'Home Page.'});
  } catch (error) {
    next(error);
  }
});
