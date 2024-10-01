import React from "react"
import { useParams } from "react-router-dom"

export default function Repositorio(){
    const id = useParams();
    return (
        <h1 style={{color: '#fff'}}>
           
            {decodeURIComponent(id.repositorio)}
        </h1>
    )
}