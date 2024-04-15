import { Request } from "express";
import { Account } from '@prisma/client'


export interface AccountRequest extends Request {
  account?: Account
}