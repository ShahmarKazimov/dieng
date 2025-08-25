import axios from 'axios';
import { parse } from 'cookie';
import type { IncomingMessage } from 'http';

export const serverApiClient = (req: IncomingMessage) => {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  let token: string | null = null;

  if (cookies.user) {
    try {
      const user = JSON.parse(cookies.user);
      token = user.token;
    } catch {
      token = null;
    }
  }

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
  });

  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return instance;
};
