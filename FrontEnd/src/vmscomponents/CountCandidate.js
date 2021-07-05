import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography
  } from '@material-ui/core';
  import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
  
import React, { Component } from 'react'
import axios from 'axios';
import authHeader from '../services/auth-header';

export default class CountCandidate extends Component {

    
    constructor(props)
    {
        super(props);
        this.state={
          CountCandidate: '',
        }
    }

    componentDidMount()
    {
          console.log("Update User Profile");
          axios.get(`http://localhost:8080/candidate/countcandidates`, { headers: authHeader() })
          .then((responseUserData)=>{console.log(responseUserData);
              
          this.setState({
                CountCandidate: responseUserData.data
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
                        className="text-primary"
                        >
                        {this.state.CountCandidate}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    color="textPrimary"
                    variant="h5"
                  >
                    No. Of Candidate
                  </Typography>
                </Grid>
         
          <Grid item>
            <Avatar
             className="bg-primary"
            >
              <SupervisedUserCircleOutlinedIcon color="success"/>
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
        )
    }
}
