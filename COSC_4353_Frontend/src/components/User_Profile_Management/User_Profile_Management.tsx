import React from 'react'

const User_Profile_Management = () => {
  return (
    <div className="container">
        <div className="header">
            <div className="text"></div>
            <div className="underline"></div>
        </div>

        <div className="inputs">
            <div className="input">
            <input type="Name" placeholder="Full Name" maxLength={50} required/>
            </div>

            <div className="input">
            <input type="Address" placeholder="Address" maxLength={100} required/>
            </div>

            <div className="input">
            <input type="Address2" placeholder="Address2" maxLength={100}/>
            </div>

            <div className="input">
            <input type="City" placeholder="City" maxLength={100} required/>
            </div>
            
            <div className="input">
            <input type="State" placeholder="State" maxLength={9} pattern="\d{5}(-\d{4})?" required/>
            </div>

            <div className="input">
            <input type="Zip Code" placeholder="Zip Code" />
            </div>

            {/*Skills must be a drop down*/}
            <div className="input">
            <input type="Skills" placeholder="Skills" />
            </div>
            
            <div className="input">
            <input type="Preferences" placeholder="Preferences" />
            </div>

            {/*DatePicker and allow multiple dates*/}
            <div className="input">
            <input type="Availability" placeholder="Availability" />
            </div>

        </div>

        {/* Toggle buttons */}
        <div className="submit-container">
            <div className="input">
            </div>
            <div
            className="input"            >
            </div>
        </div>
    </div>
  )
}

export default User_Profile_Management
