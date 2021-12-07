import { useSelector } from 'react-redux';
import { Card, Avatar, Badge } from 'antd';
import moment from 'moment';
import { getAccountBalance, getPayoutSettings } from '../actions/stripe';
import { useEffect, useState } from 'react';
import { currencyFormatter } from '../actions/stripe';
import { SettingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
const { Meta } = Card;
const { Ribbon } = Badge;

/*
 * Method to handle nav component state and rendering
 */
const NavConnect = () => {
  // State variables
  const [balance, setBalance] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => ({ ...state }));
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();

  // Constructor to get account balance
  useEffect(() => {
    try {
      // get account balance
      AccountBalance();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Configure payout settings
  const configurePayoutSettings = async () => {
    // Set loading state to true
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      // create a response variable and await getting payout settings from backent
      const response = await getPayoutSettings(token, auth._id);
      // set window location to response data url
      window.location.href = response.data.url;
      // set location to ture
      setLoading(false);
    } catch (error) {
      // log the error to the console
      console.log(error);
      // set loading state false
      setLoading(false);
      // push an update to the client with error
      toast('Unable to access settings. Try again');
    }
  };
  const AccountBalance = async () => {
    try {
      const token = await getAccessTokenSilently();
      getAccountBalance(token, auth._id)
        .then((response) => {
          // set account balance with response data
          setBalance(response.data);
        })
        .catch((error) => {
          // log the error to the console
          console.log(error);
          // push an update to the client with error
          toast('Unable to access settings. Try again');
        });
      console.log(balance);
    } catch (error) {
      console.log(error);
    }
  };

  const showProfile = () => {
    history.push(`/user/${auth._id}`);
  };
  return (
    <div className="d-flex justify-content-around">
      <Ribbon text="Profile" color="silver">
        <Card onClick={showProfile} classname="bg-light pointer">
          <Meta
            avatar={<Avatar>{auth.name[0]}</Avatar>}
            title={auth.name}
            description={`Joined ${moment(auth.createdAt).fromNow()}`}
          />
        </Card>
      </Ribbon>

      {auth && auth.stripe_seller && auth.stripe_seller.charges_enabled && (
        <>
          <Ribbon text="Avalible" color="grey">
            <Card className="bg-light pt-1">
              {balance &&
                balance.pending &&
                balance.pending.map((balance, i) => (
                  <span className="lead" key={i}>
                    {currencyFormatter(balance)}
                  </span>
                ))}
            </Card>
          </Ribbon>

          <Ribbon text="Payouts" color="silver">
            <Card
              onClick={configurePayoutSettings}
              className="bg-light pointer"
            >
              <SettingOutlined className="h5 pt-2" />
            </Card>
          </Ribbon>
        </>
      )}
    </div>
  );
};

export default NavConnect;
