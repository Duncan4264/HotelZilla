
import Lottie from "react-lottie";

import * as location from "../assets/9013-hotel.json";
import * as success from "../assets/782-check-mark-success.json";

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const Loading = (props) => { 


      return( 

        <div className="d-flex justify-content-center align-items-center">
          {
            !props.error ? (
             
              <Lottie options={defaultOptions1} height={600} width={600} />
              
            ) : (
              <Lottie options={defaultOptions2} height={600} width={600} />
            )
          }
        </div>
      );
    }
  
  export default Loading;