import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IBlogs, months } from './home';

const Blog: React.FC<IBlogProps> = ({ match: { params: { id } } }) => {

    const [singleBlog, setSingleBlog] = useState<JSX.Element>()

    let fetchBlog = async () => {
        try {
            let response: Response = await fetch(`/api/blogs/${id}`);
            let json: IBlogs = await response.json();
            makeBlog(json)
        } catch (error) {
            if (error) throw error;
        }
    }

    let makeBlog = (json: IBlogs) => {
        let Title: string = json.title;
        let Author: string = json.name;
        let date: Date = new Date(json._created);
        let dateFormat = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        let Tags: string = json.tagName;
        let Content: string = json.content;

        setSingleBlog(
            <Card style={{ "backgroundColor": "#F0DF7F" }}>
                <Card.Header as="h3">{Title}</Card.Header>
                <Card.Body>
                    <Card.Title as="h5">BY: {Author}</Card.Title>
                    <Card.Text as="h5"><span className="text-info bg-dark rounded rounded-lg px-1">{dateFormat}</span></Card.Text>
                    <Badge variant="info">{Tags}</Badge>
                    <div style={{ "height": "1em" }}></div>
                    <Card.Text>{Content}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-around">
                    <Card.Link as={Link} to="/" className="btn btn-secondary">Go Back</Card.Link>
                    <Card.Link as={Link} to={`/admin/edit/${id}`} className="btn btn-danger">Edit Blog</Card.Link>
                </Card.Footer>
            </Card>
        )
    }


    useEffect(() => {
        fetchBlog();
    }, [])

    return (
        <div style={{ "backgroundColor": "#1d699b", "height": "100%" }}>
            <Container>
                <Row style={{ "height": "3em" }}></Row>
                <Row>
                    <Col>
                        {singleBlog}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


export interface IBlogProps extends RouteComponentProps<{ id: string; }> { }

export default Blog;