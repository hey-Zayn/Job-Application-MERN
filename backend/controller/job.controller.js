const Job = require("../Model/job.model");
// const Company = require('../Model/company.model');
const PostJob = async (req, res) => {
  try {
    const userId = req.id;
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      experienceLevel,
      companyId,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !experienceLevel ||
      !companyId
    ) {
      return res.status(404).json({
        success: false,
        message: "All Fileds are required",
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      // salary: Number(salary),
      salary,
      location,
      jobType,
      position,
      experienceLevel,
      company: companyId,
      created_by: userId,
    });

    await job.save();

    res.status(201).json({
      success: true,
      message: "Job has been created successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Internal server Error",
      error,
    });
  }
};

const GetAllJobs = async (req, res) => {
  try {
    // const keyword = req.query.keyword || "";
    // const query = {
    //     $or: [
    //         { title: { $regex: keyword, $option: "i" } },
    //         { description: { $regex: keyword, $option: "i" } },
    //     ]
    // };
    const keyword = req.query.keyword || "";
    const query = keyword
      ? {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .populate({
        path: "created_by",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "Jobs not founded",
      });
    }

    return res.status(200).json({
      success: true,
      message: "jobs finded Successfully",
      jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server Error",
      error,
    });
  }
};

const GetJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({
        success: falsem,
        message: "Job not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "job Find successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Internal server Error",
      error,
    });
  }
};

const GetAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "Jobs not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All Jobs Founded Successfully",
      jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Internal server Error",
      error,
    });
  }
};

module.exports = { PostJob, GetAllJobs, GetJobById, GetAdminJobs };
