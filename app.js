const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { default: helmet } = require("helmet");
const { Logger } = require("logger");
const morgan = require("morgan");

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const assetRoutes = require('./routes/assets');
const transactionRoutes = require('./routes/transactions');


const app = express();

app.use(
    cors({
        origin: [
            "*"
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
app.use(morgan('dev'));


// Use routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/asset', assetRoutes);
app.use('/transaction', transactionRoutes);

// app.use('/api/account', accountController.getAccount);
// app.use('/api/account/update', accountController.updateAccount);

// app.use('/api/portfolio', portfolioRoutes);
// app.use('/api/trade', tradeRoutes);

// app.use('/api/portfolio', portfolioRoutes);
// app.use('/api/balance', balanceRoutes);
// app.use('/api/trade', tradeRoutes);
// app.use('/api/risk', riskRoutes);
// app.use('/api/portfolio/expire', expirationCheckRoutes);
// app.use('/api/account/update', updateAccountRoutes);
// app.use('/api/assets', assetRoutes);
// app.use('/api/assets/history', assetHistoryRoutes);

module.exports = app;