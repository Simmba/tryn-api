const cassandra = require('cassandra-driver');
const config = require('../config');

const client = new cassandra.Client({
    contactPoints: [config.cassandraURL],
});
client.connect((err) => {
    console.log(err);
});

function executeQuery(query, params) {
    return client.execute(query, params, { prepare: true });
}

module.exports = executeQuery;
