import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import {Form,Button} from 'react-bootstrap'
import Moment from 'react-moment'
import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    UserService.getUserPost().then(
      (response) => {
        const sorted = response.data[0].post.sort((a,b) => {
          return -1*a.time.localeCompare(b.time)
        })
        setContent(sorted);
      }
    ).catch(() => {
      setContent([{
        title: "Create Your first post",
        description: "You haven't created any post yet",
        time: " "
      }]);
    });
  }, []);

  const onChangeTitle = (e) =>{
    setTitle(e.target.value)
  }

  const onChangeDescription = (e) =>{
    setDescription(e.target.value)
  }

  const submitPost = (e) => {
    e.preventDefault();
    UserService.submitUserPost(title,description).then(
      () => {
        setTitle("")
        setDescription("")
        window.location.reload()
      }
    ).catch(() => {
       alert("Could not submit the post!")
       setTitle("")
       setDescription("")
    })
  };

  return (
    <div className="container">
      <main>
        <Card className="bg-dark text-white">
          <Form onSubmit={submitPost}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control 
                  type="text" 
                  placeholder="Title"
                  value={title}
                  onChange={onChangeTitle} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Write</Form.Label>
              <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={description}
                  onChange={onChangeDescription}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
          </Form>
        </Card>
        <Card bg="info">
            <Card.Header as="h1" 
                bg="dark"
            >
              Your Posts
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
                            Published on:{' '}
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
      </main>
    </div>
  );
};

export default BoardUser;