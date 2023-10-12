import React, {useEffect, useState } from 'react';


function HatCreate() {
    const [locations, setLocations] = useState([])
    const [fabric, setFabric] = useState('')
    const [style, setStyle] = useState('')
    const [color, setColor] = useState('')
    const [pictureUrl, setPictureUrl] = useState('')
    const [locationId, setLocationId] = useState('')

    const handleFabricChange = (event) => {
        setFabric(event.target.value)
    }

    const handleStyleChange = (event) => {
        setStyle(event.target.value)
    }

    const handleColorChange = (event) => {
        setColor(event.target.value)
    }

    const handlePictureUrlChange = (event) => {
        setPictureUrl(event.target.value)
    }

    const handleLocationIdChange = (event) => {
        setLocationId(event.target.value)
    }


const fetchData = async () => {
    const url = 'http://localhost:8100/api/locations/'

    const response = await fetch(url)

    if (response.ok) {
        const data = await response.json()
        setLocations(data.locations)
    }
}

useEffect(() => {
    fetchData()
}, [])

const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {}
    data.fabric = fabric
    data.style = style
    data.color = color
    data.picture_url = pictureUrl
    data.location_id = locationId

    const hatUrl = 'http://localhost:8090/api/hats/'
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await fetch(hatUrl, fetchConfig)
    if (response.ok) {
        const newHat = await response.json()

        setFabric('')
        setStyle('')
        setColor('')
        setPictureUrl('')
        setLocationId('')
    }
}


return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a new hat</h1>
          <form onSubmit={handleSubmit} id="add-hat-form">
            <div className="form-floating mb-3">
              <input value={fabric} onChange={handleFabricChange} placeholder="fabric" required type="text" name="fabric" id="fabric" className="form-control" />
              <label htmlFor="fabric">Fabric</label>
            </div>
            <div className="form-floating mb-3">
              <input value={style} onChange={handleStyleChange} placeholder="Style" required type="text" name="style" id="style" className="form-control" />
              <label htmlFor="style">Style</label>
            </div>
            <div className="form-floating mb-3">
              <input value={color} onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input value={pictureUrl} onChange={handlePictureUrlChange} placeholder="Picture URL" required type="url" name="pictureUrl" id="pictureUrl" className="form-control" />
              <label htmlFor="pictureUrl">Picture URL</label>
            </div>
            <div className="mb-3">
              <select value={locationId} onChange={handleLocationIdChange} required name="locationId" id="locationId" className="form-select">
                <option value="">Where in the closet?</option>
                {locations.map(location => {
                  return (
                    <option key={location.href} value={location.href}>
                      {`${location.closet_name} Section #${location.section_number} Shelf #${location.shelf_number}`}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default HatCreate;
