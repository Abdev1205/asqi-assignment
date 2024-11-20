import Department from "../../models/department.js";

const updateDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const updatedDepartment = await Department.findByIdAndUpdate(departmentId, req.body, {
      new: true, // Returns the updated department document
      runValidators: true, // Validates the update based on schema rules
    });

    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.status(200).json({
      message: "Department updated successfully",
      data: updatedDepartment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating department",
      error: error.message,
    });
  }
};

export { updateDepartment };
