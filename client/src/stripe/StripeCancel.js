import React from 'react'

// Method to render stripe failed error
const StripeCancel = () => {
    return (
        <div className="container">
            <div className="col">
                <h2 className="text-center p-2">Payment failed. Please try again</h2>
            </div>
        </div>
    )
}

export default StripeCancel;