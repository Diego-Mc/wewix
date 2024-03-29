export const uploadService = {
  uploadImg,
}
function uploadImg(ev) {
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  console.log(JSON.stringify(UPLOAD_PRESET))
  const formData = new FormData()
  formData.append('UPLOAD_PRESET', UPLOAD_PRESET)
  formData.append('file', ev.target.files[0])

  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      return res
    })
    .catch((err) => console.error(err))
}
