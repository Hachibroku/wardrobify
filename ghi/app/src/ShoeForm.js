import React, {useEffect, useState} from "react";

function ShoeForm (props) {
    const [bins, setBins] = useState([]);
    const [manufacturer, setManufacturer] = useState('');
    const [model_name, setModelName] = useState('');
    const [color, setColor] = useState('');
    const [picture_url, setPictureURL] = useState('');
    const [bin, setBin] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.manufacturer = manufacturer;
        data.model_name = model_name;
        data.color = color;
        data.picture_url = picture_url;
        data.bin = bin;

        const shoeUrl = 'http://localhost:8080/api/shoes/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();
            console.log(`Shoe was created at ${newShoe.href}`);
            setManufacturer('');
            setModelName('');
            setColor('');
            setPictureURL('');
            setBin('');
        }
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleNameChange = (event) => {
        const value = event.target.value;
        setModelName(value);
    }

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handlePhotoChange = (event) => {
        const value = event.target.value;
        setPictureURL(value);
    }

    const handleBinChange = (event) => {
        const value = event.target.value;
        setBin(value);
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/bins/';

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setBins(data.bins);
        }
    }

    useEffect(() => {
      fetchData();
    }, []);

        return (
            <div className="shadow p-4 mt-4">
                <h1>Create a new shoe</h1>
                <form onSubmit={handleSubmit} id="create-shoe-form">
                <div className="form-floating mb-3">
                    <input onChange={handleManufacturerChange} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control"/>
                    <label htmlFor="manufacturer">Manufacturer</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange} placeholder="Model Name" required type="text" name="model_name" id="model_name" className="form-control"/>
                    <label htmlFor="name">Model Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                    <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handlePhotoChange} placeholder="Picture URL" required type="url" name="picture_url" id="picture_url" className="form-control"/>
                    <label htmlFor="photo">Picture URL</label>
                </div>
                <div className="mb-3">
                    <select onChange={handleBinChange} required name="bin" id="bin" className="form-select">
                    <option value="">Bin</option>
                    {bins.map(bin => {
                        return (
                            <option key={bin.href} value={bin.href}>
                                {bin.bin_number}: {bin.closet_name}
                            </option>
                        );
                    })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
    );
  }

  export default ShoeForm;
