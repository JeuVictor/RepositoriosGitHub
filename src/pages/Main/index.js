import React, { useCallback, useState } from "react"
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import { Container, Form, SubmitButton, List, DeleteButton } from "./style"
import api from "../../services/api";


export default function Main() {

    const [newRepo, setnewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false)

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        async function submit() {
            setLoading(true);
            try {
                const response = await api.get(`repos/${newRepo}`);

                const data = {
                    name: response.data.full_name,
                }

                setRepositorios([...repositorios, data]);
                setnewRepo('');

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }

        submit();

    }, [newRepo, repositorios]);


    function handleinputChange(e) {
        setnewRepo(e.target.value);
    }

    const handleDelete = useCallback((repo)=>{
        const find= repositorios.filter(r => r.name !== repo);
        setRepositorios(find);
    },[repositorios])

    return (
        <Container>
            <h1>
                <FaGithub size={25} />
                Menu
            </h1>

            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Adicionar Repositorios"
                    value={newRepo}
                    onChange={handleinputChange} />

                <SubmitButton loading={loading ? 1 : 0}>
                    {
                        loading ? (
                            <FaSpinner color="#fff" size={14} />
                        ) : (
                            <FaPlus color=" #fff" size={14} />
                        )
                    }

                </SubmitButton>
            </Form>

            <List>
                {repositorios.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton onClick={()=>{handleDelete(repo.name)}}>
                                <FaTrash size={14}/>
                            </DeleteButton>
                            {repo.name}
                        </span>
                        <a href="">
                                <FaBars size={20} />
                        </a>
                    </li>
                ))}
            </List>

        </Container>
    )
}