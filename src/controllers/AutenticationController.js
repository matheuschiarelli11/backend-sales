

const AutenticationController = {
    async create(req, res) {
        const {password, email} = req.body;

        console.log(email, password);
        return res.send('teste');

    }
}

module.exports = AutenticationController;
