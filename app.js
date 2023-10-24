const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug');

require('dotenv').config();

const app = express();

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', require('./routes/index'));
app.use('/api/user', require('./routes/users'));
app.use('/api/slider', require('./routes/sliders'));
app.use('/api/hottour', require('./routes/hottours'));
app.use('/api/ourrating', require('./routes/ourratings'));
app.use('/api/maintour', require('./routes/maintours'));
app.use('/api/demandedtour', require('./routes/demandedtours'));
app.use('/api/city', require('./routes/cities'));
app.use('/api/booking_page_label', require('./routes/booking_page_labels'));
app.use('/api/tour', require('./routes/tours'));
app.use('/api/booking', require('./routes/bookings'));
app.use('/api/about_page_progress', require('./routes/about_page_progresses'));
app.use('/api/tourdetail_page_label', require('./routes/tourdetail_page_labels'));



app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
  debug('Express server listening on port ' + server.address().port)
});
