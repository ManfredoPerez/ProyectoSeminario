
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import xelaImage from './logoMuni.png'; 
import "./style.css"
import { useUserRole } from './UserRoleContext';
import { useUserId } from './UserIdContext';


const Login = ({ setIsLoggedIn }) =>{

    const [nombre_usuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();
    // const { user, setUser } = useState(null); 
    const { setUserRole } = useUserRole();

    const { setUserId } = useUserId(); 

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    
        try {
            const response = await fetch('http://localhost:4000/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: nombre_usuario,
                    contrasena,
                }),
            });
            const data = await response.json();
            const userId = data.id_usuario;
            setUserId(userId);
            // console.log(setUserId)
            // console.log(setUserId)
            if (response.status === 200) {
                if (data.rol === 1) {
                    setUserRole('usuario');
                    toast.success(`¡Bienvenido, ${data.nombre} ${data.apellido}! Eres un usuario`);
                } else if (data.rol === 2) {
                    setUserRole('administrador');
                    toast.success(`¡Bienvenido, ${data.nombre} ${data.apellido}! Eres un administrador`);
                }
                setIsLoggedIn(true);
                navigate('/home');
            } else {
                toast.error('Credenciales inválidas');
                setNombreUsuario('');
                setContrasena('');
            }
        } catch (error) {
            console.error('Error en la solicitud: ', error);
        }
    };
    
    return(
        <div className="login template d-flex justify-content-center align-items-center vh-100 ">
            <div className="form_container p-5 rounded bg-white">
                <form onSubmit={handleSubmit}>
                    <div className="text-center">
                        <img src={xelaImage} alt="Logo" className="mb-4" style={{ width: '50%', height: 'auto' }} />
                    </div>
                    <h3 className="text-center">Login</h3>
                    <div className="mb-4">
                        <label htmlFor="user"> <h4>Usuario</h4> </label>
                        <input 
                            type="text" 
                            placeholder="Ingrese su Usuario" 
                            className="form-control" 
                            value={nombre_usuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contraseña"> <h4>Contraseña</h4> </label>
                        <input 
                            type="password" 
                            placeholder="Ingrese su contraseña" 
                            className="form-control" 
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                    </div>
                    
                    
                    <div className="d-grid mb-4">
                        <button type="submit" className="btn btn-primary">Iniciar sesion</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default Login;