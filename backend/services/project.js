"use strict"

import Project from "../models/project.js"
import Photo from "../models/picture.js"
import { CustomError } from "../utils/error.js"
import sequelize from "../utils/sequelize.js"

const create = async (project) => {
  await Project.create(project)
}

const addPhotos = async (photos) => {
  await Photo.bulkCreate(photos, { ignoreDuplicates: true })
}

const list = async (workerId) => {
  const { count, rows } = await Project.findAndCountAll({ include: { model: Photo, attributes: ["url"], limit: 1 }, where: { workerId } })
  return { projects: rows, count }
}

const getById = async (id) => {
  const project = await sequelize.query(`
  SELECT project.projectId as id ,project.description ,project.createdAt, project.updatedAt, json_arrayagg(picture.url) as photos 
  FROM project 
  LEFT JOIN picture using(projectId) 
  WHERE projectId = ? group by project.projectId, project.description, project.createdAt, project.updatedAt`, {
    replacements: [id],
    type: sequelize.QueryTypes.SELECT,
    raw: true
  })
  if (!project) throw new CustomError(404, "Project not found")
  return project
}

const isWorkerProject = async (projectId, workerId) => {
  const project = await Project.findOne({ where: { projectId, workerId } })
  if (!project) throw new CustomError(404, "Project not found")
}

const update = async (projectId, project) => {
  await Project.update(project, { where: { projectId } })
}

const deletePhotos = async (projectId, photos) => {
  await sequelize.query("DELETE FROM picture WHERE projectId = ? AND url NOT IN (?)", {
    replacements: [projectId, photos],
    // raw: true,
    logging: console.log
  })
}

const remove = async (projectId, workerId) => {
  const count = await Project.destroy({ where: { projectId, workerId } })
  if (count === 0) throw new CustomError(404, "Project not found")
}

export default { create, addPhotos, list, update, remove, deletePhotos, getById, isWorkerProject }
