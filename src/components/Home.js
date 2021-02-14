import React, { useState, useEffect } from "react"
import UserService from "../services/user.service"
import {Card} from 'react-bootstrap'
import Moment from 'react-moment'

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data)
      }
    ).catch(() => {
      setContent("")
    })
  }, [])

  return (
    <div className="container">
      <Card bg="info">
            <Card.Header as="h1" 
                style={{'text-align': 'center'}} 
                bg="dark"
            >
              Post
            </Card.Header>
            {
              (content !== '')?
                content.map((item) => item.post.map((content) => (
                  <Card key = {content.title} className="bg-dark text-white">
                    <Card.Title>{content.title}</Card.Title>
                    <Card.Body>
                      <blockquote className="blockquote mb-0">
                        <p>
                          {' '}
                          {content.description}{' '}
                        </p>
                        <footer className="blockquote-footer">
                          Published by:{' '}
                          <cite title={content.name}>
                            {content.name}
                          </cite>
                          {' '}On:{' '}
                          <cite title={content.time}>
                              <Moment format="YYYY-MM-DD HH:mm" local>{content.time}</Moment>
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Card>
                ))):null
            }
        </Card>
    </div>
  );
};

export default Home;