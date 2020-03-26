import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IAppProps } from '../App';
import RESTAPI from './fetch';

const Post: React.FC<IAppProps> = props => {

    const [titleVal, setTitleVal] = useState<string>("");
    const [contentVal, setContentVal] = useState<string>("");
    const [tagOptions, setTagOptions] = useState<JSX.Element[]>([]);
    const [formTag, setFormTag] = useState<string>("Select a Tag...");
    const [tagObject, setTagObject] = useState<any>()

    let handleChange = (event: string, id: string) => {
        if (id === "title") {
            setTitleVal(event);
        } else if (id === "content") {
            setContentVal(event);
        }
    }

    let handleTagChange = (event: string) => {
        setFormTag(event);
    }

    let handleClick = async () => {
        if (titleVal !== "" && contentVal !== "" && formTag !== "Select a Tag...") {
            let tagVal = tagObject[formTag];
            await RESTAPI('/api/blogs', {
                title: titleVal,
                content: contentVal,
                authorid: 1,
                tagid: tagVal
            }, "POST")

            window.location.replace("/")
        }
    }

    let fetchTags = async () => {
        try {
            let response: Response = await fetch('/api/tags');
            let json: Array<ITags> = await response.json();
            makeOptions(json);
        } catch (error) {
            if (error) throw error;
        }
    }

    let makeOptions = (json: Array<ITags>) => {
        let tagObject: any = {}
        let options = json.map((element) => {
            let id = element.id;
            let tagName = element.name;
            tagObject[tagName] = id;
            return (
                <option key={element.id}>{element.name}</option>
            )
        })

        setTagObject(tagObject);
        setTagOptions(options);

    }

    useEffect(() => {
        fetchTags();
    }, [])

    return (
        <div style={{ "backgroundColor": "#1d699b", "height": "100%" }}>
            <Container>
                <Row style={{ "height": "3em" }}></Row>
                <Row className="d-flex justify-content-center">
                    <Col sm="10">
                        <Card style={{ "backgroundColor": "#F0DF7F" }}>
                            <Card.Body className="pb-0">
                                <Form >
                                    <Form.Group controlId="title">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text"
                                            value={titleVal}
                                            onChange={(event: any) =>
                                                handleChange(event.target.value, "title")}
                                            placeholder="Enter New Blog Title" />
                                    </Form.Group>
                                    <Form.Group controlId="tag">
                                        <Form.Label>Tag</Form.Label>
                                        <Form.Control as="select" value={formTag}
                                            onChange={(event: any) => { handleTagChange(event.target.value) }}>
                                            <option>Select a Tag...</option>
                                            {tagOptions}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="content">
                                        <Form.Label>Content</Form.Label>
                                        <Form.Control as="textarea" rows="4" value={contentVal} placeholder="Enter Your Blog Content"
                                            onChange={(event: any) => { handleChange(event.target.value, "content") }} />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-center">
                                <div className="d-flex justify-content-between" style={{ "width": "20em" }}>
                                    <Button variant="primary"
                                        onClick={(event: React.MouseEvent) => { event.preventDefault(); handleClick() }}>Submit Blog!</Button>
                                    <Card.Link as={Link} to="/" className="btn btn-danger">Go Back</Card.Link>
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default Post;

export interface ITags {
    id: string;
    name: string;
}