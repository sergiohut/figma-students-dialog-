import "./Dashboard.css"
import { useState, useEffect, useRef } from "react"
import Spinner from "../components/Spinner";
import Navigation from "../components/Navigation";

const Dashboard = () =>{
    const [studentsInfo, setStudentsInfo] = useState([]);
    const [loaded, setLoaded] = useState(false);
    //const dialogRef = useRef(null);

    const getStudentsInfo = async () => {
        const res = await fetch('https://640af0b565d3a01f980b5d9d.mockapi.io/students');
        const data = await res.json();
        setStudentsInfo(data);
        setLoaded(true); 
      };


      useEffect(() => {
        getStudentsInfo();
    },[]);


    return (
        <main>
            <Navigation/>
            <div className="content">
            <button className="newStudentBtn"> <img src="https://res.cloudinary.com/ddu2qdsdp/image/upload/v1678467152/Ucademy/image_a0gadq.png" alt="add icon"/> Nuevo estudiante </button>
            <div className="table">
            <div className="tableHeadings">
                <p>Conexión</p>
                <p>Nombre y apellidos</p>
                <p>Nombre de usuario</p>
                <p>Email</p>
                <p>Móvil</p>
            </div>
            <div>
            {loaded? (studentsInfo.map((student) => (
            <div className="tableData" key={student.id}>
                <button>{student.connection}</button>
                <p className="tableItem">{student.fullName}</p>
                <p className="tableItem">{student.userName}</p>
                <p className="tableItem">{student.email}</p>
                <p className="tableItem">{student.phoneNumber}</p>
                <img src="https://res.cloudinary.com/ddu2qdsdp/image/upload/v1678470188/Ucademy/information-circle-outline_x8ace0.svg" alt="info icon" onClick={(ev) => {ev.target.nextSibling.open = true; document.body.className = "darken";}}/>
                <dialog className="modalStudent">
                    <div className="transparent">
                    <p> Nombre y apellidos </p>
                    <p> {student.fullName}</p>
                    <p> Nombre de usuario</p>
                    <p> {student.userName}</p>
                    <p> Email </p>
                    <p>{student.email}</p>
                    <p>Móvil</p>
                    <p>{student.phoneNumber}</p>
                    <p>Fecha de inscripción</p>
                    <p>{student.registrationDate}</p>
                    <button onClick={(ev) => {ev.target.parentNode.parentNode.open = false; document.body.className = "transparent" }}>Cerrar</button>
                    </div>
                </dialog>

            </div>
        ))) : (<Spinner/>)
            }
            </div>
            </div>
            </div>

        </main>
    )
}

export default Dashboard;