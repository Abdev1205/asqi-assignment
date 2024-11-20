import Employee from "../../models/employee.js";

const getAllEmployees = async (req, res) => {
  try {
    const { q, filter, departmentId } = req.query;
    const loggedInEmployeeId = req.id; // The logged-in employee's ID
    let query = { _id: { $ne: loggedInEmployeeId } }; // Exclude the logged-in employee

    // If departmentId is provided, filter employees by department
    if (departmentId) {
      query.departments = departmentId;
    }

    // Handle search query if 'q' is provided
    if (q) {
      const regex = new RegExp(q, "i");

      if (filter === "name") {
        query.name = regex;
      } else if (filter === "role") {
        query.role = regex;
      } else {
        // If no specific filter is provided, search both name and role
        query.$or = [{ name: regex }, { role: regex }];
      }
    }

    if (filter === "employee") {
      query.role = "employee";
    } else if (filter === "manager") {
      query.role = "manager";
    }

    const employees = await Employee.find(query)
      .populate("createdBy", "name email _id") // Populating creator info
      .populate("departments", "name"); // Populating department names

    return res.status(200).json({
      message: "Employees fetched successfully",
      totalEmployees: employees.length,
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching employees",
      error: error.message,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const loggedInEmployeeId = req.id;


    const employee = await Employee.findById(employeeId)
      .populate("createdBy", "name email _id") // Populate creator info
      .populate("departments", "name description"); // Populate department details

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee fetched successfully",
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching employee",
      error: error.message,
    });
  }
};

export { getAllEmployees, getEmployeeById };
