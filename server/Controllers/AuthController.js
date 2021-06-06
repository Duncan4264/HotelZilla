import User from '../Models/User';

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