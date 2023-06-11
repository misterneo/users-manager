import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
export const BACKEND_URL = "http://localhost:3000/api/users";

const UserContextProvider = ({ children }) => {
    const [users, setUsers] = useState(null);
    const [usersLoading, setUsersLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(BACKEND_URL)
            .then(async res => {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setUsers(res.data);
                setUsersLoading(false);
            })
            .catch(err => {
                console.log(err);
                setUsersLoading(false);
            })
    }, []);

    const addUser = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (e.target.password.value !== e.target.confirmPassword.value) {
            console.log('passwords do not match');
            setLoading(false);
            setShowError(true);
            setError('Passwords do not match!');

            return;
        }

        // delay to simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));

        const newUser = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }

        axios.post(BACKEND_URL, newUser)
            .then(res => {
                if(res.data.errors) {
                    console.log(res.data.errors);
                    setShowError(true);
                    setError(res.data.errors[0].message);
                    setLoading(false);
                    return;
                }

                setUsers([...users, res.data]);
                setLoading(false);
                setShowModal(false);
                // clear form
                e.target.name.value = '';
                e.target.email.value = '';
                e.target.password.value = '';
                e.target.confirmPassword.value = '';

                window.Toast.fire({
                    icon: 'success',
                    title: 'User added successfully!'
                });
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setShowError(true);
            });
    }

    const editUser = async (e, user) => {
        e.preventDefault();
        setLoading(true);

        // delay to simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));

        if (e.target.oldPassword.value !== user.password) {
            console.log('old password is incorrect');
            setLoading(false);
            setShowError(true);
            setError('Old password is incorrect!');
            return;
        }

        const updatedUser = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.newPassword.value
        }

        axios.put(`${BACKEND_URL}/${user.id}`, updatedUser)
            .then(res => {
                if(res.data.errors) {
                    console.log(res.data.errors);
                    setShowError(true);
                    setError(res.data.errors[0].message);
                    setUsersLoading(false);
                    return;
                }

                const updatedUsers = users.map(u => {
                    if (u.id === user.id) {
                        return {
                            ...u, 
                            "name": e.target.name.value, 
                            "email": e.target.email.value,
                            "password": e.target.newPassword.value
                        };
                    }
                    return u;
                });
                setUsers(updatedUsers);
                setLoading(false);
                setShowEditModal(false);
                // clear form
                e.target.oldPassword.value = '';
                e.target.newPassword.value = '';

                window.Toast.fire({
                    icon: 'success',
                    title: 'User updated successfully!'
                });
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setShowError(true);
            });

    }

    const deleteUser = (id) => {
        axios.delete(`${BACKEND_URL}/${id}`).then(res => {

            if(res.data.errors) {
                console.log(res.data.errors);
                setShowError(true);
                setError(res.data.errors[0].message);
                setUsersLoading(false);
                return;
            }

            setUsers(users.filter(user => user.id !== id));
            window.Toast.fire({
                icon: 'success',
                title: 'User deleted successfully!'
            });
        }).catch(err => {
            console.log(err);
            setShowError(true);
        });
    }

    return (
        <UserContext.Provider value={{
            users, setUsers, deleteUser, addUser, editUser, loading, setLoading, showModal,
            setShowModal, showEditModal, setShowEditModal,
            usersLoading, error, setError, showError, setShowError,
            user, setUser
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;