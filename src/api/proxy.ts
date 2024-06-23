import { createProxyMiddleware } from 'http-proxy-middleware';
import {BASE_URL} from '../utils/constants'

export default (req: any, res: any) => {
  const proxy = createProxyMiddleware({
    target: BASE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  });

  return proxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }
  });
};
