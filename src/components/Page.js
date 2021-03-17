import React from 'react';
import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';
const { Header, Content, Footer: AntComponent } = AntLayout;

const Logo = styled.h2`
  color: #fff;
`;

const Inner = styled(Content)`
  min-height: 280px;
  padding: 24px;
  background: #fff;
`;

const Layout = styled(AntComponent)`
  min-height: 100vh;
`;

const Footer = styled(AntComponent)`
  text-align: center;
`;

function Page() {
  return (
    <Layout className="layout">
      <Header>
        <Logo>Wikipedia Map</Logo>
      </Header>
      <Inner>
        <div className="site-layout-content">Content</div>
      </Inner>
      <Footer>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

export default Page
