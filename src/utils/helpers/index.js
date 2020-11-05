import moment from 'moment';
const querystring = require('querystring');

const convertDate = object => moment(object).format('LL');

const isOnlyNumbers = value => /^\d+$/.test(value);

const convertToQueryString = object => querystring.stringify(object);

export default { convertDate, isOnlyNumbers, convertToQueryString };

