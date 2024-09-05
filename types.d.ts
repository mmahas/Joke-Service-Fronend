// types.d.ts

import { NextApiRequest } from 'next';

declare module 'next' {
  export interface NextApiRequest {
    userRole?: string;
  }
}
