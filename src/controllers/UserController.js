const UserController = {
    async create(req, res) {
        const {name, email, password} = req.body;
        console.log(req.body);

        return res.send("teste");
    },

    async update(req, res) {
        const {name, email, password} = req.body;
        console.log(req.body);

        return res.send("teste");
    },

    async delete(req, res) {
        const {name, email, password} = req.body;
        console.log(req.body);

        return res.send("teste");
    },

}

module.exports = UserController;
