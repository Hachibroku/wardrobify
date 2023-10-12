import React, {useEffect, useState} from "react";
import HatCreate from "./HatCreate";

function HatsList() {
    const [hats, setHats] = useState(null);
    const getHats = async () => {
      const hatsUrl = `http://localhost:8090/api/hats/`;
      const response = await fetch(hatsUrl);
      if (response.ok) {
        const listHats = await response.json();
        setHats(listHats.hats);
        console.log(listHats)
      }
    };

    useEffect(() => {
      getHats();
    }, []);

    const deleteHat = async (id) => {
      const confirmed = window.confirm("Are you sure you want to delete this hat?");
      if (!confirmed) {
        return;
      }

      try {
        const url = `http://localhost:8090/api/hats/${id}/`;
        const deleteResponse = await fetch(url, {
          method: "delete",
        });

        if (deleteResponse.ok) {
          const reloadUrl = `http://localhost:8090/api/hats/`;
          const reloadResponse = await fetch(reloadUrl);
          const newHats = await reloadResponse.json();
          setHats(newHats.hats);
        }
      } catch (err) {
        // Handle error
      }
    };


    if (hats === null) {
      return null;
    }

    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Fabric</th>
              <th>Style</th>
              <th>Color</th>
              <th>Photo</th>
              <th>Location</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {hats.map((hat) => {
              return (
                <tr key={hat.id}>
                  <td>{hat.fabric}</td>
                  <td>{hat.style}</td>
                  <td>{hat.color}</td>
                  <td>
                    <img
                      src={hat.picture_url}
                      alt=""
                      width="100px"
                      height="100px"
                    />
                  </td>
                  <td>{hat.location_id.closet_name}</td>
                  <td>
                  <button onClick={() => deleteHat(hat.id)} className="btn btn-danger">
                    Delete
                  </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <HatCreate />
      </>
    );
  }

  export default HatsList;
