import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState, useRef } from "react";
import MainLayout from "../layouts/MainLayout";
import { getAllPatients } from "../services/DocsApi";
import DOMPurify from "dompurify";

interface IPatients {
    id: string | number;
    rut: string;
    fname: string;
    lname: string;
    age: string;
    specialty_name: string;
    diagnosis: string;
    doctor_name: string
}

const Patients = () => {
    const { userData } = useAuth();
    const [patients, setPatients] = useState<IPatients[]>([]);
    const [query, setQuery] = useState<string>('');
    const [error, setError] = useState<string | null>();
    const patientsRef = useRef<IPatients[]>([]);

    const fetchPatients = async () => {
        const data = await getAllPatients(userData.jwt);
        if (!data.error) {
            setPatients(data);
            patientsRef.current = data;
        } else {
            setError(data.messages.error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.currentTarget.value)
    }

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const filPatients = patientsRef.current.filter((fpat: IPatients) =>
            fpat.fname.toLowerCase().includes(DOMPurify.sanitize(query).toLowerCase()) ||
            fpat.lname.toLowerCase().includes(DOMPurify.sanitize(query).toLowerCase())
        );
        setPatients(filPatients);
        if (filPatients.length === 0) setError("El nombre de paciente no existe.");
    };

    return (
        <MainLayout>
            <div className="container marketing">

                <div className="row text-center">
                    <h2 className="text-primary pt-4">Registro de Pacientes</h2>
                    <h4 className="pt-4 pb-3">
                        Según su perfil de <strong>{userData.roles}</strong>, tiene acceso a la información y registro de pacientes.<br />
                    </h4>

                    <form onSubmit={handleSearch}>
                        <label htmlFor="search">
                            <input
                                type="text"
                                className="form-control"
                                style={{ paddingBottom: "10px" }}
                                value={query}
                                onChange={handleOnChange}
                                placeholder="Nombre paciente"
                            />
                        </label>
                        <button type="submit" className="btn btn-primary btn-sm" style={{ height: "40px", paddingTop: "8px" }} >  Buscar Paciente </button>
                    </form>
                </div>

                <div className="card text-center mb-5 mt-4">
                    <div className="card-header">
                        <h5 className="mt-1">
                            Listado con pacientes activos en plataforma
                        </h5>
                    </div>
                    <div className="card-body pb-0">
                        {error && <p style={{ color: "red" }}>{error}</p>}

                        {(patients.length == 0 && !error) && <p>Cargando lista de pacientes...</p>}

                        {(patients.length > 0  && !error) &&
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">RUT</th>
                                        <th scope="col">Paciente</th>
                                        <th scope="col">Edad</th>
                                        <th scope="col">Diagnóstico</th>
                                        <th scope="col">Médico diagnóstico</th>
                                        <th scope="col">Médico especialidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patients.map((patient) => (
                                        <tr key={patient.id}>
                                            <th>{patient.rut}</th>
                                            <td>{patient.fname} {patient.lname}</td>
                                            <td>{patient.age}</td>
                                            <td>{patient.diagnosis}</td>
                                            <td>{patient.doctor_name}</td>
                                            <td>{patient.specialty_name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }

                    </div>
                    <div className="card-footer text-body-secondary">
                        {(patients.length > 0) &&
                            <p className="fw-bold text-primary m-0">
                                La información de pacientes ha sido actualizada con fecha {new Date().toLocaleDateString()}
                            </p>
                        }
                    </div>
                </div>

            </div>
        </MainLayout>
    );
};

export default Patients;