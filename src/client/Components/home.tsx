import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, CardDeck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IAppProps } from '../App';

export const months: Array<string> = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const Home: React.FC<IAppProps> = props => {
    const [blogs, setBlogs] = useState<JSX.Element[]>([])

    let fetchAPI = async () => {
        try {
            let response: Response = await fetch('/api/blogs');
            let json: Array<IBlogs> = await response.json();
            makeCards(json)
        } catch (error) {
            if (error) throw error;
        }
    }

    let makeCards = (json: Array<IBlogs>) => {
        let cardArr = json.map((element, index) => {
            let Title: string = element.title;
            let Author: string = element.name;
            let blogId: string = element.blogid;
            let date: Date = new Date(element._created);
            let dateFormat = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
            return (
                <Card className="mx-3 my-3"
                    style={{ "width": "20em", "backgroundColor": "#F0DF7F" }} key={index}>
                    <Card.Img src="https://mailcot.com/wp-content/uploads/2020/01/blog-460x277-c.jpg" />
                    <Card.Body>
                        <Card.Title as="h3">{Title}</Card.Title>
                        <Card.Text className="mb-1">{dateFormat}</Card.Text>
                        <Card.Text as="h5" className="">{Author}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-center">
                        <Button as={Link} to={`/blogs/${blogId}`} variant="secondary">View Blogs</Button>
                    </Card.Footer>
                </Card>
            )
        })

        setBlogs(cardArr)
    }

    useEffect(() => {
        fetchAPI();
    }, [])

    return (
        <div style={{ "backgroundColor": "#1d699b", "height": "100%" }}>
            <Container>
                <Row style={{ "height": "3em" }}></Row>
                <Row>
                    <Col sm="12" className="d-flex flex-wrap">
                        {blogs}
                    </Col>
                </Row>
            </Container>
        </div>
    )

}

export default Home;

export interface IBlogs {
    blogid: string;
    title: string;
    content: string;
    _created: string;
    name: string;
    tagName: string;


}