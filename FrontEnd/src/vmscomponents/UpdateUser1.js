import React from 'react';
import axios from 'axios';

class UpdateUser extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            users:{},
            firstName:'',
            lastName:'',
            age:'',
            mobileNumber:'',
            adharCardNumber:'',
            address:'',
            pincode:'',
            email:'',
            username:'',
            password:'',
            confirmPassword:'',
            gender:'',

            currentUser:JSON.parse(localStorage.getItem("user")),

        }
        // this.changefirstName = this.changefirstName.bind(this);
        // this.changelastName = this.changelastName.bind(this);
        // this.changemobileNumber = this.changemobileNumber.bind(this);
        // this.changeaddress = this.changeaddress.bind(this);
        // this.changepincode = this.changepincode.bind(this);
        // this.changeemail = this.changeemail.bind(this);
        this.handelChange=this.handelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       // this.update=this.update.bind(this);
    }

    handelChange(event) {
        event.preventDefault();
        //const prevstate=this.state
             this.setState({
                // ...prevstate,
                 [event.target.name] : [event.target.value]
             })

             console.log(this.state.firstName)
            
        }



    // changefirstName(event) {
    //     this.setState({
    //         firstName: event.target.value
    //     })
    // }

    // changelastName(event) {
    //     this.setState({
    //         lastName: event.target.value
    //     })
    // }

    // changemobileNumber(event) {
    //     this.setState({
    //         mobileNumber: event.target.value
    //     })
    // }

    // changeaddress(event) {
    //     this.setState({
    //         address: event.target.value
    //     })
    // }

    // changepincode(event) {
    //     this.setState({
    //         pincode: event.target.value
    //     })
    // }

    // changeemail(event) {
    //     this.setState({
    //         email: event.target.value
    //     })
    // }


    componentDidMount()
  {
        console.log("Update User Profile");
        axios.get(`http://localhost:8080/viewvoterByid/${this.state.currentUser.id}`)
        .then((responseUserData)=>{console.log(responseUserData);
            let user=responseUserData.data
        this.setState({
             firstName:user.firstName,
            lastName:user.lastName,
            age:user.age,
            mobileNumber:user.mobileNumber,
            adharCardNumber:user.adharCardNumber,
            address:user.address,
            pincode:user.pincode,
            email:user.email,
            username:user.username,
            gender:user.gender,
            password:user.password
              // users:responseUserData.data,
        }) })
        .catch((error)=>{console.log("Some error in user(voter) read data ");
      })
      console.log(this.state.currentUser.id)
      console.log(this.state.firstName)

      
  }
  handleSubmit(event) {
    
        const url =`http://localhost:8080/updateUser/${this.state.currentUser.id}`;
           event.preventDefault();
           axios.put(url, {
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                //age:this.state.age,
                mobileNumber:this.state.mobileNumber,
                //adharCardNumber:this.state.adharCardNumber,
                address:this.state.address,
                pincode:this.state.pincode,
                email:this.state.email,
                //username:this.state.username,
                //password:this.state.password,
              
               
           },  ).then((responseEmpData) => {
               console.log(responseEmpData);
               alert("Updated Successfully");
           }).catch((error) => {
               console.log(error);
               console.log("Some error in updating user data");
           })
    
   }
  
    render()
    {
        return(
            <div className="container-sm">
            <div className="card">
                <div className="card-header">
                    Update Details
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-4 mb-3">
                                <label for="firstName">First Name</label>
                                <input type="text"
                                 id="firstName" 
                                 className="form-control"
                                 name="firstName"
                                 placeholder={this.state.firstName}
                                 value={this.state.firstName}
                                 onChange={this.handelChange}
                                 />
                            </div>
                            <div className="form-group col-md-4 mb-3">
                                <label for="lastName">Last Name</label>
                                <input type="text" 
                                 id="lastName" 
                                 className="form-control"
                                 name="lastName"
                                 placeholder={this.state.lastName}
                                 value={this.state.lastName}
                                 onChange={this.handelChange}
                                 />
                            </div>
                            <div className="form-group col-md-4 mb-3">
                                <label for="age">Age</label>
                                <input type="number" 
                                 id="age"
                                 className="form-control"
                                 name="age"
                                 value={this.state.age}
                                 onChange={this.handelChange}
                                 disabled
                                 />
                            </div>
                            <div className="form-group col-md-4">
                                <label for="mobileNumber">Mobile Number</label>
                                <input type="tel" 
                                 id="mobileNumber" 
                                 className="form-control"
                                 name="mobileNumber"
                                 placeholder={this.state.mobileNumber}
                                 value={this.state.mobileNumber}
                                 onChange={this.handelChange}
                                 />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="adharCardNumber">AdharCard Number</label>
                                <input type="tel" 
                                 id="adharCardNumber" 
                                 className="form-control"
                                 name="adharCardNumber"
                                 value={this.state.adharCardNumber}
                                 onChange={this.handelChange}
                                 disabled
                                 />
                            </div>
                            <div className="form-group col-md-2">
                                <label for="pincode">Zip Code</label>
                                <input type="text" 
                                 id="pincode" 
                                 className="form-control"
                                 name="pincode"
                                 placeholder={this.state.pincode}
                                 value={this.state.pincode}
                                 onChange={this.handelChange}
                                 />
                            </div>
                            <div className="form-group col-md-12">
                                <label for="address">Address </label>
                                <textarea class="form-control" 
                                    rows="2"
                                    className="form-control" 
                                    id="address"
                                    name="address"
                                    placeholder={this.state.address}
                                    value={this.state.address}
                                    onChange={this.handelChange}
                                    >
                                </textarea>
                            </div>
                            <div className="form-group col-md-12">
                            <select  name="gender"class="custom-select"
                             value={this.state.gender}
                             disabled
                             onChange={this.handelChange}  >
                                <option selected>Select Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </select>
                            </div>
                              <div className="form-group col-md-6">
                            <label for="email">Email</label>
                                <input type="email" 
                                 id="email" 
                                 className="form-control"
                                 name="email"
                                 placeholder={this.state.users.email}
                                 value={this.state.email}
                                 onChange={this.handelChange}
                                 />
                            </div>
                             <div className="form-group col-md-6">
                                <label for="username">Username</label>
                                    <input type="text" 
                                    id="username" 
                                    className="form-control"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handelChange}
                                    disabled
                                    />
                            </div>
                          
                            <div className="form-group col-md-6">
                            <label for="password">Password</label>
                                <input type="password" 
                                 id="password" 
                                 className="form-control"
                                 name="password"
                                 value={this.state.password}
                                 disabled
                                 />
                            </div>

                            <div className="form-group col-md-6">
                            <label for="password">Password</label>
                                <input type="password" 
                                 id="confirmPassword" 
                                 className="form-control"
                                 name="confirmPassword"
                                 value={this.state.password}
                                 disabled
                                 />
                            </div>
                        </div> 
                        <button type="submit" className="btn btn-primary" >Update</button>
                    </form>
        
            </div>
            </div>
            </div>
 
        )
        }
    
}

export default UpdateUser;