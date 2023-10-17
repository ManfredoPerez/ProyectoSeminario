import { useUserId } from "../login/UserIdContext";



const ArticuloUsuario = () => {

    const { userId } = useUserId();

    return(
        <div>
            <h1>Holalala</h1>
            <div>Id: {userId}</div>
        </div>
    )
}

export default ArticuloUsuario;