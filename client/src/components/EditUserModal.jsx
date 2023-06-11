import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const EditUserModal = () => {
    const { showEditModal, setShowEditModal, editUser, loading, user } = useContext(UserContext);

    return (
        <div className={`modal-container ${showEditModal ? 'show' : ''}`}>
            <div className='modal'>
                <div className='modal-header'>
                    <h3>Edit User</h3>
                    <button onClick={() => setShowEditModal(false)} className='btn close'>X</button>
                </div>
                <div className='modal-body'>
                    <form onSubmit={(e) => editUser(e, user)}>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input key={user.id} type='text' name='name' id='edit_name' defaultValue={user.name} required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input key={user.id} type='email' name='email' id='edit_email' defaultValue={user.email} required />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='oldPassword'>Old Password</label>
                            <input type='password' name='oldPassword' id='oldPassword' required />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='newPassword'>New Password</label>
                            <input type='password' name='newPassword' id='newPassword' required />
                        </div>

                        <div className='form-group'>
                            {
                                loading ? <button className='btn submit' disabled>
                                    <i className='fa fa-spinner fa-spin'></i>
                                </button> :
                                    <button className='btn submit'>Submit</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}