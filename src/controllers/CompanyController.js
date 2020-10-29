const company = []
const { v4: uuid } = require('uuid');
const { show } = require('./UserController');

const CompanyController = {

    async create(req, res){
        const { name } = req.body


        if (!name) {
            return res.status(400).json({message: "Por favor, informe um nome para a empresa."});
        }

        const CompExist = company.find(element => element.name === name);

        if(CompExist){
            return res.status(400).json({message: "Nome da empresa já cadastrada"});
        }

        const Company = {
            id: uuid(),
            name
        };

        company.push(Company);

        return res.status(200).json(Company);
    },

    async update(req, res){
        const { name } = req.body;
        const { id } = req.params;

        const index = company.findIndex(element => element.id === id);

        if(index < 0){
            return res.status(400).json({message: "Empresa não encontrada"});
        }

        if(name){
            company[index].name = name;
        }

        return res.status(200).json(company[index]);
    },

    async delete(req, res){

        const { id } = req.params;


       const index = company.findIndex(element => element.id === id);

        if(index < 0){
            return res.status(400).json({message: "Empresa não encontrada"});
        }

        company.splice(index, 1);
        return res.status(200).json({message: "Sucesso"});
    },

    async show(req, res){
        return res.status(200).json(company);
    }
}

module.exports = CompanyController;
