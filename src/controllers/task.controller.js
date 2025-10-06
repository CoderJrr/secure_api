// src/controllers/task.controller.js
import taskService from '../services/task.service.js';

// Yeni bir görev oluşturur
const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    // Kullanıcı ID'sini, authenticateToken middleware'inin eklediği req.user'dan alıyoruz
    const userId = req.user.id; 
    const task = await taskService.createTask(title, userId);
    res.status(201).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

// Sadece giriş yapmış kullanıcının kendi görevlerini listeler
const getMyTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tasks = await taskService.getTasksByUserId(userId);
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    next(error);
  }
};

// Sadece adminlerin tüm görevleri listelemesini sağlar Controller (task.controller.js): Ne yapılacağını söyler ("Tüm görevleri getir" veya "Bu kullanıcının görevlerini getir"). Yetkiyle ilgilenmez.Router & Middleware (task.routes.js): Bu işi kimin yapabileceğini söyler ("Bu yola sadece adminler girebilir").
const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    next(error);
  }
};

export default { createTask, getMyTasks, getAllTasks };