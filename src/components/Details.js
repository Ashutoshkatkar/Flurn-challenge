import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Details({ }) {

    useEffect(() => {

        getdata()
    }, [])



    const [pokdetails, setPokedetails] = useState([])
    const [abilities, setabilities] = useState([])
    const [types, setTypes] = useState([])
    const [moves, setmoves] = useState([])
    const [id, setId] = useState([])
    var name = localStorage.getItem("name")
    let navigate = useNavigate();
    const getdata = async () => {

        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            setPokedetails(res.data)
            setabilities(res.data.abilities)
            setTypes(res.data.types)
            setmoves(res.data.moves)
            console.log(res.data)

        }
        catch (err) {
            console.log(err)
        }
    }

    console.log('pokemon detials ', pokdetails)

    const goback = () => {
        // localStorage.clear();
        navigate('/')
    }

    const addbookmark = (ids) => {

        localStorage.setItem("id", ids)

    }


    return (
        <>
            <div className="card mb-3 " >
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={`https://img.pokemondb.net/artwork/large/${name}.jpg`} className="card-img" alt="not found" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body text-white bg-info">
                            <h5 className="card-header">{name}</h5>

                            <p className="card-text"><b>Abilities</b> {abilities.map((item) => {
                                return (
                                    <li>{item.ability.name}</li>
                                )
                            }
                            )}</p>
                            <p>Height {pokdetails.height}</p>
                            <p><b>Types</b> {types.map((e) => {
                                return (
                                    <li>{e.type.name}</li>
                                )
                            })}</p>
                            <p>Weight {pokdetails.weight}</p>
                            <a className="btn btn-primary" onClick={goback}>GO back</a><p></p>
                            {/* <a className="btn btn-primary" onClick={() => addbookmark(pokdetails.id)}>Add bookmark</a> */}

                        </div>
                    </div>
                </div>
            </div>





        </>
    )
}

