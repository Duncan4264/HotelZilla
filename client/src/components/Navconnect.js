import { useSelector } from "react-redux";
import {Card, Avatar, Badge } from 'antd';
import moment from 'moment';
import { getAccountBalance, getPayoutSettings } from "../actions/stripe";
import { useEffect, useState } from "react";
import { currencyFormatter } from "../actions/stripe";
import { SettingOutlined } from "@ant-design/icons";
import {toast} from 'react-toastify';
const { Meta }  = Card;
const { Ribbon } = Badge;
const NavConnect = () => {
    const [balance, setBalance] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    const {auth} = useSelector((state) => ({...state}));
    const {user} = auth;

    useEffect(() => {
        getAccountBalance(auth.token).then(response => {
            console.log(response);
            setBalance(response.data);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const configurePayoutSettings = async () => {
        setLoading(true)
        try {
            const response = await getPayoutSettings(auth.token);
            console.log('RESPONSE FOR PAYOUT SETTINGS', response);
            window.location.href = response.data.url;
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast('Unable to access settings. Try again');
        }
    }

    return (
        <div className="d-flex justify-content-around">
            <Card>
            <Meta avatar={<Avatar>{user.name[0]}</Avatar>} title={user.name} description={`Joined ${moment(user.createdAt).fromNow()}`}/>
            </Card>

{ auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled  && 
        (<>
            <Ribbon text="Avalible" color="grey">
            <Card className="bg-light pt-1">
                {balance && balance.pending && balance.pending.map((balance, i) => (
                    <span className="lead" key={i}>{currencyFormatter(balance)}</span>
                ))}
            </Card>
            </Ribbon>

            <Ribbon text="Payouts" color="silver">
                <Card
                onClick={configurePayoutSettings}
                className="bg-light pointer"
                >
                    <SettingOutlined className="h5 pt-2"/>

                </Card>
            </Ribbon>
            </>
        
    )
        }
        </div>
    );
};

export default NavConnect;