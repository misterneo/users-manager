import { UserContext } from "../context/UserContext";
import { EditUserModal } from "./EditUserModal";
import { useContext } from "react";
import "../assets/styles.css";

export const UsersTable = () => {
    const { usersLoading, setShowEditModal, users,
        deleteUser, setUser } = useContext(UserContext);

    return (
        <>{
            usersLoading ? <div className="loading-users">
                <i className="fas fa-spinner fa-spin"></i>
            </div>
                : 
                users.length === 0 ? 
                <div className="no-users">
                    <i className="fas fa-exclamation-triangle"></i>
                    <p>No users found!</p>
                </div>:
                
                <table id='users'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{
                                    new Date(user.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })
                                }</td>
                                <td>
                                    <button onClick={
                                        () => {
                                            setUser(user);
                                            setShowEditModal(true);
                                        }
                                    } className='btn edit'>
                                        <i className="fas fa-edit" style={{
                                            marginRight: '0.5rem',
                                            fontSize: '.7rem'
                                        }}></i>
                                        Edit</button>
                                    <button onClick={
                                        () => deleteUser(user.id)
                                    } className='btn delete'>
                                        <i className="fas fa-trash" style={{
                                            marginRight: '0.5rem',
                                            fontSize: '.7rem'
                                        }}></i>
                                        Delete</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        }


            <EditUserModal />
        </>
    )
}