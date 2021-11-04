import { createConnectionAccountService, getAccountBalanceService, getAccountStatusService, getPayoutSettingsService, readStripeSessionIdService, stripeSuccessService, updateDelayDaysService, readLocalStripeSessionIdService} from "../../Business/stripe/StripeBusinessService";
/*
* Method to create a connection account with Stripe API
* Parameters Request Object, Response Object
*/
export const createConnectionAccount = async (req, res) => {
    try {
        let connection = createConnectionAccountService(req, res);
        return connection;
    } catch (error) {
      // log an error to the console
      console.log(error);
    }
};
  
    /*
    * Method to update the delayed days off of Stripe Activity
    * Parameters: Account ID
    */
export const updateDelayDays = async (req, res, accountId) => {
      try{
          let delay = updateDelayDaysService(req, res, accountId);
          return delay;
    } catch(error) {
      // log an error tthe console
      console.log(error);
    }
};
  /*
  * Method to get account status from stripe
  * Parameters: Request Object, Response Objects
  */
    export const getAccountStatus = async (req, res) => {
      try {
          let accountStatus = await getAccountStatusService(req, res);
          return accountStatus;
    } catch(error) {
      // log the error to the console
      console.log(error)
    }
 }
   /*
   * Method to get account balance
   * Parameters: Request, Repsonse
   */
    export const getAccountBalance = async(request, response) => {
      try {
        let account = getAccountBalanceService(request, response);
        return account;
      } catch (error) {
        // log an error to the console
        console.log(error);
      }
    }
  /*
    * Method to get payout settings from Stripe API
    * Parameters: Request Object, Response Object
  */
    export const getPayoutSettings = async (request ,response) => {
      try {
        let payoutsettings = getPayoutSettingsService(request, response);
        return payoutsettings;
      } catch (error) {
        // log the error to the console
        console.log('Stripe payout settings error ', error);
      }
    }
  /**
   * @description Method that reads stripe session ID from the buisness service
   * @author Cyrus Duncan
   * @date 29/09/2021
   * @param {*} req
   * @param {*} res
   * @returns {*}  Session ID
   */
  export const readStripeSessionId = async (req, res) => {
      try {
      // vairable that read stripe session id business service
      let readStripeSession = readStripeSessionIdService(req, res);
      // return stripe session
      return readStripeSession;
    } catch(error) {
        // log an error to the console
      console.log(error);
    }
}
  /**
   * @description Method that grabs Stripe satus code
   * @author Cyrus Duncan
   * @date 29/09/2021
   * @param {*} req
   * @param {*} res
   * @returns {*} success object
   */
  export const stripeSuccess = async (req, res) => {
      try {
          let success = stripeSuccessService(req, res);
          return success;
      } catch (err) {
        console.log("STRIPE SUCCESS ERR", err);
      }
  }

  export const readLocalStripeSessionId = async (req, res) => {
    try {
      // vairable that read stripe session id business service
      let readStripeSession = readLocalStripeSessionIdService(req, res);
      // return stripe session
      return readStripeSession;
    } catch(error) {
        // log an error to the console
      console.log(error);
    }
}
  
  
  