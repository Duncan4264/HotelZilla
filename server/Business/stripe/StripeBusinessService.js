import {createConnectionAccount, updateDelayDays, getAccountStatus, getAccountBalance, getPayoutSettings, readStripeSessionId, stripeSuccess, readLocalStripeSessionId} from '../../Data/stripe/StripeDAO';

/**
 * @description Method the creates an account
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return create connection
 */
export const createConnectionAccountService = async (req, res) => {
    try {
        let createConnection = createConnectionAccount(req, res);
        return createConnection;
    } catch (error) {
        console.log(error);
    }
}
/**
 * @description Method to update delay day service
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @param {*} accountId
 * @returns {*} return delay days fields
 */
export  const updateDelayDaysService = async (req, res, accountId) => {
    try {
        let updateDelayDay = updateDelayDays(req, res, accountId);
        return updateDelayDay;
    } catch (error) {
        console.log(error);
    }
}
/**
 * @description method to get account status
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return accout status code
 */
export const getAccountStatusService = async (req, res) => {
    try {
        let accountStatus = getAccountStatus(req, res);
        return accountStatus;
    } catch (error) {
       console.log(error); 
    }
}
/**
 * @description
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} returns account balance integer
 */
export const getAccountBalanceService = async (req, res) => {
    try {
        // variable that gets account balance
        let accountBalance = getAccountBalance(req, res);
        // return account balance
        return accountBalance;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method to get payout settings
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} Payout settings Object
 */
export const getPayoutSettingsService = async (req, res) => {
    try {
        let payoutSettings = getPayoutSettings(req, res);
        return payoutSettings;
    } catch (error) {
        console.log(error);
    }
}
/**
 * @description REad description session by Id of service
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*}  SessionID
 */
export const readStripeSessionIdService = async (req, res) => {
    try {
        // create a DAO call to get session ID
        let StripeSessionId = readStripeSessionId(req, res);
        // return Session Id
        return StripeSessionId;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method that grabs stripe success code
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} Stripe Status code
 */
export const stripeSuccessService = async (req, res) => {
    try {
        // create variable that calls stripe success DAO metho
        let success = stripeSuccess(req, res);
        // return success status code
        return success;
    } catch (error) {
        // log an error code
        console.log(success);
    }
}

export const readLocalStripeSessionIdService = async (req, res) => {
        try {
        // create a DAO call to get session ID
        let StripeSessionId = readLocalStripeSessionId(req, res);
        // return Session Id
        return StripeSessionId;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}