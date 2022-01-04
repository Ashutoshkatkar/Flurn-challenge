import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const Todo = ({ childToParent }) => {


    const [searchname, setSearchname] = useState()
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [loadMore, setLoadMore] = useState(20)
    const [filteredData, setFilteredData] = useState(data1);
    var pdata = [];
    let navigate = useNavigate();

    useEffect(() => {
        pokemondata()
    }, [])

    const pokemondata = async () => {
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${loadMore}`)
            setData1(res.data.results)
            setFilteredData(res.data.results);
            console.log(res.data)
            setLoadMore(loadMore + 3)

        }
        catch (err) {
            console.log(err)
        }

    }

    let myFunction;

    window.onscroll = myFunction = () => {
        if (document.body.scrollTop > 550 || document.documentElement.scrollTop > 550) {
            pokemondata()
        }
    }

    const Getdata = (results) => {
        results.forEach(async pokemon => {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                setData(res.data.sprites.other.dream_world.front_default)

                console.log(res.data)

                //childToParent(data)
            }
            catch (err) {
                console.log(err)
            }
        });



    }
    console.log("Data is ", data)

    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
        console.log('search valiue is', value);
        result = data1.filter((data) => {
            return data.name.search(value) != -1;

            //console.log('searching', data.title)
        })
        setFilteredData(result)

    }

    const setname = (name) => {
        localStorage.setItem("name", name)
        navigate('/details')
    }



    return (
        <div>

            <div className="container ">
                <div className='row justify-content-center '>
                    <div className='col col-lg-8 col-xs-6'>
                        <div className='card text-center bg-info' >
                            <h5 className='card-header '>Search</h5>
                            <div class="card-body" >
                                <form >
                                    <div className="form-group row">
                                        <label for="staticEmail" className="col-sm-2 col-form-label">Search</label>
                                        <div className="col-sm-10">
                                            <input type="text" required className="form-control" placeholder='search pokemon '
                                                onChange={(event) => handleSearch(event)}
                                            />


                                        </div>
                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='row'>
                {filteredData ? (


                    filteredData.map((e) => {
                        return (

                            <div className=' col-lg-4 col-sm-6'>
                                <div className="card" >
                                    <img className="card-img-top" src={`https://img.pokemondb.net/artwork/large/${e.name}.jpg`} height={400} width={500} alt="Card image" />
                                    <div className="card-body">
                                        <h4 className="card-title">{e.name}</h4>

                                        <a className="btn btn-primary" onClick={() => setname(e.name)}>See Details</a>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                ) : ("not e")
                }
            </div>
            {/* <button className="load-more" onClick={() => pokemondata()}>Load more</button> */}
        </div >
    )
}

export default Todo
