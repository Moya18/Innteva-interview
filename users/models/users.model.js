const userSchema = new Schema({
   username: String,
   email: String,
   names: String,
   paternal_surname: String,
   maternal_surname: String,
   age: Number,
   role: Number,
   permissions: [String]
});

const userModel = mongoose.model('Users', userSchema);

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.findById = (id) => {
    return User.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};
