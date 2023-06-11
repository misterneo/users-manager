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
        const fetchUsers = async () => {
            try {
                const res = await axios.get(BACKEND_URL);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setUsers(res.data);
                setUsersLoading(false);
            } catch (err) {
                console.log(err);
                setUsersLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const addUser = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { name, email, password, confirmPassword } = e.target;

        if (password.value !== confirmPassword.value) {
            console.log("passwords do not match");
            setLoading(false);
            setShowError(true);
            setError("Passwords do not match!");
            return;
        }

        try {
            await new Promise((resolve) => setTimeout(resolve, 500));

            const newUser = {
                name: name.value,
                email: email.value,
                password: password.value,
            };

            const res = await axios.post(BACKEND_URL, newUser);

            if (res.data.errors) {
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
            name.value = "";
            email.value = "";
            password.value = "";
            confirmPassword.value = "";

            window.Toast.fire({
                icon: "success",
                title: "User added successfully!",
            });
        } catch (err) {
            console.log(err);
            setLoading(false);
            setShowError(true);
        }
    };

    const editUser = async (e, user) => {
        e.preventDefault();
        setLoading(true);

        const { name, email, oldPassword, newPassword } = e.target;

        try {
            await new Promise((resolve) => setTimeout(resolve, 500));

            if (oldPassword.value !== user.password) {
                console.log("old password is incorrect");
                setLoading(false);
                setShowError(true);
                setError("Old password is incorrect!");
                return;
            }

            const updatedUser = {
                name: name.value,
                email: email.value,
                password: newPassword.value,
            };

            const res = await axios.put(`${BACKEND_URL}/${user.id}`, updatedUser);

            if (res.data.errors) {
                console.log(res.data.errors);
                setShowError(true);
                setError(res.data.errors[0].message);
                setUsersLoading(false);
                return;
            }

            const updatedUsers = users.map((u) =>
                u.id === user.id
                    ? { ...u, name: name.value, email: email.value, password: newPassword.value }
                    : u
            );
            setUsers(updatedUsers);
            setLoading(false);
            setShowEditModal(false);
            // clear form
            oldPassword.value = "";
            newPassword.value = "";

            window.Toast.fire({
                icon: "success",
                title: "User updated successfully!",
            });
        } catch (err) {
            console.log(err);
            setLoading(false);
            setShowError(true);
        }
    };

    const deleteUser = (id) => {
        axios
            .delete(`${BACKEND_URL}/${id}`)
            .then((res) => {
                if (res.data.errors) {
                    console.log(res.data.errors);
                    setShowError(true);
                    setError(res.data.errors[0].message);
                    setUsersLoading(false);
                    return;
                }

                setUsers(users.filter((user) => user.id !== id));
                window.Toast.fire({
                    icon: "success",
                    title: "User deleted successfully!",
                });
            })
            .catch((err) => {
                console.log(err);
                setShowError(true);
            });
    };

    return (
        <UserContext.Provider
            value={{
                users,
                setUsers,
                deleteUser,
                addUser,
                editUser,
                loading,
                setLoading,
                showModal,
                setShowModal,
                showEditModal,
                setShowEditModal,
                usersLoading,
                error,
                setError,
                showError,
                setShowError,
                user,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;