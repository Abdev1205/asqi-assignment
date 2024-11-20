import Department from "../../models/department.js";


const deleteDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    // Find and delete department
    const department = await Department.findByIdAndDelete(departmentId);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.status(200).json({
      message: "Department deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting department",
      error: error.message,
    });
  }
};


export { deleteDepartment }