/* code from functions/todos-create.js */
const faunadb = require('faunadb');

/* configure faunaDB Client with our secret */

const q = faunadb.query;
const client = new faunadb.Client({
    secret: 'fnADh_3JLaACAFmN7HAal6Nwe5y9CO-upQyWgSkG',
});
function getId(urlPath) {
    return urlPath.match(/([^\/]*)\/*$/)[0];
}
/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
    /* parse the string body into a useable JS object */
    const id = getId(event.path);
    const data = JSON.parse(event.body);
    console.log('Function `user-patch` invoked', data);
    /* construct the fauna query */

    return client
        .query(q.Update(q.Ref(`classes/users/${id}`), { data }))
        .then(response => {
            console.log('success', response);
            /* Success! return the response with statusCode 200 */
            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        })
        .catch(error => {
            console.log('error', error);
            /* Error! return the error with statusCode 400 */
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};
