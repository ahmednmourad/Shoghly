export default (req, res) => {
  console.log(req.files)
  const data = req.files.map((file) => {
    return {
      name: file.originalname,
      url: file.location
    }
  })
  return res.status(200).json({ message: "uploaded successfully", data })
}
