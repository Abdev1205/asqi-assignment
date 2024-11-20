import Employee from "../../models/employee.js";
import Department from "../../models/department.js";
import mongoose from "mongoose";

const createEmployee = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { departmentId } = req.params;

    if (!name || !email || !departmentId) {
      return res.status(400).json({ message: "Name, email, and department ID are required." });
    }

    const isValidObjectId = mongoose.Types.ObjectId.isValid(departmentId);
    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid department ID format." });
    }

    const departmentObjectId = new mongoose.Types.ObjectId(departmentId);

    const departmentExists = await Department.findById(departmentObjectId);
    if (!departmentExists) {
      return res.status(404).json({ message: "Department not found." });
    }

    // Checking if the employee already exists
    let employee = await Employee.findOne({ email });

    if (employee) {
      // If the employee exists, check if the department is already assigned
      if (!employee.departments.includes(departmentObjectId)) {
        employee.departments.push(departmentObjectId); // Add the new department
        await employee.save();
        return res
          .status(200)
          .json({ message: "Department added to existing employee", data: employee });
      } else {
        return res
          .status(200)
          .json({ message: "Employee is already assigned to this department", data: employee });
      }
    }

    // Create a new employee if not already present
    employee = new Employee({
      name,
      email,
      departments: [departmentObjectId],
    });

    await employee.save();

    return res.status(201).json({ message: "Employee created successfully", data: employee });
  } catch (error) {
    console.error("Error creating/updating employee:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export default createEmployee;
