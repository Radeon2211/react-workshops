import React from 'react';
import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';
import GoogleMap from './GoogleMap';
import Header from './Header';
import ArticleModal from './ArticleModal';

const { Content, Footer: AntComponent } = AntLayout;

const Inner = styled(Content)`
  min-height: 280px;
  padding: 24px;
  background: #fff;
`;

const Layout = styled(AntLayout)`
  min-height: 100vh;
`;

const Footer = styled(AntComponent)`
  text-align: center;
`;

export default function Page() {
  return (
    <Layout>
      <Header />
      <Inner>
        <ArticleModal />
        <GoogleMap />
      </Inner>
      <Footer>Radosław Mikrut &copy;2021 Netguru College: Frontend React</Footer>
    </Layout>
  );
}
