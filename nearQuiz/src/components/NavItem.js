import React, { useState } from 'react';
import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
} from 'react-bootstrap';
const NavItem = () => {
  return (
    <div>
    <Navbar>
          <Container>
            <Nav activeKey="/"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
            <Nav.Item>
              <Nav.Link href="/"> List question</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/add-question">Add question</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={window.accountId === '' ? login : logout}>
                {window.accountId === '' ? 'Login' : window.accountId}
              </Nav.Link>
            </Nav.Item>
            </Nav>
          </Container>
        </Navbar>
    </div>
  )
}

export default NavItem;
