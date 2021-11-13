// Import mongoose and bcyrpt depencies
import mongoose from "mongoose";
import bcrypt from "bcrypt";
// deconstruct schema from mongoose
const { Schema } = mongoose;

// Create new schema UserSchema for User Model
const userSchema = new Schema(
  {
    // Name field for end users name with type of string
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    // Email field to gather end user's email with type of string
    email: {
      type: String,
      trim: true,
      required: "Email is required",
      unique: true,
    },
    // admin field boolean to see if user is an admin
    admin: {
      type: Boolean,
      required: true,
    },
    // Empty string field to be attached as a foreign key to the model if the user creates or links a Stripe Account
    stripe_account_id: "",
    // Stripe Seller empty object to reference stripe seller object
    stripe_seller: {},
    // Stripe Session object to provide persisitance to the Stripe API and keep the user logged in
    stripeSession: {},
  },
  // Timestamps for when the user is created or edited 
  { timestamps: true }
);

// Before saving the user
 userSchema.pre("save", function (next) {
   // let the user model = current user model being passed to model
    let user = this;
    // if user is modified password
    if (user.isModified("password")) {
      // decrypt the user password hash
      let salt = bcrypt.genSaltSync(12);
      return bcrypt.hash(user.password, salt, function (err, hash) {
        // if error
        if (err) {
          // log the error to the conolse
          console.log("BCRYPT HASH ERR ", err);
          // continue the application with the error
          return next(err);
        }
        // if the password is the same as the bcrypt hash
        user.password = hash;
        // continue with the user save
        return next();
      });
    } else {
      // contiue the application without decrypting password
      return next();
    }
  });

  /*
  * Method to compare the user password with the hash to ensure attempt integrity
  * Parameters: Password string, next function
  */
userSchema.methods.comparePassword = function (password, next) {
  // Use bcrypt to compare the password hash to the entered password
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      // if there's an error log the error to the console
      console.log("COMPARE PASSWORD ERR", err);
      // continue through the application with error and false boolean statement indicating authentication attempt failed
      return next(err, false);
    }
    // if no err, we get null
    console.log("MATCH PASSWORD", match);
    return next(null, match); // true
  });
};

// Export to mongoose model User with userschema and it's methods such as compare password
export default mongoose.model("User", userSchema);