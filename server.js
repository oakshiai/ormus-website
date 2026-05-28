import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4173;
const HOST = process.env.HOST || '0.0.0.0';

const fastify = Fastify({
  logger: {
    level: 'info'
  },
});

// Serve static files from the dist folder
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'dist'),
  prefix: '/',
  // Cache static assets aggressively in production
  maxAge: process.env.NODE_ENV === 'production' ? '1y' : 0,
  immutable: process.env.NODE_ENV === 'production',
});

// SPA fallback: send index.html for any unknown route
// This is required for React Router to work on direct navigation / refresh
fastify.setNotFoundHandler((request, reply) => {
  reply.sendFile('index.html');
});

// Health check endpoint (useful for PM2 / load balancers)
fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

try {
  await fastify.listen({port: PORT});
  fastify.log.info(`Server running on http://${HOST}:${PORT}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
