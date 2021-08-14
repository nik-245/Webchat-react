import React from 'react'
import Loader from "react-loader-spinner";

const Loder = () => {
    return (
        <div className="loder">
             <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
         //3 secs
      />
        </div>
    )
}

export default Loder
