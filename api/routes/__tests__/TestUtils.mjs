import {request} from 'http'
import {init} from '../../api.mjs'

const PORT = 9000

export function get(url) {
  return new Promise((resolve, reject) => {
    const req = request(
      {
        hostname: 'localhost',
        port: PORT,
        path: url,
        method: 'GET',
      },
      res => {
        let data = ''
        res.setEncoding('utf8')
        res.on('data', chunk => {
          data += chunk
        })
        res.on('end', () => {
          resolve(JSON.parse(data))
        })
      }
    )
    req.on('error', e => reject(e.message))
    req.end()
  })
}

export function patch(url, data) {
  return new Promise((resolve, reject) => {
    const serialized = JSON.stringify(data)
    const req = request(
      {
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': serialized.length,
        },
        hostname: 'localhost',
        port: 9000,
        path: url,
        method: 'PATCH',
      },
      res => {
        let data = ''
        res.setEncoding('utf8')
        res.on('data', chunk => {
          data += chunk
        })
        res.on('end', () => {
          resolve(JSON.parse(data))
        })
      }
    )
    req.on('error', e => reject(e.message))
    req.write(serialized)
    req.end()
  })
}

export function post(url, data) {
  return new Promise((resolve, reject) => {
    const serialized = JSON.stringify(data)
    const req = request(
      {
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': serialized.length,
        },
        hostname: 'localhost',
        port: 9000,
        path: url,
        method: 'POST',
      },
      res => {
        let data = ''
        res.setEncoding('utf8')
        res.on('data', chunk => {
          data += chunk
        })
        res.on('end', () => {
          resolve(JSON.parse(data))
        })
      }
    )
    req.on('error', e => reject(e.message))
    req.write(serialized)
    req.end()
  })
}

export function startServer() {
  return new Promise((resolve, reject) => {
    const s = init().listen(PORT, () => {
      resolve(s)
    })
  })
}
