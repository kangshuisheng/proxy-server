import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const proxy = createProxyMiddleware({
      target: req.query.url, // 从请求参数中获取目标 URL
      changeOrigin: true,
      pathRewrite: {
        '^/proxy': '', // 重写路径
      },
      on: {
        proxyRes: (proxyRes, req, res) => {
          // 确保代理响应包含 CORS 头
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader(
            'Access-Control-Allow-Methods',
            'GET,POST,PUT,DELETE,OPTIONS',
          );
          res.setHeader(
            'Access-Control-Allow-Headers',
            'Content-Type, application/json',
          );
        },
      },
    });
    proxy(req, res, next);
  }
}
