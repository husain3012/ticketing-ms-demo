import express, {Request, Response} from 'express';
import { body} from 'express-validator';
import jwt from "jsonwebtoken"

import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';

import { BadRequestError } from '../errors';
import { Password } from '../services/password';

const validator = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password can not be empty')
]




const router = express.Router();

router.post('/api/users/signin', validator, validateRequest, async (req: Request, res: Response) => {

 const {email, password} = req.body;
 const existingUser = await User.findOne({email});

  if(!existingUser) throw new BadRequestError("Invalid Credentials")

  const passwordsMatch = await Password.compare(existingUser.password, password);

  if(!passwordsMatch) throw new BadRequestError("Invalid Credentials")

  const token = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.JWT_KEY!)

  req.session = {
    jwt: token
  };


  res.status(200).json(existingUser);
});

export { router as signInRouter };
