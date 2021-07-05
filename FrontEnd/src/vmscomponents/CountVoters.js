import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography
  } from '@material-ui/core';
  import ThumbsUpDownOutlinedIcon from '@material-ui/icons/ThumbsUpDownOutlined';
  import React, { Component } from 'react'
  import axios from 'axios';
import authHeader from '../services/auth-header';
  
  export default class CountVoters extends Component {

    
    constructor(props)
    {
        super(props);
        this.state={
            countVoterVoted: '',
        }
    }

    componentDidMount()
    {
          console.log("Update User Profile");
          axios.get(`http://localhost:8080/voting/countvoters`, { headers: authHeader() })
          .then((responseUserData)=>{console.log(responseUserData);
              
          this.setState({
            countVoterVoted: responseUserData.data
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
                        className="text-warning"
                        >
                        {this.state.countVoterVoted}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >
                    Voters Voted
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                   className="bg-warning"
                  >
                    <ThumbsUpDownOutlinedIcon color="success"/>
                  </Avatar>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          )
      }
  }
