const { Router } = require('express')
const { sequelize } = require('./db/sequelize')
const { Op } = require('sequelize');

const bodyParser = require('body-parser')
const router = Router()
const { Song } = require('./models/songs')

// Add restaurants Routes
router.use(bodyParser.json())

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

router.get('/songs', (req, res) => {
    const limit = req.query.limit || 20
    let offset = 0
    let filters = undefined
    if(req.query.filters){
        filters = Object.entries(req.query.filters)
        .map(([key, val])=>{
            return [key, {[Op.or] : JSON.parse(val)}]
        })
        .reduce((acc, [key, val])=>{
            acc[key] = val
            return acc
        }, {})
    }
    let where = {...filters}
    console.log(req.query.filters, filters)
    const order_by = req.query.order_by || 'rank'
    const order_direction = req.query.order_direction || 'ASC'
    if(req.query.q){
        const search = `%${req.query.q}%`
        if(req.query.type) {
            where[req.query.type] = {
                [Op.like]: search
            }
        } else {
            where[Op.or] = [
                {
                    name: {
                        [Op.like]: search
                    }
                },
                {
                    artists: {
                        [Op.like]: search
                    }
                }
            ]
        }

    }
    Song.count({
        where
    })
    .then((count) => {
        let page = req.query.page || 1;      // page number
        let pages = Math.ceil(count / limit);
            offset = limit * (page - 1);
        return Song.findAll({
            // attributes: ['id', 'first_name', 'last_name', 'date_of_birth'],
            where,
            limit,
            offset,
            order: [
                [order_by, order_direction]
            ]
        })
        .then((songs) => {
            res.status(200).json({'result': songs, 'count': count, 'pages': pages});
        });
    })
    .catch(function (error) {
        console.log(error)
        res.status(500).send(error);
    });
})

router.get('/songs/:id', (req, res) => {
    const id = req.params.id
    Song.findById(id).then(song => {
        if(song){
            res.status(200).json({result: song})
        } else {
            res.status(400).send()
        }
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

module.exports = router