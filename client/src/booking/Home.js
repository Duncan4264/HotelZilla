import {useSelector} from 'react-redux';


const Home = () => {
    const { auth } = useSelector((state) => ({...state}));
    return (
        <div className="container-fluid h1 p-5 text-center">
            Home Page {JSON.stringify(auth)}
        </div>
    )
}

export default Home;