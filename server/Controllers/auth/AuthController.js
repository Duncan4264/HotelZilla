import User from '../../Models/User';
import jwt from 'jsonwebtoken';

export const Register =  async (req, res) => {
    console.log(req.body);
    const {name, email, password} = req.body;

    // server validation
    if(!name) return res.status(400).send('Name is required');
    if(!email) return res.status(400).send('Email is required');
    if(!password || password.length < 6 || password.length > 60) return res.status(400).send("Password must be a minimum of 6 charactors long and maximum of 64 characters");
    
    let userExist = await User.findOne({email}).exec();

    if(userExist) return res.status(400).send('Email is taken');

    // register User

    const user = new User(req.body);

    try {
        await user.save();
        console.log("User creation successful", user);
        return res.json({ ok:true});
    }
    catch(error) {
        console.log('FAILED CREATING A USER', error);
        return res.status(400).send("Error, Please try again");
    }
}

export const Login = async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;
    try {
        console.log(email, password);
      // check if user with that email exist
      let user = await User.findOne({ email }).exec();
      if (!user) res.status(400).send("User with that email not found");
      // compare password
      user.comparePassword(password, (err, match) => {
        console.log("COMPARE PASSWORD IN LOGIN ERR", err);
        if (!match || err) return res.status(400).send("Login Failed");
        // GENERATE A TOKEN THEN SEND AS RESPONSE TO CLIENT
        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res.json({
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        });
      });
    } catch (err) {
      console.log("LOGIN ERROR", err);
      res.status(400).send("Signin failed");
    }
  };