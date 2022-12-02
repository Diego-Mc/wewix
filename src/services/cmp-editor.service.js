import axios from 'axios'

export const cmpEditorService = {
    getMapData
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


