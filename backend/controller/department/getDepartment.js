import Department from "../../models/department.js";

const getAllDepartments = async (req, res) => {
  try {
    const { q } = req.query;
    let query = {};

    if (q) {
      const regex = new RegExp(q, "i");
      query = {
        $or: [{ name: regex }, { description: regex }],
      };
    }

    const departments = await Department.find(query)
      .populate("createdBy", "name email _id");

    return res.status(200).json({
      message: "Departments fetched successfully",
      totalDepartments: departments.length,
      data: departments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching departments",
      error: error.message,
    });
  }
};

// Get a single department by ID
const getDepartmentById = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const department = await Department.findById(departmentId)
      .populate("createdBy", "name email _id");

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.status(200).json({
      message: "Department fetched successfully",
      data: department,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching department",
      error: error.message,
    });
  }
};


export { getAllDepartments, getDepartmentById };
