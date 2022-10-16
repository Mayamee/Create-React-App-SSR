import express from 'express'
import { renderToString } from 'react-dom/server'
import { StaticRouter as RouterSSR } from 'react-router-dom/server'
import path from 'path'
import fs from 'fs'
import App from '../App'

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'
const server = express()

server.use(/\/[^.]*$/, (req, res) => {
  console.info(
    `SSR render on '${req.baseUrl || '/'}' at ${new Date().toISOString()} from ${req.ip}`
  )
  fs.readFile(`${path.resolve(__dirname, '../client')}/index.html`, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err)
      return res.status(500).send('Oops, better luck next time!')
    }
    const rendered = renderToString(
      <RouterSSR location={req.baseUrl || '/'}>
        <App />
      </RouterSSR>
    )
    return res.send(data.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`))
  })
})

server.use(express.static(path.resolve(__dirname, '../client')))

server.listen(PORT, HOST, () => {
  console.log(`SSR server is working on ${HOST} port ${PORT}/tcp`)
})
