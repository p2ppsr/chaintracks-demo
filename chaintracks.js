const knex = require('knex')(require('./knexfile'))

// The storage engine is used to keep headers somewhere on disk (or in memory)
// Here, we are using the Knex.js storage engine
const { storageEngine } = require('@cwi/chaintracks-storage-engine-knex')({
  knex
})

// The validation engine is used when checking envelopes
// The bsv1 validation engine is officially supported by chaintracks
const validationEngine = require('@cwi/chaintracks-validation-engine-bsv1')

// Ingestors are places where you get SPV headers, there can be as many as you want
// There are some public ElectrumX servers that provide headers
const electrumxIngestor = require('@cwi/chaintracks-electrumx-ingestor')

// Get an instance of chaintracks by providing a storage engine, validation engine and ingestors
const chaintracks = require('@cwi/chaintracks')({
  storageEngine,
  validationEngine,
  ingestors: [
    electrumxIngestor('sv.usebsv.com', '50002')
    // electrumxIngestor('electrumx.bitcoinsv.io', '50002'),
    // electrumxIngestor('satoshi.vision.cash', '50002'),
    // electrumxIngestor('sv.satoshi.io', '50002'),
    // electrumxIngestor('sv2.satoshi.io', '50002')
  ]
})

// You can export your chaintracks to use it in other files as well:
module.exports = chaintracks
