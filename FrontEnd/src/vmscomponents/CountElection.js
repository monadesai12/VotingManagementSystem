import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography
  } from '@material-ui/core';
  import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
  
import React, { Component } from 'react'
import axios from 'axios';
import authHeader from '../services/auth-header';

export default class CountElection extends Component {


    constructor(props)
    {
        super(props);
        this.state={
            countElection: '',
        }
    }

    componentDidMount()
    {
          console.log("Update User Profile");
          axios.get(`http://localhost:8080/election/countpositions`, { headers: authHeader() })
          .then((responseUserData)=>{console.log(responseUserData);
              
          this.setState({
                countElection: responseUserData.data
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
                        className="text-danger"
                        >
                        {this.state.countElection}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    color="textPrimary"
                    variant="h5"
                  >
                    No. Of Election
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                   className="bg-danger"
                  >
                    <AccountBalanceOutlinedIcon color="success"/>
                  </Avatar>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )
    }
}

