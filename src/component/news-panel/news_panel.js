import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import axios from "axios";
import cryptoIcon from "../../assets/crypto-icon.jpg";
import "./news_panel.scss";

const NewsPanel = () => {
  const [stockNews, setStockNews] = useState([]);
  const [cryptoNews, setCryptoNews] = useState([]);
  const [stockNewsLoaded, setStockNewsLoaded] = useState(false);
  const [cryptoNewsLoaded, setCryptoNewsLoaded] = useState(false);
  let news;
  let cryptoArticleArr;

  useEffect(() => {
    getStockNews();
  }, []);

  const getStockNews = (e = new Event("")) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: "https://seeking-alpha.p.rapidapi.com/news/v2/list-trending",
      params: { until: "0", since: "0", size: "5" },
      headers: {
        "x-rapidapi-host": "seeking-alpha.p.rapidapi.com",
        "x-rapidapi-key": "61f507d9f7mshe5053b75016ecc5p1435f8jsn50b4856f8a32",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        news = response.data.data;
        let allNews = news.map((art) => {
          return {
            image: art.links.uriImage,
            title: art.attributes.title,
            link: art.links.canonical,
          };
        });
        setStockNews(allNews);
      })
      .then(() => {
        setStockNewsLoaded(true);
        setCryptoNewsLoaded(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getCryptoNews = (e) => {
    e.preventDefault()
    const options = {
      method: "GET",
      url: "https://crypto-update-live.p.rapidapi.com/news",
      headers: {
        "x-rapidapi-host": "crypto-update-live.p.rapidapi.com",
        "x-rapidapi-key": "61f507d9f7mshe5053b75016ecc5p1435f8jsn50b4856f8a32",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        cryptoArticleArr = response.data.slice(0,5);
        console.log(cryptoArticleArr);
        let cryptoArticles = cryptoArticleArr.map((art) => {
          return {
            title: art.Title,
            link: art["URL"]
          };
        });
        
        setCryptoNews(cryptoArticles);
      })
      .then(() => {
        setStockNewsLoaded(false);
        setCryptoNewsLoaded(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const stockNewsCard = stockNews.map((news, idx) => {
    return (
      <Card key={idx}>
        <Card.Body>
          <Col md lg={1} className="news-img-container">
            <img src={news.image} />
          </Col>
          <Col className="d-flex flex-column">
            <Card.Title className="news-title">{news.title}</Card.Title>
            <div className="news-link">
              <Card.Link href={news.link}>Read More</Card.Link>
            </div>
          </Col>
        </Card.Body>
      </Card>
    );
  });

  const cryptoNewsCard = cryptoNews.map((news, idx) => {
    return (
      <Card key={idx}>
        <Card.Body>
          <Col md lg={1} className="news-img-container">
            <img src={cryptoIcon} />
          </Col>
          <Col>
            <Card.Title className="news-title">{news.title}</Card.Title>
            <div className="news-link">
              <Card.Link href={news.link}>Read More</Card.Link>
            </div>
          </Col>
        </Card.Body>
      </Card>
    );
  });

  return (
    <Container className="news-panel">
      <Row className="news-header">
        <h3>News</h3>
      </Row>
      <Row className="news-market">
        <div>
          <Button onClick={getStockNews}>Stock</Button>
          <Button onClick={getCryptoNews}>Crypto</Button>
        </div>
      </Row>
      <Row className="news-papers">
        {stockNewsLoaded && stockNewsCard}
        {cryptoNewsLoaded && cryptoNewsCard}
      </Row>
    </Container>
  );
};

export default NewsPanel;
