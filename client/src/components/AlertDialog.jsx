import { useContext } from 'react';
import '../assets/styles.css'
import { UserContext } from '../context/UserContext';

export const AlertDialog = () => {
    const { setShowError, showError, error } = useContext(UserContext);

    return (
        <div className={`
        ${showError ? 'show-error' : ''
            }
        modal-overlay`}>
            <div className="error-dialog">
                <i className="fas fa-exclamation-triangle"></i>
                <p>{error ?? "Something went wrong!"}</p>
                <button onClick={() => setShowError(false)} className="error-btn">
                    OK
                </button>
            </div>
        </div>
    )
}