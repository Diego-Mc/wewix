
import axios from 'axios'

export const cmpEditorService = {
    getMapData,
    uploadImg
}

async function getMapData(locationName) {
    if (!locationName) {
        return {
            title: '',
            label: '',
            position: {
                lat: '',
                lng: '',
            },
        }
    }

    if (locationName === 'jerusalem') {
        console.log('from cache');
        return {
            "title": "Jerusalem, Jerusalem Subdistrict, Jerusalem District, Israel",
            "label": "JER",
            "position": {
                "lat": 31.7788242,
                "lng": 35.2257626
            }
        }
    }
    
    const api_key = 'pk.dc87f5d9af931a664e3281457d48045b'
    try {
        const { data } = await axios.get(`https://eu1.locationiq.com/v1/search?key=${api_key}&q=${locationName}&format=json`)

        const location = data[0]

        const mapData = (location) ?
            { title: location.display_name, label: location.display_name.substring(0, 3).toUpperCase(), position: { lat: +location.lat, lng: +location.lon } } :
            { title: 'Jerusalem', label: 'JSM', position: { lat: 31.7683, lng: 35.2137 } }

        return mapData
    } catch (err) {
        throw new Error('Map hasnt been loaded', err)
    }

}


async function uploadImg(file) {
    // Defining our variables
    const UPLOAD_PRESET = 'mainuploader' // Insert your upload preset
    const CLOUD_NAME = 'projwewix' // Insert your cloud name
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    
    const FORM_DATA = new FormData()
    // Building the request body
    FORM_DATA.append('file', file)
    FORM_DATA.append('upload_preset', UPLOAD_PRESET)

    // Sending a post method request to Cloudniarys' API
    try {
        const res = await axios.post(UPLOAD_URL, FORM_DATA)
        return res.data
    } catch (err) {
        console.error('ERROR!', err)
    }
}





