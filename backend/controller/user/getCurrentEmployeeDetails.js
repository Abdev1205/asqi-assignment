import Employee from "../../models/employee.js";

const getCurrentEmployeeDetails = async (req, res, next) => {
  const employeeId = req.id;

  try {
    const employee = await Employee.findById(employeeId).populate('departments');

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Current Employee details fetched successfully",
      data: employee
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export default getCurrentEmployeeDetails;
