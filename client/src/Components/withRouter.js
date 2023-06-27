// import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


export const withHistory = (Component) => {
    const Wrapper = (props) => {
        const history = useHistory();
        return <Component {...props} history={history} />;
    };
    return Wrapper;
};
