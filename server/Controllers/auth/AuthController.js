// import dependenceis
import User from '../../Models/User';
import jwt from 'jsonwebtoken';
/*
* Method to handle registering a user
* Parametrs: API req, response
*/
export const Register =  async (req, res) => {
try{
  // deconstruct name, email and password with req body
  const {name, email, password} = req.body;

  // server validation
  if(!name) return res.status(400).send('Name is required');
  if(!email) return res.status(400).send('Email is required');
  if(!password || password.length < 6 || password.length > 60) return res.status(400).send("Password must be a minimum of 6 charactors long and maximum of 64 characters");
  // variable to see if user exists
  let userExist = await User.findOne({email}).exec();
  // if user exists return email is taken
  if(userExist) return res.status(400).send('Email is taken');

  // register User
  const user = new User(req.body);

} catch (error) {
  //logg error to console
  console.log(error)
  // return 400 error
  return res.status(400).send("Error, Please try again");
}
    try {
      // User awaiting save to database
        await user.save();
        // return json that user saved was successful
        return res.json({ ok:true});
    }
    catch(error) {
      // log an error to the console
        console.log('FAILED CREATING A USER', error);
        // return error 400 and send message please try again
        return res.status(400).send("Error, Please try again");
    }
}
/*
* Method to handle user login and compare credentials in database
* parameters: Request object, response object
*/
export const Login = async (req, res) => {
    try {
      // grab email from password with request body 
      const { email, password } = req.body;
      // check if user with that email exist
      let user = await User.findOne({ email }).exec();
      // if user return status 400 message user with that email
      if (!user) return res.status(400).send("User with that email not found");
      // compare password
      user.comparePassword(password, (err, match) => {
        // if not a match or an error return status 400 with login failed error 
        if (!match || err) return res.status(400).send("Login Failed");
        // GENERATE A TOKEN THEN SEND AS RESPONSE TO CLIENT
        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        // return token and user object in json
        res.json({
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            stripe_account_id: user.stripe_account_id,
            stripe_seller: user.stripe_seller,
            stripeSession: user.stripeSession,
          },
        });
      });
    } catch (err) {
      // log error to console
      console.log("LOGIN ERROR", err);
      // return status 400 with sign in failed
      res.status(400).send("Signin failed");
    }
  };

