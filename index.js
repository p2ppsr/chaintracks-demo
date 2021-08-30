const chaintracks = require('./chaintracks')

const app = require('express')()
app.use(require('body-parser').json())
app.get('/', async (req, res) => {
  res.status(200).json({
    latest: await chaintracks.getLatestHash()
  })
})

app.listen(3000)

const init = async () => {
  // Call this when you've been offline for a while, or when starting up
  await chaintracks.synchronize()

  // Call this to ensure you stay updated as time goes by
  chaintracks.listenForHeaders(() => {
    console.log('Chaintracks is listening for new headers...')
  })

  // It can listen for headers and notify you when a new header is added
  // to the longest chain
  chaintracks.subscribe('header', ({ header }) => {
    console.log('A new header was found', header)
  })

  // it can also detect and notify you about reorganizations
  // Generally you should only listen for this after header synchronization is complete
  chaintracks.subscribe('reorganizations', ({ depth, oldChainTipHeader, newChainTipHeader }) => {
    console.log(`A ${depth}-block reorganization has occurred.`)
    console.log('Old chaintip header', oldChainTipHeader)
    console.log('new chaintip header', newChainTipHeader)
  })
}

init()
