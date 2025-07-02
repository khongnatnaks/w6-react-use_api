import React, { useEffect, useState } from "react";
import { 
  Card, 
  Image, 
  Row, 
  Col, 
  Typography, 
  Rate, 
  Button, 
  Divider, 
  Carousel,
  Tag,
  Space,
  Layout,
  Input,
  Badge,
  Avatar
} from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  StarFilled,
  FireFilled
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

function App() {
  const [data, setData] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((rest) => rest.json())
      .then((apiData) => setData(apiData.products));
  }, []);

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const onSearch = (value) => console.log(value);

  return (
    <Layout className="layout">
      {/* Header */}
      <Header style={{ backgroundColor: '#ee4d2d', padding: '0 20px' }}>
        <Row align="middle" gutter={20}>
          <Col>
            <Title level={3} style={{ color: 'white', margin: 0 }}>
              ShopeeClone
            </Title>
          </Col>
          <Col flex="auto">
            <Search
              placeholder="Search for products"
              allowClear
              enterButton={
                <Button 
                  type="primary" 
                  style={{ backgroundColor: '#ee4d2d', borderColor: '#ee4d2d' }}
                  icon={<SearchOutlined />}
                >
                  Search
                </Button>
              }
              size="large"
              onSearch={onSearch}
              style={{ maxWidth: 600 }}
            />
          </Col>
          <Col>
            <Space size="large">
              <Badge count={cartCount}>
                <ShoppingCartOutlined style={{ fontSize: 24, color: 'white' }} />
              </Badge>
              <Avatar icon={<UserOutlined />} />
            </Space>
          </Col>
        </Row>
      </Header>

      {/* Main Content */}
      <Content style={{ padding: '0 50px', backgroundColor: '#f5f5f5' }}>
        {/* Categories Carousel */}
        <Carousel autoplay dots={false} style={{ margin: '20px 0', backgroundColor: 'white', padding: 10 }}>
          <div>
            <img 
              src="https://cardpromotions.hsbc.com.sg/wp-content/uploads/2024/06/Shopee-banner.jpg" 
              alt="Banner 1" 
              style={{ width: '100%', height: 300, objectFit: 'cover' }}
            />
          </div>
          <div>
            <img 
              src="https://www.techhub.in.th/wp-content/uploads/2021/04/Shopee-pay-Slide-Banner-1920x754px.jpg" 
              alt="Banner 2" 
              style={{ width: '100%', height: 300, objectFit: 'cover' }}
            />
          </div>
        </Carousel>

        {/* Flash Sale Section */}
        <Card 
          title={
            <Space>
              <FireFilled style={{ color: '#ee4d2d' }} />
              <Text strong>FLASH SALE</Text>
              <Text type="danger">00:12:34 Left</Text>
            </Space>
          }
          extra={<Button type="link">See All</Button>}
          style={{ marginBottom: 20 }}
        >
          <Row gutter={[16, 16]}>
            {data.slice(0, 5).map((item, index) => (
              <Col span={4} key={index}>
                <Card
                  hoverable
                  cover={
                    <Image 
                      src={item.thumbnail} 
                      height={120}
                      style={{ objectFit: 'cover' }}
                      preview={false}
                    />
                  }
                  actions={[
                    <Button 
                      type="primary" 
                      danger 
                      icon={<ShoppingCartOutlined />} 
                      onClick={addToCart}
                    >
                      Add
                    </Button>
                  ]}
                >
                  <Text strong ellipsis>{item.title}</Text>
                  <Divider style={{ margin: '8px 0' }} />
                  <Space direction="vertical" size={0}>
                    <Text strong type="danger">${item.price}</Text>
                    <Text delete type="secondary">${Math.round(item.price * 1.2)}</Text>
                    <Rate 
                      disabled 
                      defaultValue={item.rating} 
                      allowHalf 
                      character={<StarFilled />}
                      style={{ fontSize: 14, color: '#ee4d2d' }}
                    />
                    <Text type="secondary">{item.stock} sold</Text>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        {/* All Products Section */}
        <Card 
          title="All Products" 
          extra={<Button type="link">See More</Button>}
          style={{ marginBottom: 20 }}
        >
          <Row gutter={[20, 20]}>
            {data.map((item, index) => {
              const discount = Math.round((1 - item.price / (item.price * 1.2)) * 100);
              
              return (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <Card
                    hoverable
                    cover={
                      <Image 
                        src={item.thumbnail} 
                        height={200}
                        style={{ objectFit: 'cover' }}
                        preview={false}
                      />
                    }
                    actions={[
                      <Button 
                        type="primary" 
                        danger 
                        icon={<ShoppingCartOutlined />} 
                        onClick={addToCart}
                        block
                      >
                        Add to Cart
                      </Button>
                    ]}
                  >
                    <Tag color="red">{discount}% OFF</Tag>
                    <Title level={5} ellipsis={{ rows: 2 }} style={{ margin: '8px 0' }}>
                      {item.title}
                    </Title>
                    <Space direction="vertical" size={0}>
                      <Text strong type="danger" style={{ fontSize: 18 }}>
                        ${item.price}
                      </Text>
                      <Text delete type="secondary">
                        ${Math.round(item.price * 1.2)}
                      </Text>
                      <Rate 
                        disabled 
                        defaultValue={item.rating} 
                        allowHalf 
                        character={<StarFilled />}
                        style={{ fontSize: 14, color: '#ee4d2d' }}
                      />
                      <Text type="secondary">{item.stock} available</Text>
                    </Space>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Card>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <Row gutter={[40, 20]}>
          <Col span={8}>
            <Title level={5}>Customer Service</Title>
            <Text>Help Center</Text><br />
            <Text>How to Buy</Text><br />
            <Text>Returns & Refunds</Text>
          </Col>
          <Col span={8}>
            <Title level={5}>About ShopeeClone</Title>
            <Text>About Us</Text><br />
            <Text>Shopee Careers</Text><br />
            <Text>Shopee Policies</Text>
          </Col>
          <Col span={8}>
            <Title level={5}>Follow Us</Title>
            <Text>Facebook</Text><br />
            <Text>Instagram</Text><br />
            <Text>Twitter</Text>
          </Col>
        </Row>
        <Divider />
        <Text>© 2023 ShopeeClone. All Rights Reserved.</Text>
      </Footer>
    </Layout>
  );
}

export default App;