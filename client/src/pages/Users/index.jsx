import '../../assets/styles.css';
import Logo from '../../assets/react.svg';
import { AddUserModal } from '../../components/AddUserModal';
import { UsersTable } from '../../components/UsersTable';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { AlertDialog } from '../../components/AlertDialog';

export default function Users() {
    const { setShowModal } = useContext(UserContext);

    return (
        <>
            <div className='h1-container'>
                <img src={Logo} alt='React Logo' />
                <h1>Users</h1>
            </div>

            <div className='add-user-container'>
                <button onClick={
                    () => {
                        setShowModal(true);
                    }
                } className='btn add'>
                    <i className="fas fa-plus" style={{
                        marginRight: '0.5rem',
                        fontSize: '.7rem'
                    }}></i>
                    Add User</button>
            </div>

            <UsersTable />

            <AddUserModal />

            <AlertDialog />
        </>
    )
}