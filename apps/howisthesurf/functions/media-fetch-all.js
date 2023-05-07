/* Import faunaDB sdk */
const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
    secret: 'fnADh_3JLaACAFmN7HAal6Nwe5y9CO-upQyWgSkG',
});

exports.handler = (event, context) => {
    console.log('Function `media-read-all` invoked');
    return client
        .query(q.Paginate(q.Match(q.Ref('indexes/all_media'))))
        .then(response => {
            const mediaRefs = response.data;
            console.log('Media refs', mediaRefs);
            console.log(`${mediaRefs.length} pieces of media found`);

            const getAllMediaDataQuery = mediaRefs.map(ref => {
                return q.Get(ref);
            });
            // then query the refs
            return client.query(getAllMediaDataQuery).then(ret => {
                return {
                    statusCode: 200,
                    body: JSON.stringify(ret),
                };
            });
        })
        .catch(error => {
            console.log('error', error);
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};
