import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography
  } from '@material-ui/core';
  import PeopleIcon from '@material-ui/icons/PeopleOutlined';
  import axios from 'axios';
  
import React, { Component } from 'react'
import authHeader from '../services/auth-header';

export default class UserCount extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            countUser: '',
        }
    }

    componentDidMount()
    {
          console.log("Update User Profile");
          axios.get(`http://localhost:8080/countusers`, { headers: authHeader() })
          .then((responseUserData)=>{console.log(responseUserData);
              
          this.setState({
                countUser: responseUserData.data
          }) })
          .catch((error)=>{console.log("Some error in user count");
        })

    }


    render() {
        return (
            <Card
      sx={{ height: '100%' }}
    
    >
      <CardContent>
        <Grid
          container
          spacing={1}
          sx={{ justifyContent: 'space-between' }}
        >
        
          <Grid item  xs={12}>
            <Typography
              
              variant="h3"
              className="text-success"
            >
              {this.state.countUser}
            </Typography>
          </Grid>
          <br/>
          <br/>
          <Grid item xs={12}>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              No. Of Users
            </Typography>
          </Grid>

          <Grid item>
            <Avatar
             className="bg-success"
            >
              <PeopleIcon color="success"/>
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
        )
    }
}
