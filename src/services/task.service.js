// src/services/task.service.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Yeni bir görev oluşturur ve onu sahibi olan kullanıcıya bağlar
const createTask = async (title, userId) => {
  const task = await prisma.task.create({
    data: {
      title: title,
      ownerId: userId,
    },
  });
  return task;
};

// Belirli bir kullanıcının tüm görevlerini getirir
const getTasksByUserId = async (userId) => {
  const tasks = await prisma.task.findMany({
    where: {
      ownerId: userId,
    },
  });
  return tasks;
};

// Tüm görevleri (sadece adminler için) getirir
const getAllTasks = async () => {
  const tasks = await prisma.task.findMany();
  return tasks;
};

export default { createTask, getTasksByUserId, getAllTasks };