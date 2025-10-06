// src/controllers/user.controller.js
import userService from '../services/user.service.js';

const changeRole = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    const updatedUser = await userService.updateUserRole(userId, role);
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    next(error);
  }
};

export default { changeRole };