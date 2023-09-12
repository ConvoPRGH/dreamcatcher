const app = require('./app');
const config = require('./utils/config');

app.listen(config.PORT, () => `listening on port${config.PORT}`);