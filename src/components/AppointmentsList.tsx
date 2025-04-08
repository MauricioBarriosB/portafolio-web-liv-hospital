interface IAppointments {
    id: number;
    name: string;
    email: string;
    date: string;
    doctor: string;
    desc: string;
    status: string;
}

type AppointmentsTypes = {
    appoMsg: string | null;
    appointments: IAppointments[];
    roles: string | null;
    methodDelete(id: number): void,
    methodEdit(id: number): void,
    methodPatch(id: number, status: string): void,
};

const formatDate = (date: string) => {
    return date.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
}

const AppointmentsList = ({ appoMsg, appointments, roles, methodDelete, methodEdit, methodPatch }: AppointmentsTypes) => {
    return (
        <div className="card text-center mb-5 mt-4">
            <div className="card-header">
                <h5 className="mt-1"> Listado reservas solicitadas</h5>
            </div>
            <div className="card-body text-center pb-0">

                {appoMsg && <p className="text-primary" style={{ marginBottom: "0" }}>{appoMsg}</p>}



                <div className="row doctors">
                    {appointments.map((row) => (
                        <div className="col-lg-4 mb-3" key={row.id}>
                            <div className="card dmx-auto">

                                <div className="card-body">
                                    <h4 className="card-title text-primary"><i className="las la-user"></i>{row.name}</h4>
                                    <p>Email: {row.email} </p>
                                    <h5 className="card-text"><i className="las la-stethoscope"></i> Doctor: {row.doctor} </h5>

                                    Estado cita: <strong className={'px-1 ' + (row.status == 'Pendiente' ? 'text-danger' : 'text-success')}>{row.status}</strong>
                                    
                                    <hr/>
                                    <p>Detalle dolencia: {row.desc} ({formatDate(row.date)})</p>
                                    <hr/>

                                    {(roles == 'admin') && (
                                    (row.status == 'Pendiente')
                                        ? <button className="btn btn-danger btn-sm my-1" onClick={() => methodPatch(row.id, row.status)}><i className="las la-toggle-off"></i></button>
                                        : <button className="btn btn-secondary btn-sm my-1" onClick={() => methodPatch(row.id, row.status)}><i className="las la-toggle-on"></i></button>
                                )}

                                <button disabled={(roles != 'admin' && row.status != 'Pendiente') ? true : false}
                                    className="btn btn-dark btn-sm my-1 mx-2" onClick={() => methodEdit(row.id)}><i className="las la-pen"></i></button>

                                <button disabled={(roles != 'admin' && row.status != 'Pendiente') ? true : false}
                                    className="btn btn-danger btn-sm" onClick={() => methodDelete(row.id)}><i className="las la-trash"></i></button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AppointmentsList;