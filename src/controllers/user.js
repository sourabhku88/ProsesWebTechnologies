const { default: mongoose } = require('mongoose');
const userModel = require('../models/userModel');
const { checkBody, checkUserName, checkEmail, checkPhone, checkpassword } = require('../validation/validation');


const createUser = async (req, res) => {
    try {

        const { userName, email, phone, street, pincode, city, landmark } = req.body;

        if (checkBody(req.body)) return res.status(400).send({ message: 'please Provide Data' });

        if (!userName) return res.status(400).send({ message: 'please Provide userName' });
        if (!email) return res.status(400).send({ message: 'please Provide email' });
        if (!phone) return res.status(400).send({ message: 'please Provide phone' });
        if (!street) return res.status(400).send({ message: 'please Provide street' });
        if (!pincode) return res.status(400).send({ message: 'please Provide pincode' });
        if (!city) return res.status(400).send({ message: 'please Provide city' });
        if (!landmark) return res.status(400).send({ message: 'please Provide landmark' });

        if (!checkUserName(userName)) return res.status(400).send({ message: 'please Provide valid userName' });
        if (!checkEmail(email)) return res.status(400).send({ message: 'please Provide valid email' });
        if (!checkPhone(phone)) return res.status(400).send({ message: 'please Provide valid phone' });


        let uniqueUserName = await userModel.findOne({ userName });
        let uniqueEmail = await userModel.findOne({ email });

        if (uniqueEmail) return res.status(400).send({ message: 'please Provide another email' });
        if (uniqueUserName) return res.status(400).send({ message: 'please Provide another username' });

        req.body.address = { street, pincode, city, landmark }

        let data = await userModel.create(req.body);
        return res.status(201).send({ message: 'user created', data });

    } catch (error) { return res.status(500).send({ message: error }); }
}


const getUser = async (req, res) => {
    try {
        let data = await userModel.find();

        if (data.length === 0) return res.status(404).send({ message: 'data not found' });

        return res.status(200).send({ data, message: "all user's" })

    } catch (error) { return res.status(500).send({ message: error }); }
}


const updateUser = async (req, res) => {
    try {
        const id = req.params.id;

        const { userName, email, phone, street, pincode, city, landmark } = req.body;

        if (!mongoose.isValidObjectId(id)) return res.status(400).send({ message: 'please Provide valid id' });

        let checkUser = await userModel.findById(id);

        if (!checkUser) return res.status(404).send({ message: 'Not found user' });

        if (checkBody(req.body)) return res.status(400).send({ message: 'please Provide Data' });

        if (userName) {
            if (!checkUserName(userName)) return res.status(400).send({ message: 'please Provide valid userName' });
        }
        if (email) {
            if (!checkEmail(email)) return res.status(400).send({ message: 'please Provide valid email' });
        }
        if (phone) {
            if (!checkPhone(phone)) return res.status(400).send({ message: 'please Provide valid phone' });
        }

        let uniqueUserName = await userModel.findOne({ userName });
        let uniqueEmail = await userModel.findOne({ email });

        if (uniqueEmail) return res.status(400).send({ message: 'please Provide another email' });
        if (uniqueUserName) return res.status(400).send({ message: 'please Provide another username' });

        req.body.address = {};
        req.body.address.street = street ? street : checkUser.address.street
        req.body.address.city = city ? city : checkUser.address.city
        req.body.address.pincode = pincode ? pincode : checkUser.address.pincode
        req.body.address.landmark = landmark ? landmark : checkUser.address.landmark

        let data = await userModel.findByIdAndUpdate(id, req.body, { new: true });

        return res.status(200).send({ message: 'user updated', data });

    } catch (error) { return res.status(500).send({ message: error }); }
}


const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.isValidObjectId(id)) return res.status(400).send({ message: 'please Provide valid id' });

        let data = await userModel.findById(id);

        if (!data) return res.status(404).send({ message: 'this user already deleted Not found' });

        await userModel.findByIdAndDelete(id);

        return res.status(200).send({ message: 'user deleted', });

    } catch (error) { return res.status(500).send({ message: error }); }
}

module.exports = { createUser, getUser, updateUser, deleteUser };