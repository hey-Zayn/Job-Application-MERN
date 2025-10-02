const Company = require("../Model/company.model");

const registerCompany = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(404).json({
                success: false,
                message: "Company Name is required"
            })
        }

        const ifCompanyExisted = Company.findOne({ name });
        if (!ifCompanyExisted) {
            return res.status(400).json({
                success: false,
                message: "Company is already Existed"
            })
        }
        const newCompany = await Company.create({
            name: name,
            userId: req.id, 
        });

        res.status(201).json({
            success: true,
            message: "Company Created Successfully",
            newCompany
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}


const GetCompany = async (req, res) => {
    try {
        const userId = req.id; //loggedIn User
        const comapny = await Company.find({ userId });
        if (!comapny) {
            return res.status(404).json({
                success: false,
                message: "No Company founded"
            })
        }

        res.status(200).json({
            success: true,
            message: "Company founded",
            comapny
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}


const GetCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company Not Founded"
            })
        }

        res.status(200).json({
            success: true,
            message: "Company Founded Successfully",
            company
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}


const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, website, location } = req.body;
        const file = req.file;
        // cloudinary

        const updateData = { name, description, website, location };

        const comapny = await Company.findByIdAndUpdate(id, updateData, { new: true });

        if (!comapny) {
            return res.status(404).json({
                success: false,
                message: "Company not founded"
            })
        }

        res.status(200).json({
            success: true,
            message: "Company Data is Updated Successfully",
            comapny
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        })
    }

}

module.exports = { registerCompany, GetCompany, GetCompanyById, updateCompany }