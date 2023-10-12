import React, {useEffect, useState} from "react";
import ShoeForm from "./ShoeForm";

function ShoesList() {
    const [shoes, setShoes] = useState(null);
    const getShoes = async () => {
      const shoesUrl = `http://localhost:8080/api/shoes/`;
      const response = await fetch(shoesUrl);
      if (response.ok) {
        const listShoes = await response.json();
        setShoes(listShoes.shoes);
      }
    };

    useEffect(() => {
      getShoes();
    }, []);

    const deleteShoe = async (id) => {
      const confirmed = window.confirm("Are you sure you want to delete this shoe?");
      if (!confirmed) {
        return;
      }

      try {
        const url = `http://localhost:8080/api/shoes/${id}/`;
        const deleteResponse = await fetch(url, {
          method: "delete",
        });

        if (deleteResponse.ok) {
          const reloadUrl = `http://localhost:8080/api/shoes/`;
          const reloadResponse = await fetch(reloadUrl);
          const newShoes = await reloadResponse.json();
          setShoes(newShoes.shoes);
        }
      } catch (err) {
        console.log(err)
      }
    };


    if (shoes === null) {
      return null;
    }

    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Manufacturer</th>
              <th>Model Name</th>
              <th>Color</th>
              <th>Photo</th>
              <th>Bin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {shoes.map((shoe) => {
              return (
                <tr key={shoe.id}>
                  <td>{shoe.manufacturer}</td>
                  <td>{shoe.model_name}</td>
                  <td>{shoe.color}</td>
                  <td>
                    <img
                      src={shoe.picture_url}
                      alt=""
                      width="100px"
                      height="100px"
                    />
                  </td>
                  <td>{shoe.bin.bin_number}</td>
                  <td>
                  <button onClick={() => deleteShoe(shoe.id)} className="btn btn-danger">
                    Delete
                  </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ShoeForm />
      </>
    );
  }

  export default ShoesList;
