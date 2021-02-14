import React, { useState, useEffect } from "react"
import UserService from "../services/user.service"
import {Card} from 'react-bootstrap'
import Moment from 'react-moment'

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        var unsorted = [].concat(...response.data.map(item => item.post))
        const sorted = unsorted.sort((a,b) => {
          return -1*a.time.localeCompare(b.time)
        }) 
        console.log(sorted)
        setContent(sorted)
      }
    ).catch(() => {
      setContent("")
    })
  }, [])

  return (
    <div className="container">
      <Card bg="info">
            <Card.Header as="h1" 
                bg="dark"
            >
              Post
            </Card.Header>
            {
              (content !== '')?
                content.map((item) => (
                  <Card key = {item.title} className="bg-dark text-white">
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Body>
                      <blockquote className="blockquote mb-0">
                        <p>
                          {' '}
                          {item.description}{' '}
                        </p>
                        <footer className="blockquote-footer">
                          Published by:{' '}
                          <cite title={item.name}>
                            {item.name}
                          </cite>
                          {' '}On:{' '}
                          <cite title={item.time}>
                              <Moment format="YYYY-MM-DD HH:mm" local>{item.time}</Moment>
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Card>
                )):null
            }
        </Card>
    </div>
  );
};

export default Home;