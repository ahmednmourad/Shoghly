"use strict"

import { v4 as uuidv4 } from "uuid"
import sequelize from "../../utils/sequelize.js"
import Project from "../../services/project.js"

export default async (req, res, next) => {
  const id = req.userId
  const { description, urls } = req.body

  const projectId = uuidv4()
  const project = { projectId, workerId: id, description }
  let transaction

  try {
    transaction = await sequelize.transaction()

    console.log("Creating project")
    await Project.create(project)
    console.log(`Success, project created. ProjectID: ${projectId}`)

    const photosPayload = getPhotosPayload(urls, projectId)
    console.log(photosPayload)
    console.log("Adding project photos")
    await Project.addPhotos(photosPayload)
    console.log("Success, Project photos added.")

    await transaction.commit()

    return res.status(201).json({ message: "Project created!", data: { id: projectId } })
  } catch (err) {
    await transaction.rollback()
    next(err)
  }
}

const getPhotosPayload = (urls, projectId) => {
  return urls.map(url => { return { url, projectId } })
}
