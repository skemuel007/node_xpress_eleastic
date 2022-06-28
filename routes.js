const express = require('express');
const router = express.Router();

require('dotenv').config();

//router.use(express.json({ limit: '105mb' }));
const elastic = require('elasticsearch');

const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
const index = "products";
const type = "products";

const elasticClient = elastic.Client({
    host: elasticUrl
});

router.use((req, res, next) => {
    elasticClient.index({
        index: 'logs',
        body: {
            url: req.url,
            method: req.method
        }
    }).then((resp) => {
        console.log('Logs indexed');
    }).catch((err) => {
        console.log(err);
    });
    next();
});

router.post('/products', (req, res) => {
    elasticClient.index({
        index: 'products',
        body: req.body
    }).then((resp) => {
        return res.status(200).json({
            msg: 'Product indexed'
        });
    }).catch((err) => {
        return res.status(500).json({
            msg: 'Error',
            err
        });
    })
});

router.get('/products/:id', (req, res) => {
    let query = {
        index: 'products',
        id: req.params.id
    }
    elasticClient.get(query)
        .then((resp) => {
            if (!resp) {
                return res.status(404)
            }
            return res.status(200).json({
                product: resp
            });
        })
        .catch((err) => {
            return res.status(500).json({
                msg: 'Error',
                err
            });
        });
});

router.put('/products/:id', (req, res) => {
    elasticClient.update({
        index: 'products',
        id: req.params.id,
        body: {
            doc: req.body
        }
    }).then((resp) => {
        return res.status(200).json({
            msg: 'Product updated'
        });
    }).catch((err) => {
        return res.status(500).json({
            msg: 'Error',
            err
        });
    });
});

router.delete('/products/:id', (req, res) => {
    elasticClient.delete({
        index: 'products',
        id: req.params.id,
    }).then((resp) => {
        return res.status(200).json({
            msg: 'Product deleted'
        });
    }).catch((err) => {
        return res.status(404).json({
            msg: 'Error',
        });
    });
});

router.get('/products', (req, res) => {
    let query = {
        index: 'products'
    };

    if ( req.query.product)
        query.q = `*${req.query.product}*`;

    elasticClient.search(query)
        .then((resp) => {
            return res.status(200).json({
                products: resp.hits.hits
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                msg: 'Error',
                err
            });
        });
});

module.exports = router;