const Appplication = require("../Model/application.model");
const Job = require("../Model/job.model");


const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job id is not found"
            });
        }

        // Check if user already applied for this job
        const existingApplication = await Appplication.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job"
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        // Create new application
        const newApplication = await Appplication.create({
            job: jobId,
            applicant: userId,
        });

        // Add application to job's applications array
        job.applications.push(newApplication._id);
        await job.save();

        res.status(201).json({
            success: true,
            message: "Job applied successfully."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            messsage: "Internal Server Error",
            error
        })
    }
}



const GetAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Appplication.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: {
                    path: 'company'
                }
            });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Applications Found"
            });
        }

        return res.status(200).json({
            success: true,
            applications
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}


const GetApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "No Application Founded"
            })
        }


        return res.status(200).json({
            success: true,
            message: "Job Founded",
            job
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            messsage: "Internal server error"
        })
    }
}


const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicaitonId = req.params.id;
        if (!status) {
            return res.status(404).json({
                success: false,
                message: "No Status Founded"
            })
        }

        const application = await Appplication.findOne({ _id: applicaitonId });
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "No Application Founded"
            })
        }

        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            success: true,
            message: "Applicaiton updated Successfully",
            application
        })
    } catch (error) {
        console.log();
        res.status(500).json({
            success: false,
            messsage: "Internal server error"
        })
    }
}


module.exports = { applyJob, GetAppliedJobs, GetApplicants, updateStatus }