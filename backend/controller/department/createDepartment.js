import Department from "../../models/department.js";

export const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    const department = new Department({
      name,
      description,
      createdBy: req.id,
    });

    await department.save();
    res.status(201).json({ message: 'Department created successfully', data: department });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error ", error: error });
  }
};