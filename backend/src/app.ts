import cors from 'cors'
import express from 'express'
import type { Request, Response } from 'express'
import { connectToPostgres } from './postgres/index.js'
import { ensureTableExists } from './seeder/index.js'

console.log('Starting here==========')
await connectToPostgres()
await ensureTableExists()

const app = express()

app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )

app.get('/api/health', (req: Request, res: Response)=> {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'base-shop-product-catalog-api'
  })
})

app.get('/', (req, res) => {
  res.json({
    message: 'Base Shop Product Catalog API is running',
    version: '1.0.0',
    documentation: '/api/docs'
  });
});

app.use(/(.*)/, (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


export default app


