import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const AddUserModal = () => {
    const {
        addUser,
        loading,
        showModal,
        setShowModal
    } = useContext(UserContext);

    return (
        <div className={`modal-container ${showModal ? 'show' : ''
            }`}>
            <div className='modal'>
                <div className='modal-header'>
                    <h3>Add User</h3>
                    <button onClick={
                        () =>
                            setShowModal(false)
                    } className='btn close'>X</button>
                </div>
                <div className='modal-body'>
                    <form onSubmit={addUser}>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' name='name' id='name' required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' name='email' id='email' required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' name='password' id='password' required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input type='password' name='confirmPassword' id='confirmPassword' required />
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