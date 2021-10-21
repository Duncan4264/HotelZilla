import { Spin } from 'antd';
const Loading = (props) => { 

      return(
        <div className="Loading">
          {
            !props.error ? (
              <img className="Loading-img" src={Spin} alt="Loading..." />
            ) : (
              <p className="alert alert-danger"><strong>Error:</strong> Could not retrieve data.</p>
            )
          }
        </div>
      );
    }
  
  export default Loading;