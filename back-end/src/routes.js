const express = require('express')

const OngControle = require('./contorles/OngControle')
const IncidentControle = require('./contorles/incidentesControle')
const profilecontrole = require('./contorles/profilecontrole')
const sessaoContorle = require('./contorles/sessaoControle')
const routes = express.Router()

routes.post('/session', sessaoContorle.create)

routes.get('/ongs', OngControle.index)
routes.post('/ongs', OngControle.create)

routes.post('/incident', IncidentControle.create)
routes.get('/incident', IncidentControle.index)
routes.delete('/incident/:id', IncidentControle.delete)

routes.get('/profile', profilecontrole.index)



module.exports = routes