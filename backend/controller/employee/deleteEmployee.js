import Employee from "../../models/employee.js";

const deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findByIdAndDelete(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting employee",
      error: error.message,
    });
  }
};

export { deleteEmployee };
