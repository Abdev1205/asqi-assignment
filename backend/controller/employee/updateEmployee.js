import Employee from "../../models/employee.js";

const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.id;

    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, req.body, {
      new: true, // Returns the updated employee document
      runValidators: true, // Validates the update based on schema rules
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating employee",
      error: error.message,
    });
  }
};

export { updateEmployee }
