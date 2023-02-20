import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
function Protected({ children }: any) {

    const {currentUser}: any = useAuth();

	if (!currentUser) {
		return <Navigate to="/" replace />;
	}
	return children;
};
export default Protected;
