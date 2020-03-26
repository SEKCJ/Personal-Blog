import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { IBlogProps } from './blog';
import { IBlogs } from './home';
import { Link } from 'react-router-dom';
import RESTAPI from './fetch';

const Edit: React.FC<IBlogProps> = ({ match: { params: { id } } }) => {

    const [titleVal, setTitleVal] = useState<string>("");
    const [contentVal, setContentVal] = useState<string>("");
    const [author, setAuthor] = useState<number>();

    let fetchEdit = async () => {
        try {
            let response: Response = await fetch(`/api/blogs/${id}`);
            let json: IBlogs = await response.json();
            setTitleVal(json.title); setContentVal(json.content); setAuthor(json.authorid);
        } catch (error) {
            if (error) throw error;
        }
    }

    let handleChange = (event: string, id: string) => {
        if (id === "title") {
            setTitleVal(event);
        } else if (id === "content") {
            setContentVal(event);
        }
    }

    let handlePut = () => {
        RESTAPI(`/api/blogs/${id}`, {
            title: titleVal,
            content: contentVal,
            authorid: author,
        }, "PUT")
    }

    let handleDelete = () => {
        RESTAPI(`/api/blogs/${id}`, {}, "DELETE");
    }

    useEffect(() => {
        fetchEdit();
    }, [])

    return (
        <div style={{ "backgroundColor": "#1d699b", "height": "100%" }}>
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col sm="10">
                        <Card style={{ "backgroundColor": "#F0DF7F" }} >
                            <Card.Body className="pb-0 ">
                                <Form>
                                    <Form.Group controlId="editTitle">
                                        <Form.Label>Edit Title</Form.Label>
                                        <Form.Control type="text" value={titleVal}
                                            onChange={(event: any) => handleChange(event.target.value, "title")} />
                                    </Form.Group>
                                    <Form.Group controlId="editContent">
                                        <Form.Label>Edit Content</Form.Label>
                                        <Form.Control as="textarea" rows="4" value={contentVal}
                                            onChange={(event: any) => { handleChange(event.target.value, "content") }} />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-center">
                                <div className="d-flex justify-content-around" style={{ "width": "20em" }}>
                                    <Button as={Link} to="/" variant="primary"
                                    onClick={() => handlePut()}>Submit Edit</Button>
                                    <Button as={Link} to="/" variant="danger"
                                        onClick={() => handleDelete()}>Delete Blog</Button>
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Edit